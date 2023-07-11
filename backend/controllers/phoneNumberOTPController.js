import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import PhoneNumberOTP from '../models/phoneNumberOTPModel.js'
import axios from 'axios';
import {
  generateOTP, isPhoneOtpValid, createOtpExpirationTime,
  chechResendOtpIfBelow2minutes, phoneNumberPrefix
} from '../config/otp.js'

const createPhoneNumberOTP = expressAsyncHandler(async (req, res) => {

  if (req.user.phoneVerified) {
    res.status(400)
    throw new Error('Phone number is verified')
  }
  let existPhoneNumberOTP = await PhoneNumberOTP.findOne({ phone: req.user.phone })

  if (existPhoneNumberOTP) {
    if (chechResendOtpIfBelow2minutes(existPhoneNumberOTP.otpExpiresAt)) {
      res.status(401)
      throw new Error('OTP already sent. Please verify your otp or try 2 minutes later')
    } else {
      await existPhoneNumberOTP.deleteOne()
    }
  }

  const phoneNumberOTP = await PhoneNumberOTP.create({
    user: req.user._id,
    phone: req.user.phone,
    otp: generateOTP(),
    otpExpiresAt: createOtpExpirationTime()
  })

  if (phoneNumberOTP) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    const data = {
      api_key: "GMA6nXsLWvC4uXd0UbN0",
      senderid: "8809617611783",
      number: phoneNumberPrefix(phoneNumberOTP.phone),
      message: `${phoneNumberOTP.otp} is your proyojon24.net otp`
    };
    // send otp notification to bd mobile phone number
    axios.post('http://bulksmsbd.net/api/smsapi', data)
      .then((otpres) => {
        // console.log(`Status: ${otpres.status}`);
        // console.log('Body: ', otpres.data);
        res.status(otpres.status).json("otp sent successfully")
      }).catch((err) => {
        phoneNumberOTP.deleteOne()
        res.status(400).json("Otp Server Error.")
        // console.error(err);
      });

  } else {
    res.status(400)
    throw new Error('PhoneNumberOTP Data')
  }
})
const verifyOTP = expressAsyncHandler(async (req, res) => {
  const {
    otp
  } = req.body

  let phoneNumberOTP = await PhoneNumberOTP.findOne({ phone: req.user.phone })
  console.log(phoneNumberOTP)
  console.log(otp)
  if (phoneNumberOTP && (phoneNumberOTP.otp == otp) && isPhoneOtpValid(phoneNumberOTP.otpExpiresAt)) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    req.user.phoneVerified = true
    await req.user.save()
    await phoneNumberOTP.deleteOne()
    res.status(201).json({
      mesg: `${req.user.phone} Verified Successfully`
    })
  } else {
    res.status(400)
    throw new Error('OTP not valid')
  }
})

export {
  createPhoneNumberOTP,
  verifyOTP,
}