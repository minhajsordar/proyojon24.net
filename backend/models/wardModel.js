import mongoose from "mongoose";

const wardSchema = new mongoose.Schema({
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
        ref: 'Union'
    }
}, {
    timestamps: true
});

const Ward = mongoose.model('Ward', wardSchema);
export default Ward