import expressAsyncHandler from "express-async-handler";
import Union from '../models/unionModel.js'
import SubDistrict from '../models/subDistrictModel.js'

// @desc get products
// @route Put api/products
// @acess Privet
const getUnions = expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await Union.countDocuments({ ...keyword })
    const unions = await Union.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ unions, page, pages: Math.ceil(count / pageSize) })
})
// @desc get products
// @route Put api/products
// @acess Privet
const getAllUnions = expressAsyncHandler(async (req, res) => {
    
    const keyword = req.query.subDistrictId? {parent:{_id:req.query.subDistrictId}}:{}
    const unions = await Union.find({...keyword})
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(unions)
})

// @desc get product by id
// @route Put api/products/:id
// @acess Privet
const getUnionById = expressAsyncHandler(async (req, res) => {
    const unions = await Union.findById(req.params.id)
    if (unions) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(unions)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Union not found')
    }
})

// @desc delete a product
// @route Delete api/products/:id
// @acess Privet/Admin
const deleteUnion = expressAsyncHandler(async (req, res) => {
    const unions = await Union.findById(req.params.id)
    if (unions) {
        await unions.deleteOne()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({ message: 'Union removed' })
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Union not found')
    }
})

// @desc update a product
// @route update api/products/
// @acess Privet/Admin
const updateUnion = expressAsyncHandler(async (req, res) => {
    const {
        name,
        parent,
    } = req.body
    const subDistricts = await SubDistrict.findById(parent._id)
    if (subDistricts) {
        const unions = await Union.findById(req.params.id)
        if (unions) {
            unions.name = name
            unions.parent = parent
            const updatedUnion = await unions.save()
            res.status(201).json(updatedUnion)
        } else {
            res.status(404)
            throw new Error('Union not found')
        }

    } else {
        res.status(404)
        throw new Error('Parent Sub District not found')
    }
})

// @desc create a product
// @route create api/products/
// @acess Privet/Admin
const createUnion = expressAsyncHandler(async (req, res) => {
    const subDistricts = await SubDistrict.findById(req.body.parent._id)
    if (subDistricts) {
        const unions = new Union({
            user: req.user._id,
            name: req.body.name,
            parent: req.body.parent,
        })
        const createdUnion = await unions.save()
        res.status(201).json(createdUnion)
    } else {
        res.status(404)
        throw new Error('Parent Sub District not found')
    }
})

export {
    getUnions,
    getAllUnions,
    getUnionById,
    deleteUnion,
    updateUnion,
    createUnion,
}
