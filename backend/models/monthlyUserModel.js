
import mongoose from "mongoose";
const monthlyUserSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  userCount: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true
});

const MonthlyUser = mongoose.model('MonthlyUser', monthlyUserSchema);
export default MonthlyUser