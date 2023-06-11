import mongoose from "mongoose";

const commonNotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        bn: { type: String, required: true },
        en: { type: String, required: true },
    },
    description: {
        bn: { type: String, default: null },
        en: { type: String, default: null },
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    link: { type: String, default:null }
}, {
    timestamps: true
});

const CommonNotification = mongoose.model('CommonNotification', commonNotificationSchema);
export default CommonNotification