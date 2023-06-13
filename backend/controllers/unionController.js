import expressAsyncHandler from "express-async-handler";
import Union from '../models/unionModel.js'
import Ward from '../models/wardModel.js'
import SubDistrict from '../models/subDistrictModel.js'
import commonWardList from '../data/ward.js'
// @desc get unions
// @route Put api/unions
// @acess Privet
const getUnions = expressAsyncHandler(async (req, res) => {
    const pageSize =  Number(req.query.pageSize) || 100;
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
// @desc get unions
// @route Put api/unions
// @acess Privet
const getAllUnions = expressAsyncHandler(async (req, res) => {
    
    const keyword = req.query.subDistrictId? {"parent._id":req.query.subDistrictId}:{}
    const unions = await Union.find({...keyword})
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(unions)
})

// @desc get union by id
// @route Put api/unions/:id
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

// @desc delete a union
// @route Delete api/unions/:id
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

// @desc update a union
// @route update api/unions/
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

// @desc create a union
// @route create api/unions/
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


        // const commonWardLists = commonWardList.map((wards) => {
        //     return { ...wards, parent: createdUnion, 
        //         user: req.user._id }
        // })
        // let createwardslist = await Ward.insertMany(commonWardLists)

        res.status(201).json({message: "Successfully union created."})
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
