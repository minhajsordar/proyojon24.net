import expressAsyncHandler from "express-async-handler";
import District from '../models/districtModel.js'
import Division from '../models/divisionModel.js'

// @desc get districts
// @route Put api/districts
// @acess Privet
const getDistricts = expressAsyncHandler(async (req, res) => {
    const pageSize =  Number(req.query.pageSize) || 70;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await District.countDocuments({ ...keyword })
    const districts = await District.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ districts, page, pages: Math.ceil(count / pageSize) })
})

// @desc get districts
// @route Put api/districts
// @acess Privet
const getAllDistricts = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.divisionId? {"parent._id":req.query.divisionId}:{}
    const districts = await District.find({ ...keyword })
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    req.io.emit('foo',{"message":"hello"})

    res.status(200).json(districts)
})

// @desc get district by id
// @route Put api/districts/:id
// @acess Privet
const getDistrictById = expressAsyncHandler(async (req, res) => {
    const district = await District.findById(req.params.id)
    if (district) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(district)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('District not found')
    }
})

// @desc delete a district
// @route Delete api/districts/:id
// @acess Privet/Admin
const deleteDistrict = expressAsyncHandler(async (req, res) => {
    const district = await District.findById(req.params.id)
    if (district) {
        await district.deleteOne()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({ message: 'District removed' })
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('District not found')
    }
})

// @desc update a district
// @route update api/districts/
// @acess Privet/Admin
const updateDistrict = expressAsyncHandler(async (req, res) => {
    const division = await Division.findById(req.body.parent._id)
    const {
        name,
        parent,
    } = req.body
    const district = await District.findById(req.params.id)
    if (district) {
        if (division) {
            district.name = name
            district.parent = parent
            const updatedDistrict = await district.save()
            res.status(201).json(updatedDistrict)
        } else {
            res.status(404)
            throw new Error('Parent Division not found')
        }
    } else {
        res.status(404)
        throw new Error('District not found')
    }
})

// @desc create a district
// @route create api/districts/
// @acess Privet/Admin
const createDistrict = expressAsyncHandler(async (req, res) => {
    const division = await Division.findById(req.body.parent._id)
    if (division) {
        const district = new District({
            user: req.user._id,
            name: req.body.name,
            parent: req.body.parent,
        })
        const createdDistrict = await district.save()
        res.status(201).json(createdDistrict)
    } else {
        res.status(404)
        throw new Error('Parent Division not found')
    }
})

export {
    getDistricts,
    getAllDistricts,
    getDistrictById,
    deleteDistrict,
    updateDistrict,
    createDistrict,
}
