import expressAsyncHandler from "express-async-handler";
import SubDistrict from '../models/subDistrictModel.js'
import District from '../models/districtModel.js'
// @desc get sub districtss
// @route Put api/sub districtss
// @acess Privet
const getSubDistricts = expressAsyncHandler(async (req, res) => {
    const pageSize =  Number(req.query.pageSize) || 100;
    const page = Number(req.query.pageNumber) || 1;
    const keywords = req.query.keywords ? {
        name: {
            $regex: req.query.keywords,
            $options: 'i'
        }
    } : {}
    const count = await SubDistrict.countDocuments({ ...keywords })
    const subDistricts = await SubDistrict.find({ ...keywords }).limit(pageSize).skip(pageSize * (page - 1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ subDistricts, page, pages: Math.ceil(count / pageSize) })
})
// @desc get sub districtss
// @route Put api/sub districtss
// @acess Privet
const getAllSubDistricts = expressAsyncHandler(async (req, res) => {
    const keywords = req.query.districtId? {"parent._id":req.query.districtId}:{}
    const subDistricts = await SubDistrict.find({ ...keywords })
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(subDistricts)
})

// @desc get sub districts by id
// @route Put api/sub districtss/:id
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

// @desc delete a sub districts
// @route Delete api/sub districtss/:id
// @acess Privet/Admin
const deleteSubDistrict = expressAsyncHandler(async (req, res) => {
    const subDistricts = await SubDistrict.findById(req.params.id)
    if (subDistricts) {
        await subDistricts.deleteOne()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({ message: 'SubDistrict removed' })
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('SubDistrict not found')
    }
})

// @desc update a sub districts
// @route update api/sub districtss/
// @acess Privet/Admin
const updateSubDistrict = expressAsyncHandler(async (req, res) => {
    const {
        name,
        parent,
    } = req.body
    const district = await District.findById(parent._id)
    if (district) {
        const subDistricts = await SubDistrict.findById(req.params.id)
        if (subDistricts) {
            subDistricts.name = name
            subDistricts.parent = parent
            const updatedSubDistrict = await subDistricts.save()
            res.status(201).json(updatedSubDistrict)
        } else {
            res.status(404)
            throw new Error('SubDistrict not found')
        }
    } else {
        res.status(404)
        throw new Error('Parent District not found')
    }
})

// @desc create a sub districts
// @route create api/sub districtss/
// @acess Privet/Admin
const createSubDistrict = expressAsyncHandler(async (req, res) => {
    const district = await District.findById(req.body.parent._id)
    if (district) {
        const subDistricts = new SubDistrict({
            user: req.user._id,
            name: req.body.name,
            parent: req.body.parent,
        })
        const createdSubDistrict = await subDistricts.save()
        res.status(201).json(createdSubDistrict)
    } else {
        res.status(404)
        throw new Error('Parent District not found')
    }
})

export {
    getSubDistricts,
    getAllSubDistricts,
    getSubDistrictById,
    deleteSubDistrict,
    updateSubDistrict,
    createSubDistrict,
}
