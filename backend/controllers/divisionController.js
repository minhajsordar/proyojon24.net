import expressAsyncHandler from "express-async-handler";
import Division from '../models/divisionModel.js'

// @desc get divisions
// @route Put api/divisions
// @acess Privet
const getDivisions =  expressAsyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 20;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }:{}
    const count = await Division.countDocuments({...keyword})
    const divisions = await Division.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({divisions, page, pages: Math.ceil(count / pageSize)})
})

// @desc get divisions
// @route Put api/divisions
// @acess Privet
const getAllDivisions =  expressAsyncHandler(async (req, res) => {
    const divisions = await Division.find({})
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(divisions)
})

// @desc get division by id
// @route Put api/divisions/:id
// @acess Privet
const getDivisionById = expressAsyncHandler(async (req, res) => {
    const division = await Division.findById(req.params.id)
    if (division) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(division)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Division not found')
    }
})

// @desc delete a division
// @route Delete api/divisions/:id
// @acess Privet/Admin
const deleteDivision = expressAsyncHandler(async (req, res) => {
    const division = await Division.findById(req.params.id)
    if (division) {
        await division.deleteOne()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({message: 'Division removed'})
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('Division not found')
    }
})

// @desc update a division
// @route update api/divisions/
// @acess Privet/Admin
const updateDivision = expressAsyncHandler(async (req, res) => {
    const {
        name,
    } = req.body
    const division = await Division.findById(req.params.id)
    if(division){
        division.name = name
        const updatedDivision = await division.save()
        res.status(201).json(updatedDivision)
    }else{
        res.status(404)
        throw new Error('Division not found')
    }
})

// @desc create a division
// @route create api/divisions/
// @acess Privet/Admin
const createDivision = expressAsyncHandler(async (req, res) => {
    const division = new Division({
        user: req.user._id,
        name: req.body.name,
    })
    const createdDivision = await division.save()
    res.status(201).json(createdDivision)
})

export {
    getDivisions,
    getAllDivisions,
    getDivisionById,
    deleteDivision,
    updateDivision,
    createDivision,
}
