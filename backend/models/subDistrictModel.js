import mongoose from "mongoose";

const subDistrictSchema = new mongoose.Schema({
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
        bn: { type: String, required: true },
        en: { type: String, required: true },
    }
}, {
    timestamps: true
});

const SubDistrict = mongoose.model('SubDistrict', subDistrictSchema);
export default SubDistrict