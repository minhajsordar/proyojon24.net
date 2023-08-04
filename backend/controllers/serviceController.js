import expressAsyncHandler from "express-async-handler";
import Service from '../models/serviceModel.js'
import ServiceCategory from '../models/serviceCategoryModel.js'

// @desc get Service
// @route Put api/Service
// @acess Privet
const getServices = expressAsyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 50;
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
    res.status(200).json({ services:null, page, pages: Math.ceil(count / pageSize) })
})
// @desc get Service
// @route Put api/Service
// @acess Privet
const getAllServices = expressAsyncHandler(async (req, res) => {
    const services = await Service.find({})
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({services:null})
})

// @desc get service controller by id
// @route Put api/Service/:id
// @acess Privet
const getServiceById = expressAsyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id)
    if (service) {
        service.viewCount += 1
        const updatedService = await service.save()

        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(updatedService)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Service not found')
    }
})

// @desc get service controller by id
// @route Put api/Service/:id
// @acess Privet
const getServiceByIdPreview = expressAsyncHandler(async (req, res) => {
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

// @desc update a service controller
// @route update api/Service/
// @acess Privet/Admin
const updateService = expressAsyncHandler(async (req, res) => {
    const {
        name,
        description,
        coverImage,
        icon
    } = req.body
    const service = await Service.findById(req.params.id)
    if (service) {
        service.user = req.user._id
        service.name = name
        service.description = description
        service.coverImage = coverImage
        service.icon = icon
        const updatedService = await service.save()
        res.status(201).json(updatedService)
    } else {
        res.status(404)
        throw new Error('Service not found')
    }
})

// @desc create a Service
// @route create api/Services/
// @acess Privet/Admin
const createService = expressAsyncHandler(async (req, res) => {
    const {
        name,
        description,
        coverImage,
        icon
    } = req.body
    const service = new Service({
        user: req.user._id,
        name,
        description,
        coverImage,
        icon,
        viewCount: 0
    })
    const createdService = await service.save()
    res.status(201).json(createdService)

})

export {
    getAllServices,
    getServices,
    getServiceById,
    getServiceByIdPreview,
    deleteService,
    updateService,
    createService
}