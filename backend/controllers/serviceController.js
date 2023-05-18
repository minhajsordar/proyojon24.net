import expressAsyncHandler from "express-async-handler";
import Service from '../models/serviceModel.js'

// @desc get Service
// @route Put api/Service
// @acess Privet
const getServices = expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await Service.countDocuments({ ...keyword })
    const services = await Service.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ services, page, pages: Math.ceil(count / pageSize) })
})

// @desc get product by id
// @route Put api/Service/:id
// @acess Privet
const getServiceId = expressAsyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id)
    if (service) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(service)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Service not found')
    }
})

// @desc delete a Service
// @route Delete api/Services/:id
// @acess Privet/Admin
const deleteService = expressAsyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id)
    if (service) {
        await service.deleteOne()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({ message: 'Service removed' })
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Service not found')
    }
})

// @desc update a product
// @route update api/Service/
// @acess Privet/Admin
const updateService = expressAsyncHandler(async (req, res) => {
    const {
        user,
        userProfile,
        name,
        image,
        serviceLocation,
        degree,
        extraCources,
        phoneNumber,
        rankCount
    } = req.body
    const service = await Service.findById(req.params.id)
    if (service) {
        service.user = user
        service.userProfile = userProfile
        service.name = name
        service.image = image
        service.serviceLocation = serviceLocation
        service.degree = degree
        service.extraCources = extraCources
        service.phoneNumber = phoneNumber
        service.rankCount = rankCount
        const updatedService = await service.save()
        res.status(201).json(updatedService)
    } else {
        res.status(404)
        throw new Error('Service not found')
    }
})

// @desc Create new review
// @route update api/Service/:id/reviews
// @acess Privet/Admin
const createServiceViewCount = expressAsyncHandler(async (req, res) => {
    const {
        view
    } = req.body
    const service = await Service.findById(req.params.id)
    if (service) {
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        service.viewCount += 1
        await service.save()
        res.status(201).json({ message: 'You previewed a service  number' })
    } else {
        res.status(404)
        throw new Error('Service  Number not found')
    }
})

// @desc Top rated product
// @route update api/Service/topRated
// @acess public
const getTopService = expressAsyncHandler(async (req, res) => {
    const service = await Service.find({}).sort({ viewCount: -1 }).limit(3)
    res.json(service)
})

// @desc create a Service
// @route create api/Services/
// @acess Privet/Admin
const createService = expressAsyncHandler(async (req, res) => {
    const {
        user,
        name,
        rankCount
    } = req.body
    const service = new Service({
        user,
        name,
        rankCount
    })
    const createdService = await service.save()
    res.status(201).json(createdService)

})

export {
    getServices,
    getServiceId,
    deleteService,
    createServiceViewCount,
    updateService,
    getTopService,
    createService
}
