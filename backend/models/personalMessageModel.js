import mongoose from "mongoose";

const personalMessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: { type: String, required: true },
    seen: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

const PersonalMessage = mongoose.model('PersonalMessage', personalMessageSchema);
export default PersonalMessage