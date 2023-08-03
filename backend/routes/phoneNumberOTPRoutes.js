import express from "express";
import {
    createPhoneNumberOTP,
    verifyOTP,
    createPhoneNumberOTPWhileRegistration,
    verifyOTPWhileRegistration
} from '../controllers/phoneNumberOTPController.js'
import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/request_phone_verification_otp').post(protect, createPhoneNumberOTP)
router.route('/verify_phone').post(protect, verifyOTP)
router.route('/request_phone_verification_otp_while_registration').post(createPhoneNumberOTPWhileRegistration)
router.route('/verify_phone_while_registration').post(verifyOTPWhileRegistration)



export default router