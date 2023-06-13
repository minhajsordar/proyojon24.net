import expressAsyncHandler from "express-async-handler";
import Union from '../models/unionModel.js'
import PinLocation from '../models/pinLocationModel.js'

// @desc get pinlocations
// @route Put api/pinlocations
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

// @desc get pinlocations
// @route Put api/pinlocations
// @acess Public
const getAllPinLocations =  expressAsyncHandler(async (req, res) => {

    const keyword = req.query.unionId? {"parent._id":req.query.unionId}:{}
    const pinLocations = await PinLocation.find({...keyword})
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(pinLocations)
})

// @desc get pinlocation by id
// @route Put api/pinlocations/:id
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

// @desc delete a pinlocation
// @route Delete api/pinlocations/:id
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

// @desc update a pinlocation
// @route update api/pinlocations/
// @acess Privet/Admin
const updatePinLocation = expressAsyncHandler(async (req, res) => {
    const {
        name,
        parent,
    } = req.body
    const union = await Union.findById(parent._id)
    if (union) {
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
        throw new Error('Parent Union not found')
    }
})

// @desc create a pinlocation
// @route create api/pinlocations/
// @acess Privet/Admin
const createPinLocation = expressAsyncHandler(async (req, res) => {
    const union = await Union.findById(req.body.parent._id)
    if (union) {
        const pinLocations = new PinLocation({
            user: req.user._id,
            name: req.body.name,
            parent: req.body.parent,
        })
        const createdPinLocation = await pinLocations.save()
        res.status(201).json(createdPinLocation)
    } else {
        res.status(404)
        throw new Error('Parent Union not found')
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
