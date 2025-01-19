import mongoose from "mongoose";

// const counterSchema = new mongoose.Schema({
//     _id: { type: String, required: true },
//     sequenceValue: { type: Number, default: 0 },
// });

// export const Counter = mongoose.model('Counter', counterSchema);
// async function getNextId(counterName) {
//     const counter = await Counter.findByIdAndUpdate(
//       counterName,
//       { $inc: { sequenceValue: 1 } },
//       { new: true, upsert: true }
//     );

//     return counter.sequenceValue;
//   }

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
        required: false,
        ref: 'User'
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Service'
    },
    serviceCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ServiceCategory'
    },
    dataCollector: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dataUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dataUpdatedHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],
    name: {
        bn: { type: String, required: true },
        en: { type: String, required: true },
    },
    description: {
        bn: { type: String },
        en: { type: String },
    },
    image: {
        type: String,
        required: true
    },
    serviceImage1: {
        type: String,
        required: true
    },
    serviceImage2: {
        type: String,
    },
    serviceImage3: {
        type: String,
    },
    serviceProviderLocation:
    {
        division: {
            name: {
                bn: { type: String, required: true },
                en: { type: String, required: true }
            },
            _id: { type: String, required: true }
        },
        district: {
            name: {
                bn: { type: String, required: true },
                en: { type: String, required: true }
            },
            _id: { type: String, required: true }
        },
        subDistrict: {
            name: {
                bn: { type: String, required: true },
                en: { type: String, required: true }
            },
            _id: { type: String, required: true }
        },
        union: {
            name: {
                bn: { type: String, default: null },
                en: { type: String, default: null }
            },
            _id: { type: String, default: null }
        },
        pinlocation: {
            name: {
                bn: { type: String, default: null },
                en: { type: String, default: null }
            },
            _id: { type: String, default: null }
        }
    },
    serviceTitle:
    {
        bn: { type: String },
        en: { type: String }
    },
    phoneNumber1: { type: String },
    phoneNumber2: { type: String },
    facebook: { type: String },
    whatsapp: { type: String },
    imo: { type: String },
    twitter: { type: String },
    email: { type: String },
    experience: { type: String },
    rankCount: {
        type: Number,
        required: false,
        default: 0
    },
    viewCount: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewsSchema],
    keywords: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    suggested: {
        type: Boolean,
        required: true,
        default: false
    },
    topSuggested: {
        type: Boolean,
        required: true,
        default: false
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
    rejected: {
        type: Boolean,
        required: true,
        default: false
    },
    rejectNote: {
        type: String,
        default: ""
    },
    waitingForApproval: {
        type: Boolean,
        required: true,
        default: true
    },
    registrationNo: {
        type: Number,
    }
}, {
    timestamps: true
});
// serviceProviderSchema.pre('save', async function (next) {
//         if (!this.registrationNo) {
//           this.registrationNo = await getNextId('serviceProviderProfileRegistrationCounter');
//         }
//         next();
//       });

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);
export default ServiceProvider