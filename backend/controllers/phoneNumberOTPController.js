import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import PhoneNumberOTP from '../models/phoneNumberOTPModel.js'
import {generateOTP, isPhoneOtpValid,createOtpExpirationTime,
  chechResendOtpIfBelow2minutes} from '../otp/otp.js'

const createPhoneNumberOTP = expressAsyncHandler(async (req, res) => {
  const {
    phone
  } = req.body

  let existPhoneNumberOTP = await PhoneNumberOTP.findOne({ phone })

  if(existPhoneNumberOTP){
    if(await chechResendOtpIfBelow2minutes(existPhoneNumberOTP.otpExpiresAt)){
      res.status(401)
      throw new Error('OTP already sent. Please verify your otp or try 2 minutes later')
    }else{
      existPhoneNumberOTP.otpExpiresAt = createOtpExpirationTime
      existPhoneNumberOTP.save()
      res.status(201).json(existPhoneNumberOTP)
    }
  }

  const phoneNumberOTP = await PhoneNumberOTP.create({
    user: req.user._id,
    phone,
    otp: generateOTP,
    otpExpiresAt: createOtpExpirationTime
  })

  if (phoneNumberOTP) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(phoneNumberOTP)
  } else {
    res.status(400)
    throw new Error('PhoneNumberOTP Data')
  }
})
const verifyOTP = expressAsyncHandler(async (req, res) => {
  const {
    phone,
    otp
  } = req.body

  let phoneNumberOTP = await PhoneNumberOTP.findOne({ phone })

  if (phoneNumberOTP && await phoneNumberOTP.matchOTP(otp) && await isPhoneOtpValid(otp)) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    req.user.phoneVerified = true
    await req.user.save()
    res.status(201).json({
      mesg:`${phone} Verified Successfully`
    })
  } else {
    res.status(400)
    throw new Error('OTP not valid')
  }
})

export {
  createPhoneNumberOTP,
}