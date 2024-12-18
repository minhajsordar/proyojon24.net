import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import Payment from '../models/paymentModel.js'

const createPayment = expressAsyncHandler(async (req, res) => {
  const {
    bankAccountName,
    phoneNumber,
    transactionId,
    amount
  } = req.body

  const payment = await Payment.create({
    user: req.user._id,
    bankAccountName,
    phoneNumber,
    transactionId,
    amount
  })

  if (payment) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(payment)
  } else {
    res.status(400)
    throw new Error('Payment Data')
  }
})

const createRegistrationFee = expressAsyncHandler(async (req, res) => {
  const {
    bankAccountName,
    phoneNumber,
    transactionId,
    amount
  } = req.body

  const payment = await Payment.create({
    user: req.user._id,
    bankAccountName,
    phoneNumber,
    transactionId,
    amount,
    paymentFor: "registration",
  })

  if (payment) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(payment)
  } else {
    res.status(400)
    throw new Error('Payment Data')
  }
})

// Update user profile
// route PUT api/user/profile
// acess Privet
const approveOrRejectPayment = expressAsyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id)
  if (payment) {
    payment.status = req.body.status
    payment.note = req.body.note
    payment.approvedOrRejectedBy = req.user._id
    const updatedPayment = await payment.save()
    if(updatedPayment.status === 'approved' && updatedPayment.paymentFor === 'registration'){
      const userid = await User.findByIdAndUpdate(payment.user, {registrationType: 'paid'})
    }
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.json(updatedPayment)
  } else {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const getPaymentList = expressAsyncHandler(async (req, res) => {
  const keywords = {}
  if (req.user._id) {
    keywords.user = req.user._id
  }else{
      // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
      res.status(404)
      throw new Error('Please login')
  }
  const pageSize = Number(req.query.pageSize) || 30;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Payment.countDocuments({...keywords})
  const payments = await Payment.find({ ...keywords }).sort({ createdAt: 'desc' }).limit(pageSize).skip(pageSize * (page - 1))
  res.json({ payments, page, pages: Math.ceil(count / pageSize) })
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const getPendingPaymentList = expressAsyncHandler(async (req, res) => {
  const keywords = {
    status: 'pending',
  }
  const pageSize = Number(req.query.pageSize) || 30;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Payment.countDocuments({ ...keywords })
  const payments = await Payment.find({ ...keywords }).sort({ createdAt: 'desc' }).limit(pageSize).skip(pageSize * (page - 1)).populate({path:'user',select: 'registrationNo'})
  res.json({ payments, page, pages: Math.ceil(count / pageSize) })
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const getRegistrationPaymentByUser = expressAsyncHandler(async (req, res) => {
  const keywords = {}
  if (req.user._id) {
    keywords.user = req.user._id
    keywords.paymentFor = "registration"
  }else{
      // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
      res.status(404)
      throw new Error('Please login')
  }
  const payments = await Payment.find({ ...keywords })
  res.json(payments)
})

// @desc Delete user
// @route PUT api/users/:id
// @acess Privet/Admin
const deletePayment = expressAsyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id)
  if (payment && payment.status !== 'approved' && payment.user === req.user._id) {
    await payment.deleteOne()
    res.json({ message: 'Payment removed' })
  } else {
    res.status(404)
    throw new Error('Payment not found or you cannot delete approved payment data')
  }
})

export {
  createPayment,
  approveOrRejectPayment,
  getPaymentList,
  deletePayment,
  createRegistrationFee,
  getRegistrationPaymentByUser,
  getPendingPaymentList,
}