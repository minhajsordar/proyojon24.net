import mongoose from "mongoose";

const ourBusinessPartnersSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
    },
    subTitle: {
        type: String,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true
});

const OurBusinessPartners = mongoose.model('OurBusinessPartners', ourBusinessPartnersSchema);
export default OurBusinessPartners