
import mongoose from "mongoose";

const dailyUserSchema = new mongoose.Schema({
    date: {
        type: Date,
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

const DailyUser = mongoose.model('DailyUser', dailyUserSchema);
export default DailyUser