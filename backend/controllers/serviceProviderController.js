import expressAsyncHandler from "express-async-handler";
import ServiceProvider from '../models/serviceProviderModel.js'
import ServiceCategory from '../models/serviceCategoryModel.js'
import Service from '../models/serviceModel.js'

// @desc get ServiceProvider
// @route Put api/ServiceProvider
// @acess Privet
const getServiceProviders = expressAsyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 50;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    if (req.query.serviceId) {
        keyword.service = req.query.serviceId
    }
    if (req.query.serviceCategoryId) {
        keyword.serviceCategory = req.query.serviceCategoryId
    }
    const count = await ServiceProvider.countDocuments({ ...keyword })
    const serviceProviders = await ServiceProvider.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ serviceProviders, page, pages: Math.ceil(count / pageSize) })
})
// @desc get ServiceProvider
// @route Put api/ServiceProvider
// @acess Privet
const getPublicServiceProviders = expressAsyncHandler(async (req, res) => {
    // console.log(req.query.keyword)
    // const keyword = {}
    //     const pageSize = Number(req.query.pageSize) || 50;
    // const page = Number(req.query.pageNumber) || 1;
    // query params
    // description
    // serviceProviderLocation.exact
    // specialties
    // extraCources
    // serviceTitle
    // serviceList
    const keyword = req.query.keyword ? {
        "keyword": {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    if (req.query.serviceId) {
        keyword.service = req.query.serviceId
    }
    if (req.query.serviceCategoryId) {
        keyword.serviceCategory = req.query.serviceCategoryId
    }
    if (req.query.divisionId) {
        keyword["serviceProviderLocation.division._id"] = req.query.divisionId
    }
    if (req.query.districtId) {
        keyword["serviceProviderLocation.district._id"] = req.query.districtId
    }
    if (req.query.subDistrictId) {
        keyword["serviceProviderLocation.subDistrict._id"] = req.query.subDistrictId
    }
    if (req.query.unionId) {
        keyword["serviceProviderLocation.union._id"] = req.query.unionId
    }
    if (req.query.pinlocationId) {
        keyword["serviceProviderLocation.pinlocation._id"] = req.query.pinlocationId
    }
    if (req.query.suggested) {
        keyword.suggested = req.query.suggested
    }
    keyword.approved = true
    const serviceProviders = await ServiceProvider.find({ ...keyword }).select('name image serviceProviderLocation serviceTitle viewCount rankCount rating numReviews createdAt suggested')
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(serviceProviders)
})
// @desc get service provider by id
// @route Put api/ServiceProvider/:id
// @acess Privet
const getServiceProviderPendingList = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.find({ waitingForApproval: true })
    if (serviceProvider) {

        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(serviceProvider)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Service Provider not found')
    }
})
// @desc get service provider by id
// @route Put api/ServiceProvider/:id
// @acess Privet
const getUserServiceProvider = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.findOne({ user: req.params.user }).populate('service','name').populate('serviceCategory','name')
    if (serviceProvider) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(serviceProvider)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(200)
        res.json({})
    }
})
// @desc get service provider by id
// @route Put api/ServiceProvider/:id
// @acess Privet
const getServiceProviderById = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {

        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(serviceProvider)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Service Provider not found')
    }
})

// @desc get service provider by id
// @route Put api/ServiceProvider/:id
// @acess Privet
const getServiceProviderByIdPreview = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(serviceProvider)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Service Provider not found')
    }
})

// @desc get service provider by id
// @route Put api/ServiceProvider/:id
// @acess Privet
const getServiceProviderByServiceCategory = expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await ServiceProvider.find({ serviceCategory: req.params.id }).countDocuments({ ...keyword })
    const serviceProviders = await ServiceProvider.find({ serviceCategory: req.params.id }).limit(pageSize).skip(pageSize * (page - 1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ serviceProviders, page, pages: Math.ceil(count / pageSize) })
})

// @desc delete a ServiceProvider
// @route Delete api/ServiceProviders/:id
// @acess Privet/Admin
const deleteServiceProvider = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    const serviceById = Service.findById(serviceProvider.service)
    const serviceCategoryById = ServiceCategory.findById(serviceProvider.serviceCategory)

    if (serviceProvider) {
        await serviceProvider.deleteOne()
        serviceById.serviceProviderCount -= 1
        if (serviceById.serviceProviderCount >= 0) {
            await serviceById.save()
        }
        serviceCategoryById.serviceProviderCount -= 1
        if (serviceCategoryById.serviceProviderCount >= 0) {
            await serviceCategoryById.save()
        }
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({ message: 'Service Provider removed' })
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Service Provider not found')
    }
})

// @desc update a service provider
// @route update api/ServiceProvider/
// @acess Privet/Admin
const updateServiceProvider = expressAsyncHandler(async (req, res) => {
    const {
        serviceCategory,
        name,
        image,
        serviceImage,
        serviceProviderLocation,
        degree,
        service,
        description,
        serviceTitle,
        phoneNumber1,
        phoneNumber2,
        facebook,
        whatsapp,
        imo,
        twitter,
        email,
        keywords
    } = req.body
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        serviceProvider.dataUpdatedBy = req.user._id,
            serviceProvider.dataUpdatedHistory.push(req.user._id)
        serviceProvider.serviceCategory = serviceCategory
        serviceProvider.name = name
        serviceProvider.description = description
        serviceProvider.degree = degree
        serviceProvider.image = image
        serviceProvider.serviceImage = serviceImage
        serviceProvider.serviceProviderLocation = serviceProviderLocation
        serviceProvider.service = service
        serviceProvider.serviceTitle = serviceTitle
        serviceProvider.phoneNumber1 = phoneNumber1
        serviceProvider.phoneNumber2 = phoneNumber2
        serviceProvider.facebook = facebook
        serviceProvider.whatsapp = whatsapp
        serviceProvider.imo = imo
        serviceProvider.twitter = twitter
        serviceProvider.email = email
        serviceProvider.keywords = keywords
        serviceProvider.approved = false
        serviceProvider.waitingForApproval = true
        const updatedServiceProvider = await serviceProvider.save()
        res.status(201).json(updatedServiceProvider)
    } else {
        res.status(404)
        throw new Error('Service Provider not found')
    }
})

// @desc update a service provider
// @route update api/ServiceProvider/
// @acess Privet/Admin
const rankAndApprovalServiceProvider = expressAsyncHandler(async (req, res) => {
    const {
        approved,
        rankCount
    } = req.body
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        if (approved) {
            serviceProvider.approved = true
            serviceProvider.waitingForApproval = false
        }
        if (rankCount) {
            serviceProvider.rankCount = rankCount
        }
        const updatedServiceProvider = await serviceProvider.save()
        res.status(201).json(updatedServiceProvider)
    } else {
        res.status(404)
        throw new Error('Service Provider not found')
    }
})

// @desc update a service provider
// @route update api/ServiceProvider/
// @acess Privet/Admin
const suggestServiceProvider = expressAsyncHandler(async (req, res) => {
    const {
        suggested, topSuggested
    } = req.body
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        if (req.user.isSuperAdmin) {
            if(suggested){
                serviceProvider.suggested = suggested
            }
            if(topSuggested){
                serviceProvider.topSuggested = topSuggested
            }
        }
        const updatedServiceProvider = await serviceProvider.save()
        res.status(201).json(updatedServiceProvider)
    } else {
        res.status(404)
        throw new Error('Service Provider not found')
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
            throw new Error('Service Provider reviewed already exist')
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
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        serviceProvider.viewCount += 1
        await serviceProvider.save()
        res.status(201).json(serviceProvider)
    } else {
        res.status(404)
        throw new Error('Service Provider Number not found')
    }
})

// @desc Top rated service provider
// @route update api/ServiceProvider/topRated
// @acess public
const getSuggestedServiceProvider = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.find({suggested: true}).select('image serviceTitle name').populate("serviceCategory","name")
    res.status(200).json(serviceProvider)
})
// @desc Top rated service provider
// @route update api/ServiceProvider/topRated
// @acess public
const getTopSuggestedServiceProvider = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.find({topSuggested: true}).select('image serviceTitle name').populate("serviceCategory","name")
    res.status(200).json(serviceProvider)
})
// @desc Top rated service provider
// @route update api/ServiceProvider/topRated
// @acess public
const getTopServiceProvider = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.find({}).sort({ rating: -1 }).limit(3)
    res.status(200).json(serviceProvider)
})

// @desc create a ServiceProvider
// @route create api/ServiceProviders/
// @acess Privet/Admin
const createServiceProvider = expressAsyncHandler(async (req, res) => {

    const serviceByUser = await ServiceProvider.findOne({ user: req.user._id })
    if (serviceByUser) {
        res.status(400)
        throw new Error('Service Provider Profile Already Exist With This User')
    }
    const {
        serviceCategory,
        name,
        image,
        serviceImage,
        serviceProviderLocation,
        service,
        degree,
        description,
        serviceTitle,
        phoneNumber1,
        phoneNumber2,
        facebook,
        whatsapp,
        imo,
        twitter,
        email,
        rankCount,
        keywords
    } = req.body
    const serviceProvider = new ServiceProvider({
        dataCollector: req.user._id,
        dataUpdatedBy: req.user._id,
        dataUpdatedHistory: req.user._id,
        user: req.user._id,
        serviceCategory,
        name,
        image,
        serviceImage,
        serviceProviderLocation,
        service,
        serviceTitle,
        description,
        degree,
        phoneNumber1,
        phoneNumber2,
        facebook,
        whatsapp,
        imo,
        twitter,
        email,
        rankCount,
        approved: false,
        waitingForApproval: true,
        keywords
    })
    const createdServiceProvider = await serviceProvider.save()
    req.user.hasServiceProviderProfile = true
    await req.user.save()
    const serviceById = await Service.findById(service)
    serviceById.serviceProviderCount += 1
    await serviceById.save()

    const serviceCategoryById = await ServiceCategory.findById(serviceCategory)
    serviceCategoryById.serviceProviderCount += 1
    await serviceCategoryById.save()
    res.status(201).json(createdServiceProvider)

})

export {
    getServiceProviders,
    getServiceProviderById,
    getServiceProviderByIdPreview,
    getServiceProviderPendingList,
    deleteServiceProvider,
    createServiceProviderReview,
    createServiceProviderViewCount,
    suggestServiceProvider,
    rankAndApprovalServiceProvider,
    updateServiceProvider,
    getTopServiceProvider,
    getServiceProviderByServiceCategory,
    createServiceProvider,
    getUserServiceProvider,
    getSuggestedServiceProvider,
    getTopSuggestedServiceProvider,
    getPublicServiceProviders
}
