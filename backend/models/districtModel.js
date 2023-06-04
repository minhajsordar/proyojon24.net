import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    id:{ type: String},
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

const District = mongoose.model('District', districtSchema);
export default District