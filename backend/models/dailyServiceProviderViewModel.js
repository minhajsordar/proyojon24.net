
import mongoose from "mongoose";

const dailyServiceProviderViewSchema = new mongoose.Schema({
  serviceProvider: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ServiceProvider'
  },
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

const DailyServiceProviderView = mongoose.model('DailyServiceProviderView', dailyServiceProviderViewSchema);
export default DailyServiceProviderView