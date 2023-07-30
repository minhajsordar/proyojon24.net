
import mongoose from "mongoose";
const myEarningSummarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  balance: {
    type: Number,
    required: true,
  },
  withdrawan: {
    type: Number,
    required: true,
  },
  pending: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

export const MyEarningSummary = mongoose.model('MyEarningSummary', myEarningSummarySchema);

const myEarningSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  referance: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  amount: {
    type: String,
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

export const MyEarning = mongoose.model('MyEarning', myEarningSchema);
