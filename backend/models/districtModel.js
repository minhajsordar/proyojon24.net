import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Division'
    }
}, {
    timestamps: true
});

const District = mongoose.model('District', districtSchema);
export default District