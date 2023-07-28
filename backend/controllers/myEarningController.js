import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import MonthlyFee from '../models/monthlyFeeModel.js'

const createMonthlyFee = expressAsyncHandler(async (req, res) => {
  const {
    employeeCount,
    amount
  } = req.body

  const monthlyFee = await MonthlyFee.create({
    user: req.user._id,
    updatedBy: req.user._id,
    employeeCount,
    amount
  })

  if (monthlyFee) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(monthlyFee)
  } else {
    res.status(400)
    throw new Error('Couldnot Create Monthly Fee Data')
  }
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const getMonthlyFeeList = expressAsyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 30;
  const page = Number(req.query.pageNumber) || 1;
  const count = await MonthlyFee.countDocuments({})
  const monthlyFees = await MonthlyFee.find({ }).sort({ createdAt: 'desc' }).limit(pageSize).skip(pageSize * (page - 1))
  res.json({ monthlyFees, page, pages: Math.ceil(count / pageSize) })
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const updateMonthlyFee = expressAsyncHandler(async (req, res) => {
  const {
    employeeCount,
    amount
  } = req.body

const monthlyFee = await MonthlyFee.findById(req.params.id)
  if (monthlyFee) {
    monthlyFee.amount = amount
    monthlyFee.employeeCount = employeeCount
    monthlyFee.employeeCount = employeeCount
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(monthlyFee)
  } else {
    res.status(400)
    throw new Error('Monthly Fee Data Not Found')
  }
})

// @desc Delete user
// @route PUT api/users/:id
// @acess Privet/Admin
const deleteMonthlyFee = expressAsyncHandler(async (req, res) => {
  const monthlyFee = await MonthlyFee.findById(req.params.id)
  if (monthlyFee) {
    await monthlyFee.deleteOne()
    res.json({ message: 'monthlyFee removed' })
  } else {
    res.status(404)
    throw new Error('Monthly Fee not found or you cannot delete approved payment data')
  }
})

export {
  createMonthlyFee,
  getMonthlyFeeList,
  updateMonthlyFee,
  deleteMonthlyFee,
}