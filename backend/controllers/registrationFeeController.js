import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import RegistrationFee from '../models/registrationFeeModel.js'

const createRegistrationFee = expressAsyncHandler(async (req, res) => {
  const {
    employeeCount,
    amount
  } = req.body

  const registrationFee = await RegistrationFee.create({
    user: req.user._id,
    updatedBy: req.user._id,
    employeeCount,
    amount
  })

  if (registrationFee) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(registrationFee)
  } else {
    res.status(400)
    throw new Error('Couldnot Create Registration Fee Data')
  }
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const getRegistrationFeeList = expressAsyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 30;
  const page = Number(req.query.pageNumber) || 1;
  const count = await RegistrationFee.countDocuments({})
  const registrationFees = await RegistrationFee.find({}).sort({ createdAt: 'desc' }).limit(pageSize).skip(pageSize * (page - 1))
  res.json({ registrationFees, page, pages: Math.ceil(count / pageSize) })
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const updateRegistrationFee = expressAsyncHandler(async (req, res) => {
  const {
    employeeCount,
    amount
  } = req.body

  const registrationFee = await RegistrationFee.findById(req.params.id)
  if (registrationFee) {
    registrationFee.updatedBy= req.user._id
    registrationFee.amount = amount
    registrationFee.employeeCount = employeeCount
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(registrationFee)
  } else {
    res.status(400)
    throw new Error('Registration Fee Data Not Found')
  }
})

// @desc Delete user
// @route PUT api/users/:id
// @acess Privet/Admin
const deleteRegistrationFee = expressAsyncHandler(async (req, res) => {
  const registrationFee = await RegistrationFee.findById(req.params.id)
  if (registrationFee) {
    await registrationFee.deleteOne()
    res.json({ message: 'RegistrationFee removed' })
  } else {
    res.status(404)
    throw new Error('Registration Fee not found or you cannot delete approved payment data')
  }
})

export {
  createRegistrationFee,
  getRegistrationFeeList,
  updateRegistrationFee,
  deleteRegistrationFee,
}