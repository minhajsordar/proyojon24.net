import expressAsyncHandler from "express-async-handler";
import Ward from '../models/wardModel.js'
import PinLocation from '../models/pinLocationModel.js'

// @desc get products
// @route Put api/products
// @acess Privet
const getPinLocations =  expressAsyncHandler(async (req, res) => {
    const pageSize =  Number(req.query.pageSize) || 100;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }:{}
    const count = await PinLocation.countDocuments({...keyword})
    const pinLocations = await PinLocation.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({pinLocations, page, pages: Math.ceil(count / pageSize)})
})

// @desc get products
// @route Put api/products
// @acess Public
const getAllPinLocations =  expressAsyncHandler(async (req, res) => {

    const keyword = req.query.wardId? {"parent._id":req.query.wardId}:{}
    const pinLocations = await PinLocation.find({...keyword})
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(pinLocations)
})

// @desc get product by id
// @route Put api/products/:id
// @acess Privet
const getPinLocationById = expressAsyncHandler(async (req, res) => {
    const pinLocations = await PinLocation.findById(req.params.id)
    if (pinLocations) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(pinLocations)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('PinLocation not found')
    }
})

// @desc delete a product
// @route Delete api/products/:id
// @acess Privet/Admin
const deletePinLocation = expressAsyncHandler(async (req, res) => {
    const pinLocations = await PinLocation.findById(req.params.id)
    if (pinLocations) {
        await pinLocations.deleteOne()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({message: 'PinLocation removed'})
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('PinLocation not found')
    }
})

// @desc update a product
// @route update api/products/
// @acess Privet/Admin
const updatePinLocation = expressAsyncHandler(async (req, res) => {
    const {
        name,
        parent,
    } = req.body
    const ward = await Ward.findById(parent._id)
    if (ward) {
        const pinLocations = await PinLocation.findById(req.params.id)
        if(pinLocations){
            pinLocations.name = name
            pinLocations.parent = parent
            const updatedPinLocation = await pinLocations.save()
            res.status(201).json(updatedPinLocation)
        }else{
            res.status(404)
            throw new Error('PinLocation not found')
        }
    } else {
        res.status(404)
        throw new Error('Parent Ward not found')
    }
})

// @desc create a product
// @route create api/products/
// @acess Privet/Admin
const createPinLocation = expressAsyncHandler(async (req, res) => {
    const ward = await Ward.findById(req.body.parent._id)
    if (ward) {
        const pinLocations = new PinLocation({
            user: req.user._id,
            name: req.body.name,
            parent: req.body.parent,
        })
        const createdPinLocation = await pinLocations.save()
        res.status(201).json(createdPinLocation)
    } else {
        res.status(404)
        throw new Error('Parent Ward not found')
    }
})

export {
    getPinLocations,
    getAllPinLocations,
    getPinLocationById,
    deletePinLocation,
    updatePinLocation,
    createPinLocation,
}
