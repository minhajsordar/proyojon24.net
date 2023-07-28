
import mongoose from "mongoose";
const myPaymentMethodeSchema = new mongoose.Schema({
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
}, {
  timestamps: true
});

const MyPaymentMethode = mongoose.model('MyPaymentMethode', myPaymentMethodeSchema);
export default MyPaymentMethode