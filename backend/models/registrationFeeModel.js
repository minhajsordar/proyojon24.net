
import mongoose from "mongoose";
const registrationFeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: {
    type: Number,
    required: true,
  },
  employeeCount: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true
});

const RegistrationFee = mongoose.model('RegistrationFee', registrationFeeSchema);
export default RegistrationFee