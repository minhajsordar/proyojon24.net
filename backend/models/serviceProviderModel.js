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

const serviceProviderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        bangla: { type: String, required: true },
        english: { type: String, required: true },
    },
    image: {
        type: String,
        required: true
    },
    serviceProviderLocation: [
            {
                bangla: { type: String, required: true },
                english: { type: String, required: true }
            }
        ]
    ,
    degree: [
        {
            bangla: { type: String },
            english: { type: String }
        }
    ],
    extra_cources: [
        {
            bangla: { type: String },
            english: { type: String }
        }
    ],
    phone_number: [
        {
            bangla: { type: String, required: true },
            english: { type: String, required: true }
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

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);
export default ServiceProvider