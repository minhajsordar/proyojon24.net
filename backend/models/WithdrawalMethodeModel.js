
import mongoose from "mongoose";
const WithdrawalMethodeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  phone: {
    type: String,
    required: true,
  },
  mobileBankName: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  pendingForVerification: {
    type: Boolean,
    required: true,
    default: false
  },
  pendingForRemove: {
    type: Boolean,
    required: true,
    default: false
  },
}, {
  timestamps: true
});

const WithdrawalMethode = mongoose.model('WithdrawalMethode', WithdrawalMethodeSchema);
export default WithdrawalMethode