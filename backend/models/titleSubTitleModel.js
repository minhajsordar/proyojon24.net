import mongoose from "mongoose";

const titleSubTitleSchema = new mongoose.Schema({
    ourBusinessPartnerTitle: {
        type: String,
        default: "Our Business Partner"
    },
}, {
    timestamps: true
});

const TitleSubTitle = mongoose.model('TitleSubTitle', titleSubTitleSchema);
export default TitleSubTitle