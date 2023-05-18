import expressAsyncHandler from "express-async-handler";
import ServiceProvider from '../models/serviceProviderModel.js'

// @desc get ServiceProvider
// @route Put api/ServiceProvider
// @acess Privet
const getServiceProviders = expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await ServiceProvider.countDocuments({ ...keyword })
    const serviceProviders = await ServiceProvider.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ serviceProviders, page, pages: Math.ceil(count / pageSize) })
})

// @desc get product by id
// @route Put api/ServiceProvider/:id
// @acess Privet
const getServiceProviderId = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(serviceProvider)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('ServiceProvider not found')
    }
})

// @desc delete a ServiceProvider
// @route Delete api/ServiceProviders/:id
// @acess Privet/Admin
const deleteServiceProvider = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        await serviceProvider.deleteOne()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({ message: 'ServiceProvider removed' })
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('ServiceProvider not found')
    }
})

// @desc update a product
// @route update api/ServiceProvider/
// @acess Privet/Admin
const updateServiceProvider = expressAsyncHandler(async (req, res) => {
    const {
        user,
        userProfile,
        name,
        image,
        serviceProviderLocation,
        degree,
        extraCources,
        phoneNumber,
        rankCount
    } = req.body
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        serviceProvider.user = user
        serviceProvider.userProfile = userProfile
        serviceProvider.name = name
        serviceProvider.image = image
        serviceProvider.serviceProviderLocation = serviceProviderLocation
        serviceProvider.degree = degree
        serviceProvider.extraCources = extraCources
        serviceProvider.phoneNumber = phoneNumber
        serviceProvider.rankCount = rankCount
        const updatedServiceProvider = await serviceProvider.save()
        res.status(201).json(updatedServiceProvider)
    } else {
        res.status(404)
        throw new Error('ServiceProvider not found')
    }
})

// @desc Create new review
// @route update api/ServiceProvider/:id/reviews
// @acess Privet/Admin
const createServiceProviderReview = expressAsyncHandler(async (req, res) => {
    const {
        rating,
        comment,
    } = req.body
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        const alreadyReviewed = serviceProvider.reviews.find(r => r.user.toString() === req.user.id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('ServiceProvider reviewed already exist')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        serviceProvider.reviews.push(review)
        serviceProvider.numReviews = serviceProvider.reviews.length
        serviceProvider.rating = serviceProvider.reviews.reduce((acc, item) => item.rating + acc, 0) / serviceProvider.reviews.length
        await serviceProvider.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Service Provider not found')
    }
})

// @desc Create new review
// @route update api/ServiceProvider/:id/reviews
// @acess Privet/Admin
const createServiceProviderViewCount = expressAsyncHandler(async (req, res) => {
    const {
        view
    } = req.body
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        serviceProvider.viewCount += 1
        await serviceProvider.save()
        res.status(201).json({ message: 'You previewed a service provider number' })
    } else {
        res.status(404)
        throw new Error('Service Provider Number not found')
    }
})

// @desc Top rated product
// @route update api/ServiceProvider/topRated
// @acess public
const getTopServiceProvider = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.find({}).sort({ rating: -1 }).limit(3)
    res.json(serviceProvider)
})

// @desc create a ServiceProvider
// @route create api/ServiceProviders/
// @acess Privet/Admin
const createServiceProvider = expressAsyncHandler(async (req, res) => {
    const {
        user,
        userProfile,
        name,
        image,
        serviceProviderLocation,
        degree,
        extraCources,
        phoneNumber,
        rankCount
    } = req.body
    const serviceProvider = new ServiceProvider({
        user,
        userProfile,
        name,
        image,
        serviceProviderLocation,
        degree,
        extraCources,
        phoneNumber,
        rankCount
    })
    const createdServiceProvider = await serviceProvider.save()
    res.status(201).json(createdServiceProvider)

})

export {
    getServiceProviders,
    getServiceProviderId,
    deleteServiceProvider,
    createServiceProviderReview,
    createServiceProviderViewCount,
    updateServiceProvider,
    getTopServiceProvider,
    createServiceProvider
}