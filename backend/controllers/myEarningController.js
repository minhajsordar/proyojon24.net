import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import {MyEarning, MyEarningSummary} from '../models/myEarningModel.js'

const createMyEarning = expressAsyncHandler(async (req, res) => {
  const {
    employeeCount,
    amount
  } = req.body

  const myEarning = await MyEarning.create({
    user: req.user._id,
    updatedBy: req.user._id,
    employeeCount,
    amount
  })

  if (myEarning) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(myEarning)
  } else {
    res.status(400)
    throw new Error('Could not Create Monthly Fee Data')
  }
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const getMyEarningList = expressAsyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 30;
  const page = Number(req.query.pageNumber) || 1;
  const count = await MyEarning.countDocuments({})
  const myEarnings = await MyEarning.find({ }).sort({ createdAt: 'desc' }).limit(pageSize).skip(pageSize * (page - 1))
  res.json({ myEarnings, page, pages: Math.ceil(count / pageSize) })
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const updateMyEarning = expressAsyncHandler(async (req, res) => {
  const {
    employeeCount,
    amount
  } = req.body

const myEarning = await MyEarning.findById(req.params.id)
  if (myEarning) {
    myEarning.amount = amount
    myEarning.employeeCount = employeeCount
    myEarning.employeeCount = employeeCount
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(myEarning)
  } else {
    res.status(400)
    throw new Error('Monthly Fee Data Not Found')
  }
})

// @desc Delete user
// @route PUT api/users/:id
// @acess Privet/Admin
const deleteMyEarning = expressAsyncHandler(async (req, res) => {
  const myEarning = await MyEarning.findById(req.params.id)
  if (myEarning) {
    await myEarning.deleteOne()
    res.json({ message: 'myEarning removed' })
  } else {
    res.status(404)
    throw new Error('Monthly Fee not found or you cannot delete approved payment data')
  }
})

export {
  createMyEarning,
  getMyEarningList,
  updateMyEarning,
  deleteMyEarning,
}