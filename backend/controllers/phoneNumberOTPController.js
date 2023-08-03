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
  let existPhoneNumberOTP = await PhoneNumberOTP.find({ phone: req.user.phone }).sort({ createdAt: 'desc' })

  if (existPhoneNumberOTP[0]) {
    if (chechResendOtpIfBelow2minutes(existPhoneNumberOTP[0].otpExpiresAt)) {
      res.status(401)
      throw new Error('OTP already sent. Please verify your otp or try 2 minutes later')
    } else {
      await PhoneNumberOTP.deleteMany({ phone: req.user.phone })
    }
  }

  const phoneNumberOTP = await PhoneNumberOTP.create({
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
      message: `Dear your proyojon24 verification code is - ${phoneNumberOTP.otp}`
    };
    console.log(phoneNumberOTP.otp)
    // send otp notification to bd mobile phone number
    await axios.post('http://bulksmsbd.net/api/smsapi', data)
      .then((otpres) => {
        console.log(`Status: ${otpres.status}`);
        console.log('Body: ', otpres.data);
        res.status(otpres.status).json({ status: 'OK', message: "otp sent successfully" });
        // res.status(200).json("otp sent successfully")
      }).catch((err) => {
        phoneNumberOTP.deleteOne()
        res.status(400).json({ status: 'Failed', message: "Server error" })
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

const createPhoneNumberOTPWhileRegistration = expressAsyncHandler(async (req, res) => {

  let existPhoneNumberOTP = await PhoneNumberOTP.find({ phone: req.body.phone }).sort({ createdAt: 'desc' })

  if (existPhoneNumberOTP[0]) {
    if (chechResendOtpIfBelow2minutes(existPhoneNumberOTP[0].otpExpiresAt)) {
      res.status(401)
      throw new Error('OTP already sent. Please verify your otp or try 2 minutes later')
    } else {
      await PhoneNumberOTP.deleteMany({ phone: req.body.phone })
    }
  }

  const phoneNumberOTP = await PhoneNumberOTP.create({
    phone: req.body.phone,
    otp: generateOTP(),
    otpExpiresAt: createOtpExpirationTime()
  })

  if (phoneNumberOTP) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    const data = {
      api_key: "GMA6nXsLWvC4uXd0UbN0",
      senderid: "8809617611783",
      number: phoneNumberPrefix(phoneNumberOTP.phone),
      message: `Dear your proyojon24 verification code is - ${phoneNumberOTP.otp}`
    };
    console.log(phoneNumberOTP.otp)
    res.status(200).send({ message: "ok" });
    // send otp notification to bd mobile phone number
    // await axios.post('http://bulksmsbd.net/api/smsapi', data)
    //   .then((otpres) => {
    //     console.log(`Status: ${otpres.status}`);
    //     console.log('Body: ', otpres.data);
    //     res.status(otpres.status).json({ status: 'OK', message: "otp sent successfully" });
    //     // res.status(200).json("otp sent successfully")
    //   }).catch((err) => {
    //     phoneNumberOTP.deleteOne()
    //     res.status(400).json({ status: 'Failed', message: "Server error" })
    //     // console.error(err);
    //   });

  } else {
    res.status(400)
    throw new Error('PhoneNumberOTP Data')
  }
})
const verifyOTPWhileRegistration = expressAsyncHandler(async (req, res) => {
  const {
    otp, phone
  } = req.body

  let phoneNumberOTP = await PhoneNumberOTP.findOne({ phone: phone })
  console.log(phoneNumberOTP)
  console.log(otp)
  if (phoneNumberOTP && (phoneNumberOTP.otp == otp) && isPhoneOtpValid(phoneNumberOTP.otpExpiresAt)) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    const phone = phoneNumberOTP.phone
    await phoneNumberOTP.deleteOne()
    res.status(200).json({
      status: "Ok",
      mesg: `${phone} Verified Successfully`
    })
  } else {
    res.status(400)
    throw new Error('OTP not valid')
  }
})

export {
  createPhoneNumberOTP,
  verifyOTP,
  createPhoneNumberOTPWhileRegistration,
  verifyOTPWhileRegistration
}