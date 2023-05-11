import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
})
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
    image: {
        type: [String],
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    serviceLocation: [
        {
            bn: { type: String, required: true },
            en: { type: String, required: true }
        }
    ],
    rankCount: {
        type: Number,
        required: true,
        default: 0
    },
    viewCount: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewsSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);
export default Service