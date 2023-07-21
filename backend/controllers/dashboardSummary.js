import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import ServiceProvider from '../models/serviceProviderModel.js'
import DailyUser from '../models/dailyUserModel.js'
import MonthlyUser from '../models/monthlyUserModel.js'
import DailyProfileView from '../models/dailyProfileViewModel.js'
import Payment from '../models/paymentModel.js'

const userDashboardData = expressAsyncHandler(async (req, res) => {
  let totalUser = await User.countDocuments({})
  let profileView = await ServiceProvider.find({})
  let totalView = profileView.reduce((a, c) => a + c.viewCount, 0)
  res.status(200)
  res.json({ totalUser, totalView })
})

const totalPremiumUsers = expressAsyncHandler(async (req, res) => {
  let premiumUser = await User.find({
    premiumUserEndDate: {
      $lte: new Date()
    }
  }).countDocuments({})
  res.status(200)
  res.json({ premiumUser })
})

const getDataAnalysis = expressAsyncHandler(async (req, res) => {
  let premiumUser = await User.find({
    premiumUserEndDate: {
      $gte: new Date()
    }
  }).countDocuments({})
  let paidRegistration = await User.find({
    registrationType: 'paid'
  }).countDocuments({})

  const dailyProfileView = await DailyProfileView.find().sort({ createdAt: 'desc' }).limit(30);
  const dailyUsers = await DailyUser.find().sort({ createdAt: 'desc' }).limit(30);
  const monthlyUsers = await MonthlyUser.find().sort({ createdAt: 'desc' }).limit(12);
  if (dailyProfileView &&
    dailyUsers && monthlyUsers) {
    res.json({
      dailyProfileView,
      dailyUsers, monthlyUsers, premiumUser, paidRegistration
    });
  }
  else {
    res.status(500).json({ error: 'Failed to fetch monthly user data' });
  }
})
const getDailyUser = expressAsyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 30;
  const dailyUsers = await DailyUser.find().sort({ createdAt: 'desc' }).limit(pageSize);
  if (dailyUsers) {
    res.json(dailyUsers);
  }
  else {
    res.status(500).json({ error: 'Failed to fetch daily user data' });
  }
})
const getMonthlyUser = expressAsyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 12;
  const monthlyUsers = await MonthlyUser.find().sort({ createdAt: 'desc' }).limit(pageSize);
  if (monthlyUsers) {
    res.json(monthlyUsers);
  }
  else {
    res.status(500).json({ error: 'Failed to fetch monthly user data' });
  }
})
const getMonthlyUserProfileView = expressAsyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 30;
  const dailyProfileView = await DailyProfileView.find().sort({ createdAt: 'desc' }).limit(pageSize);
  if (dailyProfileView) {
    res.json(dailyProfileView);
  }
  else {
    res.status(500).json({ error: 'Failed to fetch monthly user profile view data' });
  }
})
const pendingForApprovalList = expressAsyncHandler(async (req, res) => {

  // pending payment
  const paymentPending = await Payment.countDocuments({
    status: 'pending',
  })
  // pending service provider
  const serviceProviderPending = await ServiceProvider.countDocuments({ waitingForApproval: true })

  // pending nid
  const nidPending = await User.countDocuments({
    nidStatus: 'pending'
  })
  res.json({ nidPending, serviceProviderPending, paymentPending })
})

export {
  userDashboardData,
  getDataAnalysis,
  getDailyUser,
  getMonthlyUser,
  getMonthlyUserProfileView,
  totalPremiumUsers,
  pendingForApprovalList,
}