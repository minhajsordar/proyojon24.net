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
const getAllServiceProviders = expressAsyncHandler(async (req, res) => {
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
        "name.bn": {
            $regex: req.query.name,
            $options: 'i'
        },
        // "name.en": {
        //     $regex: req.query.keyword,
        //     $options: 'i'
        // },
        // "description.bn": {
        //     $regex: req.query.keyword,
        //     $options: 'i'
        // },
        // "description.en": {
        //     $regex: req.query.keyword,
        //     $options: 'i'
        // },
        // "serviceList.bn": {
        //     $regex: req.query.keyword,
        //     $options: 'i'
        // },
        // "serviceList.en": {
        //     $regex: req.query.keyword,
        //     $options: 'i'
        // },
        "serviceTitle.bn": {
            $regex: req.query.keyword,
            $options: 'i'
        },
        // "serviceTitle.en": {
        //     $regex: req.query.keyword,
        //     $options: 'i'
        // },
        // "serviceProviderLocation.exact.bn": {
        //     $regex: req.query.keyword,
        //     $options: 'i'
        // },
        // "serviceProviderLocation.exact.en": {
        //     $regex: req.query.keyword,
        //     $options: 'i'
        // }
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
    const serviceProviders = await ServiceProvider.find({ ...keyword }).select('-user -dataUpdatedHistory -dataUpdatedBy -dataCollector -description -phoneNumber -extraCources -degree -serviceList')
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(serviceProviders)
})
// @desc get product by id
// @route Put api/ServiceProvider/:id
// @acess Privet
const getServiceProviderPendingList = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.find({waitingForApproval: true})
    if (serviceProvider) {

        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(serviceProvider)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Service Provider not found')
    }
})
// @desc get product by id
// @route Put api/ServiceProvider/:id
// @acess Privet
const getUserServiceProvider = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.findOne({user: req.params.user})
    if (serviceProvider) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(serviceProvider)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Service Provider not found')
    }
})
// @desc get product by id
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

// @desc get product by id
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

// @desc get product by id
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

// @desc update a product
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
        extraCources,
        serviceTitle,
        serviceList,
        specialties,
        phoneNumber1,
        phoneNumber2,
        facebook,
        whatsapp,
        imo,
        twitter,
        gmail,
        keywords
    } = req.body
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        serviceProvider.dataUpdatedBy = req.user._id,
            serviceProvider.dataUpdatedHistory.push(req.user._id)
        serviceProvider.serviceCategory = serviceCategory
        serviceProvider.name = name
        serviceProvider.description = description
        serviceProvider.image = image
        serviceProvider.serviceImage = serviceImage
        serviceProvider.serviceProviderLocation = serviceProviderLocation
        serviceProvider.degree = degree
        serviceProvider.service = service
        serviceProvider.specialties = specialties
        serviceProvider.extraCources = extraCources
        serviceProvider.serviceTitle = serviceTitle
        serviceProvider.serviceList = serviceList
        serviceProvider.phoneNumber1 = phoneNumber1
        serviceProvider.phoneNumber2 = phoneNumber2
        serviceProvider.facebook = facebook
        serviceProvider.whatsapp = whatsapp
        serviceProvider.imo = imo
        serviceProvider.twitter = twitter
        serviceProvider.gmail = gmail
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

// @desc update a product
// @route update api/ServiceProvider/
// @acess Privet/Admin
const rankAndApprovalServiceProvider = expressAsyncHandler(async (req, res) => {
    const {
        approved,
        rankCount
    } = req.body
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        if(approved){
            serviceProvider.approved = true
            serviceProvider.waitingForApproval = false
        }
        if(rankCount){
            serviceProvider.rankCount = rankCount
        }
        const updatedServiceProvider = await serviceProvider.save()
        res.status(201).json(updatedServiceProvider)
    } else {
        res.status(404)
        throw new Error('Service Provider not found')
    }
})

// @desc update a product
// @route update api/ServiceProvider/
// @acess Privet/Admin
const suggestServiceProvider = expressAsyncHandler(async (req, res) => {
    const {
        suggested
    } = req.body
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        if (req.user.isSuperAdmin) {
            serviceProvider.suggested = suggested || false
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
        degree,
        service,
        description,
        extraCources,
        serviceTitle,
        serviceList,
        specialties,
        phoneNumber1,
        phoneNumber2,
        facebook,
        whatsapp,
        imo,
        twitter,
        gmail,
        rankCount,
        keywords
    } = req.body
    let user = null
    if (req.user.isSuperAdmin || req.user.isAdmin || req.user.permission !== 'self') {
        user = null
    } else {
        user = req.user._id
    }
    const serviceProvider = new ServiceProvider({
        dataCollector: req.user._id,
        dataUpdatedBy: req.user._id,
        dataUpdatedHistory: req.user._id,
        user,
        serviceCategory,
        name,
        image,
        serviceImage,
        serviceProviderLocation,
        degree,
        service,
        extraCources,
        serviceTitle,
        serviceList,
        specialties,
        description,
        phoneNumber1,
        phoneNumber2,
        facebook,
        whatsapp,
        imo,
        twitter,
        gmail,
        rankCount,
        approved: false,
        waitingForApproval: true,
        keywords
    })
    const createdServiceProvider = await serviceProvider.save()

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
    getAllServiceProviders
}
