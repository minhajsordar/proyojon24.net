
import mongoose from "mongoose";

const dailyProfileViewSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  viewCount: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true
});

const DailyProfileView = mongoose.model('DailyProfileView', dailyProfileViewSchema);
export default DailyProfileView