import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    id:{ type: String},
    name: {
        bn: { type: String, required: true },
        en: { type: String, required: true },
    }
}, {
    timestamps: true
});

const Division = mongoose.model('Division', divisionSchema);
export default Division