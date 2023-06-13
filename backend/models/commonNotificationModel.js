import mongoose from "mongoose";

const commonNotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: { type: String, required: true },
    description: { type: String},
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    link: { type: String, default: null }
}, {
    timestamps: true
});

const CommonNotification = mongoose.model('CommonNotification', commonNotificationSchema);
export default CommonNotification