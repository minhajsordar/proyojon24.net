import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import MyPaymentMethode from '../models/myPaymentMethodeModel.js'

const createMyPaymentMethode = expressAsyncHandler(async (req, res) => {
  const {
    phone,
    mobileBankName
  } = req.body

  const myPaymentMethode = await MyPaymentMethode.create({
    user: req.user._id,
    phone,
    mobileBankName
  })

  if (myPaymentMethode) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(myPaymentMethode)
  } else {
    res.status(400)
    throw new Error('Couldnot Create My Payment Methode Data')
  }
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const getMyPaymentMethodeList = expressAsyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 30;
  const page = Number(req.query.pageNumber) || 1;
  const count = await MyPaymentMethode.countDocuments({})
  const myPaymentMethodes = await MyPaymentMethode.find({}).sort({ createdAt: 'desc' }).limit(pageSize).skip(pageSize * (page - 1))
  res.json({ myPaymentMethodes, page, pages: Math.ceil(count / pageSize) })
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const updateMyPaymentMethode = expressAsyncHandler(async (req, res) => {
  const {
    phone,
    mobileBankName
  } = req.body

  const myPaymentMethode = await MyPaymentMethode.findById(req.params.id)
  if (myPaymentMethode) {
    myPaymentMethode.phone = phone
    myPaymentMethode.mobileBankName = mobileBankName
    myPaymentMethode.updatedBy = updatedBy
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(myPaymentMethode)
  } else {
    res.status(400)
    throw new Error('My Payment Methode Data Not Found')
  }
})

// @desc Delete user
// @route PUT api/users/:id
// @acess Privet/Admin
const deleteMyPaymentMethode = expressAsyncHandler(async (req, res) => {
  const myPaymentMethode = await MyPaymentMethode.findById(req.params.id)
  if (myPaymentMethode) {
    await myPaymentMethode.deleteOne()
    res.json({ message: 'myPaymentMethode removed' })
  } else {
    res.status(404)
    throw new Error('My Payment Methode not found or you cannot delete approved payment data')
  }
})

export {
  createMyPaymentMethode,
  getMyPaymentMethodeList,
  updateMyPaymentMethode,
  deleteMyPaymentMethode,
}