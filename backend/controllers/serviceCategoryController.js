import expressAsyncHandler from "express-async-handler";
import ServiceCategory from '../models/serviceCategoryModel.js'

// @desc get ServiceCategory
// @route Put api/ServiceCategory
// @acess Privet
const getServiceCategorys = expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await ServiceCategory.countDocuments({ ...keyword })
    const serviceCategorys = await ServiceCategory.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ serviceCategorys, page, pages: Math.ceil(count / pageSize) })
})
// @desc get ServiceCategory
// @route Put api/ServiceCategory
// @acess Privet
const getAllServiceCategorys = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.serviceId? {service:req.query.serviceId}:{}
    const serviceCategorys = await ServiceCategory.find({ ...keyword })
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(serviceCategorys)
})

// @desc get product by id
// @route Put api/ServiceCategory/:id
// @acess Privet
const getServiceCategoryById = expressAsyncHandler(async (req, res) => {
    const serviceCategory = await ServiceCategory.findById(req.params.id)
    if (serviceCategory) {
        serviceCategory.viewCount += 1
        const updatedServiceCategory = await serviceCategory.save()
        
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(updatedServiceCategory)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('ServiceCategory not found')
    }
})

// @desc get product by id
// @route Put api/ServiceCategory/:id
// @acess Privet
const getServiceCategoryByIdPreview = expressAsyncHandler(async (req, res) => {
    const serviceCategory = await ServiceCategory.findById(req.params.id)
    if (serviceCategory) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(serviceCategory)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('ServiceCategory not found')
    }
})

// @desc get product by id
// @route Put api/ServiceCategoryBy Service/:id
// @acess Privet
const getServiceCategoryByService = expressAsyncHandler(async (req, res) => {
    const pageSize =  Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await ServiceCategory.find({service:req.params.id}).countDocuments({ ...keyword })
    const serviceCategorys = await ServiceCategory.find({service:req.params.id}).limit(pageSize).skip(pageSize * (page - 1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ serviceCategorys, page, pages: Math.ceil(count / pageSize) })

})

// @desc delete a ServiceCategory
// @route Delete api/ServiceCategorys/:id
// @acess Privet/Admin
const deleteServiceCategory = expressAsyncHandler(async (req, res) => {
    const serviceCategory = await ServiceCategory.findById(req.params.id)
    if (serviceCategory) {
        await serviceCategory.deleteOne()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({ message: 'ServiceCategory removed' })
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('ServiceCategory not found')
    }
})

// @desc update a product
// @route update api/ServiceCategory/
// @acess Privet/Admin
const updateServiceCategory = expressAsyncHandler(async (req, res) => {
    const {
        name,
        service,
        description,
        coverImage,
        icon,
        order
    } = req.body
    const serviceCategory = await ServiceCategory.findById(req.params.id)
    if (serviceCategory) {
        serviceCategory.user = req.user._id
        serviceCategory.name = name
        if(service){
            serviceCategory.service = service
        }
        if(description){
            serviceCategory.description = description
        }
        if(coverImage){
            serviceCategory.coverImage = coverImage
        }
        if(icon){
            serviceCategory.icon = icon
        }
        if(order){
            serviceCategory.order = order
        }
        const updatedServiceCategory = await serviceCategory.save()
        res.status(201).json(updatedServiceCategory)
    } else {
        res.status(404)
        throw new Error('ServiceCategory not found')
    }
})

// @desc create a ServiceCategory
// @route create api/ServiceCategorys/
// @acess Privet/Admin
const createServiceCategory = expressAsyncHandler(async (req, res) => {
    const {
        name,
        service,
        description,
        coverImage,
        icon,
        order
    } = req.body
    const serviceCategory = new ServiceCategory({
        user:req.user._id,
        name,
        service,
        description,
        coverImage,
        icon,
        order
    })
    const createdServiceCategory = await serviceCategory.save()
    res.status(201).json(createdServiceCategory)

})

export {
    getServiceCategorys,
    getAllServiceCategorys,
    getServiceCategoryById,
    getServiceCategoryByIdPreview,
    getServiceCategoryByService,
    deleteServiceCategory,
    updateServiceCategory,
    createServiceCategory
}