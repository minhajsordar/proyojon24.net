import mongoose from "mongoose";

const movingTextSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    announcement: { type: String},
    speed: { type: Number},
}, {
    timestamps: true
});

const MovingText = mongoose.model('MovingText', movingTextSchema);
export default MovingText