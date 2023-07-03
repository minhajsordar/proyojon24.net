
import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  approvedOrRejectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  bankAccountName: {
    type: String,
    required: true,
    default: "Enter your bank account name",
  },
  phoneNumber: {
    type: String,
    required: true,
    default: "Enter your account phone number",
  },
  transactionId: {
    type: String,
    required: true,
    default: "Enter your transaction id",
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
  },
  note: {
    type: String,
    default: "",
  },
}, {
  timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment