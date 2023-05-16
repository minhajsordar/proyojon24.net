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
    userProfile: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    name: {
        bn: { type: String, required: true },
        en: { type: String, required: true },
    },
    image: {
        type: String,
        required: true
    },
    serviceProviderLocation: [
            {
                division: {
                    bn: { type: String, required: true },
                    en: { type: String, required: true }
                },
                district: {
                    bn: { type: String, required: true },
                    en: { type: String, required: true }
                },
                subDistrict: {
                    bn: { type: String, required: true },
                    en: { type: String, required: true }
                },
                union: {
                    bn: { type: String, required: true },
                    en: { type: String, required: true }
                },
                ward: {
                    bn: { type: String, required: true },
                    en: { type: String, required: true }
                },
            }
        ]
    ,
    degree: [
        {
            bn: { type: String },
            en: { type: String }
        }
    ],
    extraCources: [
        {
            bn: { type: String },
            en: { type: String }
        }
    ],
    phoneNumber: [
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

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);
export default ServiceProvider