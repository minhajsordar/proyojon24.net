import express from "express";
import {    
    createPhoneNumberOTP,
    verifyOTP
} from '../controllers/phoneNumberOTPController.js'
    import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/request_phone_verification_otp').post(protect, createPhoneNumberOTP)
router.route('/verify_phone').post(protect, verifyOTP)

 

export default router