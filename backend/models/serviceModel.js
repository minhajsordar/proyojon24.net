import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        bn: { type: String, required: true },
        en: { type: String, required: true },
    },
    icon: {
        type: String,
        required: true
    },
    viewCount: {
        type: Number,
        required: true,
        default: 0
    },
    serviceProviderCount: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);
export default Service