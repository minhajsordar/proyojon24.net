import mongoose from "mongoose";

const subServiceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Service'
    },
    name: {
        bn: { type: String, required: true },
        en: { type: String, required: true },
    },
    coverImage: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    },
    viewCount: {
        type: Number,
        required: true,
        default: 0
    },
    order: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const SubService = mongoose.model('SubService', subServiceSchema);
export default SubService