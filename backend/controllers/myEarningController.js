import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import { MyEarning, MyEarningSummary } from '../models/myEarningModel.js'
import WithdrawalMethode from '../models/WithdrawalMethodeModel.js'

const withdrawEarning = expressAsyncHandler(async (req, res) => {
  const {
    methode
  } = req.body
  const withdrawMethode = await WithdrawalMethode.findById(methode)
  if (withdrawMethode) {
    const myEarningSummary = await MyEarningSummary.findOne({
      user: req.user._id,
    })
    if (myEarningSummary.balance > 0) {
      const myEarning = await MyEarning.create({
        user: req.user._id,
        reference: req.user._id,
        activity: "Withdraw",
        status: "pending",
        amount: '-' + String(myEarningSummary.balance),
        description: `Account phone number ${withdrawMethode.phone}, ${withdrawMethode.mobileBankName}`,
      })
      if (myEarning) {
        myEarningSummary.withdrawan += myEarningSummary.balance
        myEarningSummary.balance = 0
        myEarningSummary.save()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(201).json(myEarning)
      }
    } else {
      res.status(201).json({ message: 'balance is zero' })
    }
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
  const count = await MyEarning.countDocuments({ user: req.user._id, })
  const myEarnings = await MyEarning.find({ user: req.user._id, }).populate({ path: 'reference', select: 'registrationNo' }).sort({ createdAt: 'desc' }).limit(pageSize).skip(pageSize * (page - 1))
  const myEarningSummary = await MyEarningSummary.findOne({
    user: req.user._id,
  })

  res.json({ myEarnings, myEarningSummary, page, pages: Math.ceil(count / pageSize) })
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const getWithdrawalList = expressAsyncHandler(async (req, res) => {
  const keywords = {
    activity: "Withdraw",
    status: "pending",
  }
  const pageSize = Number(req.query.pageSize) || 30;
  const page = Number(req.query.pageNumber) || 1;
  const count = await MyEarning.countDocuments({ ...keywords })
  const withdrawList = await MyEarning.find({ ...keywords }).populate({path: 'user', select: 'registrationNo'}).sort({ createdAt: 'desc' }).limit(pageSize).skip(pageSize * (page - 1))
  res.json({ withdrawList, page, pages: Math.ceil(count / pageSize) })
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const approveWithdraw = expressAsyncHandler(async (req, res) => {
  const withdrawEarning = await MyEarning.findById(req.params.id)
  if (withdrawEarning) {
    withdrawEarning.status = 'approved'
    withdrawEarning.save()
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(201).json(withdrawEarning)
  } else {
    res.status(400)
    throw new Error('Withdraw Data Not Found')
  }
})


export {
  withdrawEarning,
  getMyEarningList,
  getWithdrawalList,
  approveWithdraw,
}