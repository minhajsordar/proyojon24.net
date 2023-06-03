import mongoose from "mongoose";

const serviceProviderSuggestionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ServiceProvider'
    },
    serviceCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ServiceCategory'
    }
}, {
    timestamps: true
});

const ServiceProviderSuggestion = mongoose.model('ServiceProviderSuggestion', serviceProviderSuggestionSchema);
export default ServiceProviderSuggestion