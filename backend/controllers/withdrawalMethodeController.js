import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import WithdrawalMethode from '../models/WithdrawalMethodeModel.js'

const createWithdrawalMethode = expressAsyncHandler(async (req, res) => {
  const {
    phone,
    mobileBankName
  } = req.body

  const withdrawalMethode = await WithdrawalMethode.create({
    user: req.user._id,
    phone,
    mobileBankName
  })

  if (withdrawalMethode) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(withdrawalMethode)
  } else {
    res.status(400)
    throw new Error('Couldnot Create My Payment Methode Data')
  }
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const getWithdrawalMethodeList = expressAsyncHandler(async (req, res) => {
  const withdrawalMethodes = await WithdrawalMethode.find({ user: req.user._id })
  res.json(withdrawalMethodes)
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const updateWithdrawalMethode = expressAsyncHandler(async (req, res) => {
  const {
    phone,
    mobileBankName
  } = req.body

  const withdrawalMethode = await WithdrawalMethode.findById(req.params.id)
  if (withdrawalMethode) {
    withdrawalMethode.phone = phone
    withdrawalMethode.mobileBankName = mobileBankName
    withdrawalMethode.updatedBy = updatedBy
    withdrawalMethode.save()
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(withdrawalMethode)
  } else {
    res.status(400)
    throw new Error('My Payment Methode Data Not Found')
  }
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const requestDeleteWithdrawalMethode = expressAsyncHandler(async (req, res) => {
  const withdrawalMethode = await WithdrawalMethode.findOne({
    _id: req.params.id,
    user: req.user._id
  })
  if (withdrawalMethode) {
    withdrawalMethode.pendingForRemove = true
    withdrawalMethode.save()
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(withdrawalMethode)
  } else {
    res.status(400)
    throw new Error('My Payment Methode Data Not Found')
  }
})

// @desc Delete user
// @route PUT api/users/:id
// @acess Privet/Admin
const deleteWithdrawalMethode = expressAsyncHandler(async (req, res) => {
  const withdrawalMethode = await WithdrawalMethode.findById(req.params.id)
  if (withdrawalMethode) {
    await withdrawalMethode.deleteOne()
    res.json({ message: 'A PaymentMethode removed' })
  } else {
    res.status(404)
    throw new Error('The Payment Methode not found or you cannot delete approved payment data')
  }
})

export {
  createWithdrawalMethode,
  getWithdrawalMethodeList,
  updateWithdrawalMethode,
  deleteWithdrawalMethode,
  requestDeleteWithdrawalMethode,
}