import expressAsyncHandler from "express-async-handler";
import Ward from '../models/wardModel.js'

// @desc get products
// @route Put api/products
// @acess Privet
const getWards =  expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }:{}
    const count = await Ward.countDocuments({...keyword})
    const wards = await Ward.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({wards, page, pages: Math.ceil(count / pageSize)})
})

// @desc get product by id
// @route Put api/products/:id
// @acess Privet
const getWardById = expressAsyncHandler(async (req, res) => {
    const wards = await Ward.findById(req.params.id)
    if (wards) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(wards)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Ward not found')
    }
})

// @desc delete a product
// @route Delete api/products/:id
// @acess Privet/Admin
const deleteWard = expressAsyncHandler(async (req, res) => {
    const wards = await Ward.findById(req.params.id)
    if (wards) {
        await wards.remove()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({message: 'Ward removed'})
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Ward not found')
    }
})

// @desc update a product
// @route update api/products/
// @acess Privet/Admin
const updateWard = expressAsyncHandler(async (req, res) => {
    const {
        name,
        parent,
    } = req.body
    const wards = await Ward.findById(req.params.id)
    if(wards){
        wards.name = name
        wards.parent = parent
        const updatedWard = await wards.save()
        res.status(201).json(updatedWard)
    }else{
        res.status(404)
        throw new Error('Ward not found')
    }
})

// @desc create a product
// @route create api/products/
// @acess Privet/Admin
const createWard = expressAsyncHandler(async (req, res) => {
    const wards = new Ward({
        user: req.user._id,
        name: req.name,
        parent: req.parent,
    })
    const createdWard = await wards.save()
    res.status(201).json(createdWard)
    
})

export {
    getWards,
    getWardById,
    deleteWard,
    updateWard,
    createWard,
}
