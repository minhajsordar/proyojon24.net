import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    slider1: [{ type: String}],
    slider2: [{ type: String}],
    slider3: [{ type: String}],
    slider4: [{ type: String}],
}, {
    timestamps: true
});

const Slider = mongoose.model('Slider', sliderSchema);
export default Slider