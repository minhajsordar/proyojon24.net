
import mongoose from "mongoose";
const myEarningSchema = new mongoose.Schema({
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
  referance: {
    type: Number,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const MyEarning = mongoose.model('MyEarning', myEarningSchema);
export default MyEarning