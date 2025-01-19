
import mongoose from "mongoose";
const otpConfigSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  api_key: {
    type: String,
    required: true,
    default: "Enter api key",
  },
  senderid: {
    type: String,
    required: true,
    default: "Enter senderid",
  },
  number: {
    type: String,
    required: true,
    default: "Enter number",
  },
  message: {
    type: String,
    required: true,
    default: "is your verification otp from proyojon24.net",
  },
  digits: {
    type: Boolean,
    required: true,
    default: true,
  },
  lowerCaseAlphabets: {
    type: Boolean,
    required: true,
    default: false,
  },
  upperCaseAlphabets: {
    type: Boolean,
    required: true,
    default: false,
  },
  specialChars: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true
});

const OtpConfig = mongoose.model('OtpConfig', otpConfigSchema);
export default OtpConfig