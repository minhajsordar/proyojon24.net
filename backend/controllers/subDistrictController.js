import expressAsyncHandler from "express-async-handler";
import SubDistrict from '../models/subDistrictModel.js'

// @desc get products
// @route Put api/products
// @acess Privet
const getSubDistricts =  expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }:{}
    const count = await SubDistrict.countDocuments({...keyword})
    const subDistricts = await SubDistrict.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({subDistricts, page, pages: Math.ceil(count / pageSize)})
})

// @desc get product by id
// @route Put api/products/:id
// @acess Privet
const getSubDistrictById = expressAsyncHandler(async (req, res) => {
    const subDistricts = await SubDistrict.findById(req.params.id)
    if (subDistricts) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(subDistricts)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('SubDistrict not found')
    }
})

// @desc delete a product
// @route Delete api/products/:id
// @acess Privet/Admin
const deleteSubDistrict = expressAsyncHandler(async (req, res) => {
    const subDistricts = await SubDistrict.findById(req.params.id)
    if (subDistricts) {
        await subDistricts.remove()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({message: 'SubDistrict removed'})
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('SubDistrict not found')
    }
})

// @desc update a product
// @route update api/products/
// @acess Privet/Admin
const updateSubDistrict = expressAsyncHandler(async (req, res) => {
    const {
        name,
        parent,
    } = req.body
    const subDistricts = await SubDistrict.findById(req.params.id)
    if(subDistricts){
        subDistricts.name = name
        subDistricts.parent = parent
        const updatedSubDistrict = await subDistricts.save()
        res.status(201).json(updatedSubDistrict)
    }else{
        res.status(404)
        throw new Error('SubDistrict not found')
    }
})

// @desc create a product
// @route create api/products/
// @acess Privet/Admin
const createSubDistrict = expressAsyncHandler(async (req, res) => {
    const subDistricts = new SubDistrict({
        user: req.user._id,
        name: req.name,
        parent: req.parent,
    })
    const createdSubDistrict = await subDistricts.save()
    res.status(201).json(createdSubDistrict)
    
})

export {
    getSubDistricts,
    getSubDistrictById,
    deleteSubDistrict,
    updateSubDistrict,
    createSubDistrict,
}
