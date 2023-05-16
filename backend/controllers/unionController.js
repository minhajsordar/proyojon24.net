import expressAsyncHandler from "express-async-handler";
import Union from '../models/unionModel.js'

// @desc get products
// @route Put api/products
// @acess Privet
const getUnions =  expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }:{}
    const count = await Union.countDocuments({...keyword})
    const unions = await Union.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({unions, page, pages: Math.ceil(count / pageSize)})
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
        await unions.remove()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({message: 'Union removed'})
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
    const unions = await Union.findById(req.params.id)
    if(unions){
        unions.name = name
        unions.parent = parent
        const updatedUnion = await unions.save()
        res.status(201).json(updatedUnion)
    }else{
        res.status(404)
        throw new Error('Union not found')
    }
})

// @desc create a product
// @route create api/products/
// @acess Privet/Admin
const createUnion = expressAsyncHandler(async (req, res) => {
    const unions = new Union({
        user: req.user._id,
        name: req.name,
        parent: req.parent,
    })
    const createdUnion = await unions.save()
    res.status(201).json(createdUnion)
    
})

export {
    getUnions,
    getUnionById,
    deleteUnion,
    updateUnion,
    createUnion,
}
