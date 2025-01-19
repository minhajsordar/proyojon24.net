import expressAsyncHandler from "express-async-handler";
import ServiceProvider from '../models/serviceProviderModel.js'
import ServiceProviderSuggestion from '../models/serviceProviderSuggestionModel.js'

// @desc get service provider suggestions
// @route Put api/service provider suggestions
// @acess Public
const getAllSuggestions =  expressAsyncHandler(async (req, res) => {

    const keyword = req.query.serviceCategoryId? {"serviceCategory":req.query.serviceCategoryId}:{}
    const serviceProviderSuggestions = await ServiceProviderSuggestion.find({...keyword})
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(serviceProviderSuggestions)
})

// @desc delete a service provider suggestion
// @route Delete api/service provider suggestions/:id
// @acess Privet/Admin
const deleteSuggestion = expressAsyncHandler(async (req, res) => {
    const serviceProviderSuggestion = await ServiceProviderSuggestion.findById(req.params.id)
    if (serviceProviderSuggestion) {
        await serviceProviderSuggestion.deleteOne()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({message: 'Service Provider Suggestion removed'})
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Service Provider Suggestion not found')
    }
})


// @desc create a service provider suggestion
// @route create api/service provider suggestions/
// @acess Privet/Admin
const createSuggestion = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.findById(req.body.serviceProviderId)
    const serviceCategory = await ServiceProvider.findById(req.body.serviceCategoryId)
    if (serviceProvider && serviceCategory) {
        const serviceProviderSuggestion = new ServiceProviderSuggestion({
            user: req.user._id,
            serviceProvider: req.body.serviceProviderId,
            serviceCategory: req.body.serviceCategoryId,
        })
        const createdServiceProviderSuggestion = await serviceProviderSuggestion.save()
        res.status(201).json(createdServiceProviderSuggestion)
    } else {
        res.status(404)
        throw new Error('Parent Service Provider or Service Category not found')
    }
})

export {
    getAllSuggestions,
    deleteSuggestion,
    createSuggestion,
}
