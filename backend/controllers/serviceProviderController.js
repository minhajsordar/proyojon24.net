import expressAsyncHandler from "express-async-handler";
import ServiceProvider from '../models/serviceProviderModel.js'
import ServiceCategory from '../models/serviceCategoryModel.js'
import Service from '../models/serviceModel.js'
import User from '../models/userModel.js'
import DailyProfileView from '../models/dailyProfileViewModel.js'
import DailyServiceProviderView from '../models/dailyServiceProviderViewModel.js'
import Payment from '../models/paymentModel.js'
import { MyEarning, MyEarningSummary } from '../models/myEarningModel.js'

// @desc get ServiceProvider
// @route Put api/ServiceProvider
// @acess Privet
const getServiceProviders = expressAsyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 50;
    const page = Number(req.query.pageNumber) || 1;
    const keywords = req.query.keywords ? {
        name: {
            $regex: req.query.keywords,
            $options: 'i'
        }
    } : {}
    if (req.query.serviceId) {
        keywords.service = req.query.serviceId
    }
    if (req.query.serviceCategoryId) {
        keywords.serviceCategory = req.query.serviceCategoryId
    }
    const count = await ServiceProvider.countDocuments({ ...keywords })
    const serviceProviders = await ServiceProvider.find({ ...keywords }).limit(pageSize).skip(pageSize * (page - 1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ serviceProviders, page, pages: Math.ceil(count / pageSize) })
})
// @desc get ServiceProvider
// @route Put api/ServiceProvider
// @acess Privet
const getPublicServiceProviders = expressAsyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 30;
    const page = Number(req.query.pageNumber) || 1;
    const keywords = req.query.keywords ? {
        "keywords": {
            $regex: req.query.keywords,
            $options: 'i'
        }
    } : {}
    if (req.query.serviceId) {
        keywords.service = req.query.serviceId
    }
    if (req.query.serviceCategoryId) {
        keywords.serviceCategory = req.query.serviceCategoryId
    }
    if (req.query.divisionId) {
        keywords["serviceProviderLocation.division._id"] = req.query.divisionId
    }
    if (req.query.districtId) {
        keywords["serviceProviderLocation.district._id"] = req.query.districtId
    }
    if (req.query.subDistrictId) {
        keywords["serviceProviderLocation.subDistrict._id"] = req.query.subDistrictId
    }
    if (req.query.unionId) {
        keywords["serviceProviderLocation.union._id"] = req.query.unionId
    }
    if (req.query.suggested) {
        keywords.suggested = req.query.suggested
    }
    keywords.approved = true
    const count = await ServiceProvider.countDocuments({ ...keywords })
    const serviceProviders = await ServiceProvider.find({ ...keywords }).limit(pageSize).skip(pageSize * (page - 1)).populate({ path: 'user', select: 'registrationNo createdAt isAvailable nidVerified' })
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ serviceProviders, page, pages: Math.ceil(count / pageSize) })
})
// @desc get service provider by id
// @route Put api/ServiceProvider/:id
// @acess Privet
const getServiceProviderPendingList = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.find({ waitingForApproval: true }).select("name createdAt updatedAt dataCollector phoneNumber1")
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
    const serviceProvider = await ServiceProvider.findOne({ user: req.query.user }).populate('service', 'name').populate('serviceCategory', 'name')
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
    const serviceProvider = await ServiceProvider.findById(req.params.id).populate({ path: 'user', select: 'registrationNo createdAt' })
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
        serviceImage1,
        serviceImage2,
        serviceImage3,
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
        experience,
        keywords
    } = req.body
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        // update service count
        const serviceById = await Service.findById(service)
        serviceById.serviceProviderCount -= 1
        await serviceById.save()
        // update service category count
        const serviceCategoryById = await ServiceCategory.findById(serviceCategory)
        serviceCategoryById.serviceProviderCount -= 1
        await serviceCategoryById.save()

        serviceProvider.dataUpdatedBy = req.user._id,
            serviceProvider.dataUpdatedHistory.push(req.user._id)
        serviceProvider.serviceCategory = serviceCategory
        serviceProvider.name = name
        serviceProvider.description = description
        serviceProvider.degree = degree
        serviceProvider.image = image
        serviceProvider.serviceImage1 = serviceImage1
        serviceProvider.serviceImage2 = serviceImage2
        serviceProvider.serviceImage3 = serviceImage3
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
        serviceProvider.experience = experience
        serviceProvider.keywords = keywords
        serviceProvider.approved = false
        serviceProvider.waitingForApproval = true

        const updatedServiceProvider = await serviceProvider.save()
        if (updatedServiceProvider) {
            // update service count
            const serviceById = await Service.findById(service)
            serviceById.serviceProviderCount += 1
            await serviceById.save()
            // update service category count
            const serviceCategoryById = await ServiceCategory.findById(serviceCategory)
            serviceCategoryById.serviceProviderCount += 1
            await serviceCategoryById.save()
        }

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
        rejectNote,
        rankCount,
        approved,
        rejected
    } = req.body
    const serviceProvider = await ServiceProvider.findById(req.params.id)
    if (serviceProvider) {
        if (approved) {
            serviceProvider.approved = true
            serviceProvider.waitingForApproval = false
            serviceProvider.rejected = false
            serviceProvider.rejectNote = ""
        }
        if (rejected) {
            serviceProvider.approved = false
            serviceProvider.rejected = true
            serviceProvider.waitingForApproval = false
            serviceProvider.rejectNote = rejectNote
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
        if (req.user.permission == 'superAdmin') {
            if (req.body.hasOwnProperty("suggested")) {
                serviceProvider.suggested = suggested
            }
            if (req.body.hasOwnProperty("topSuggested")) {
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

        // Update daily user count
        const today = new Date().setHours(0, 0, 0, 0); // Get current date
        const dailyProfileView = await DailyProfileView.findOne({ date: today });

        if (dailyProfileView) {
            dailyProfileView.viewCount += 1;
            await dailyProfileView.save();
        } else {
            const newDailyProfileView = new DailyProfileView({ date: today, viewCount: 1 });
            await newDailyProfileView.save();
        }

        // Update daily service provider view count
        const dailyServiceProviderView = await DailyServiceProviderView.findOne({ date: today, serviceProvider: serviceProvider._id });

        if (dailyServiceProviderView) {
            dailyServiceProviderView.viewCount += 1;
            await dailyServiceProviderView.save();
        } else {
            const newDailyServiceProviderView = new DailyServiceProviderView({ date: today, serviceProvider: serviceProvider._id, viewCount: 1 });
            await newDailyServiceProviderView.save();
        }

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
    const serviceProvider = await ServiceProvider.find({ suggested: true }).select('image serviceTitle name').populate("serviceCategory", "name")
    res.status(200).json(serviceProvider)
})
// @desc Top rated service provider
// @route update api/ServiceProvider/topRated
// @acess public
const getTopSuggestedServiceProvider = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.find({ topSuggested: true }).select('image serviceTitle name').populate("serviceCategory", "name")
    res.status(200).json(serviceProvider)
})
// @desc Top rated service provider
// @route update api/ServiceProvider/topRated
// @acess public
const getTopServiceProvider = expressAsyncHandler(async (req, res) => {
    const serviceProvider = await ServiceProvider.find({}).sort({ rating: -1 }).limit(3)
    res.status(200).json(serviceProvider)
})

const paidRegistrationEarning = async (userId, datacollectorId) => {
            const earnings = await MyEarning.create({
                user: datacollectorId,
                referance: userId,
                activity: "Earning",
                status: "pending",
                amount: "30",
                description: "Premium registration",
            })
            if(earnings){
                const earningSummary = await MyEarningSummary.findOne({user: datacollectorId})
                if(earningSummary){
                    earningSummary.pending += 30
                    earningSummary.save()
                }else{
                    await MyEarningSummary.create({
                        user: datacollectorId,
                        pending: 30,
                    })
                }
            }
}

const freeRegistrationEarning = async (userId, datacollectorId) => {
            const earnings = await MyEarning.create({
                user: datacollectorId,
                referance: userId,
                activity: "Earning",
                status: "pending",
                amount: "10",
                description: "Free registration",
            })
            if(earnings){
                const earningSummary = await MyEarningSummary.findOne({user: datacollectorId})
                if(earningSummary){
                    earningSummary.pending += 10
                    earningSummary.save()
                }else{
                    await MyEarningSummary.create({
                        user: datacollectorId,
                        pending: 10,
                    })
                }
            }
}
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
        serviceImage1,
        serviceImage2,
        serviceImage3,
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
        experience,
        rankCount,
        keywords,
        reference,
        bankAccountName,
        phoneNumber,
        transactionId,
        amount
    } = req.body

    const serviceProvider = new ServiceProvider({
        dataCollector: req.user._id,
        dataUpdatedBy: req.user._id,
        dataUpdatedHistory: req.user._id,
        user: req.user._id,
        serviceCategory,
        name,
        image,
        serviceImage1,
        serviceImage2,
        serviceImage3,
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
        experience,
        rankCount,
        approved: false,
        waitingForApproval: true,
        keywords
    })

    const createdServiceProvider = await serviceProvider.save()

    if (createdServiceProvider) {
        req.user.hasServiceProviderProfile = true
        await req.user.save()
        const datacollector = await User.findOne({reference: req.user.referance})
        // create registration payment 
        if (
            bankAccountName !== '' &&
            phoneNumber !== '' &&
            transactionId !== '' &&
            amount !== 0
        ) {
            await Payment.create({
                user: req.user._id,
                bankAccountName,
                phoneNumber,
                transactionId,
                amount,
                paymentFor: "registration"
            })
            if(datacollector){
                paidRegistrationEarning(req.user._id, datacollector._id)
            }
        }else{
            if(datacollector){
                freeRegistrationEarning(req.user._id, datacollector._id)
            }
        }

        const serviceById = await Service.findById(service)
        serviceById.serviceProviderCount += 1
        await serviceById.save()

        const serviceCategoryById = await ServiceCategory.findById(serviceCategory)
        serviceCategoryById.serviceProviderCount += 1
        await serviceCategoryById.save()
        res.status(201).json(createdServiceProvider)

    }

})

// @desc create a UserServiceProvider
// @route create api/ServiceProviders/UserAndServiceProvider
// @acess Privet/Admin
const createUserAndServiceProvider = expressAsyncHandler(async (req, res) => {
    const {
        username,
        email,
        name,
        password,
        serviceCategory,
        image,
        serviceImage1,
        serviceImage2,
        serviceImage3,
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
        experience,
        rankCount,
        keywords,
        reference,
        bankAccountName,
        phoneNumber,
        transactionId,
        amount
    } = req.body

    // register
    const userExists = await User.findOne({
        $or: [
            { phone: phoneNumber1 },
            { email },
            { username }
        ]

    })
    if (userExists) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(400)
        throw new Error('User already exists with this phone or username or email.')
    }
    const user = await User.create({
        name,
        email,
        username,
        password,
        phone: phoneNumber1,
        hasServiceProviderProfile: true,
        reference
    })

    if (user) {

        const datacollector = await User.findOne({reference})
        // create registration payment 
        if (
            bankAccountName !== '' &&
            phoneNumber !== '' &&
            transactionId !== '' &&
            amount !== 0
        ) {
            await Payment.create({
                user: user._id,
                bankAccountName,
                phoneNumber,
                transactionId,
                amount,
                paymentFor: "registration"
            })
            if(datacollector){
                paidRegistrationEarning(user._id, datacollector._id)
            }
        }else{
            if(datacollector){
                freeRegistrationEarning(user._id, datacollector._id)
            }
        }
        const serviceProvider = new ServiceProvider({
            dataCollector: req.user._id,
            dataUpdatedBy: req.user._id,
            dataUpdatedHistory: req.user._id,
            user: user._id,
            serviceCategory,
            name,
            image,
            serviceImage1,
            serviceImage2,
            serviceImage3,
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
            experience,
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
        res.status(201).json("User and Service Provider Created Successfully")
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    // create service provider


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
    createUserAndServiceProvider,
    getPublicServiceProviders
}
