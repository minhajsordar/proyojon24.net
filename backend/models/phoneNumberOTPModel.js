import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const otpSchema = new mongoose.Schema({
  // Other fields in your user model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  phone: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  otpExpiresAt: {
    type: Date,
    expires: 0, // This will be dynamically set to the expiration time
    default: null
  }
});

otpSchema.methods.matchOTP = function (enteredOTP) {
    return enteredOTP === this.otp
}
const PHoneNumberOTP = mongoose.model('PHoneNumberOTP', otpSchema);

module.exports = PHoneNumberOTP;