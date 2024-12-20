import expressAsyncHandler from "express-async-handler";
import Ward from '../models/wardModel.js'
import Union from '../models/unionModel.js'

// @desc get wards
// @route Put api/wards
// @acess Privet
const getWards =  expressAsyncHandler(async (req, res) => {
    const pageSize =  Number(req.query.pageSize) || 100;
    const page = Number(req.query.pageNumber) || 1;
    const keywords = req.query.keywords ? {
        name: {
            $regex: req.query.keywords,
            $options: 'i'
        }
    }:{}
    const count = await Ward.countDocuments({...keywords})
    const wards = await Ward.find({...keywords}).limit(pageSize).skip(pageSize * (page-1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({wards, page, pages: Math.ceil(count / pageSize)})
})

// @desc get wards
// @route Put api/wards
// @acess Public
const getAllWards =  expressAsyncHandler(async (req, res) => {

    const keyword = req.query.unionId? {"parent._id":req.query.unionId}:{}
    const wards = await Ward.find({...keyword})
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(wards)
})

// @desc get ward by id
// @route Put api/wards/:id
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

// @desc delete a ward
// @route Delete api/wards/:id
// @acess Privet/Admin
const deleteWard = expressAsyncHandler(async (req, res) => {
    const wards = await Ward.findById(req.params.id)
    if (wards) {
        await wards.deleteOne()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({message: 'Ward removed'})
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Ward not found')
    }
})

// @desc update a ward
// @route update api/wards/
// @acess Privet/Admin
const updateWard = expressAsyncHandler(async (req, res) => {
    const {
        name,
        parent,
    } = req.body
    const union = await Union.findById(parent._id)
    if (union) {
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
    } else {
        res.status(404)
        throw new Error('Parent Union not found')
    }
})

// @desc create a ward
// @route create api/wards/
// @acess Privet/Admin
const createWard = expressAsyncHandler(async (req, res) => {
    const union = await Union.findById(req.body.parent._id)
    if (union) {
        const wards = new Ward({
            user: req.user._id,
            name: req.body.name,
            parent: req.body.parent,
        })
        const createdWard = await wards.save()
        res.status(201).json(createdWard)
    } else {
        res.status(404)
        throw new Error('Parent Union not found')
    }
})

export {
    getWards,
    getAllWards,
    getWardById,
    deleteWard,
    updateWard,
    createWard,
}
