import mongoose from "mongoose";

const pinLocationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        bn: { type: String, required: true },
        en: { type: String, required: true },
    },
    parent: {
        _id:{type:String, required:true},
        name: {
            bn: { type: String, required: true },
            en: { type: String, required: true },
        }
    }
}, {
    timestamps: true
});

const PinLocation = mongoose.model('PinLocation', pinLocationSchema);
export default PinLocation