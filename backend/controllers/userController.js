import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import ServiceProvider from '../models/serviceProviderModel.js'
import DailyUser from '../models/dailyUserModel.js'
import MonthlyUser from '../models/monthlyUserModel.js'
import generateToken from "../utils/generateToken.js";
import Payment from '../models/paymentModel.js'

const authUser = expressAsyncHandler(async (req, res) => {
  const { phoneOremail, password } = req.body
  let user = await User.findOne({ phone: phoneOremail })
  if (!user) {
    user = await User.findOne({ email: phoneOremail })
  }
  if (user && await user.matchPassword(password)) {
    const serviceProviderExist = await ServiceProvider.findOne({ user: user._id })
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    user.hasServiceProviderProfile = serviceProviderExist ? true : false
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
      phone: user.phone,
      phoneVerified: user.phoneVerified,
      nidNo: user.nidNo,
      nidImage: user.nidImage,
      presentAddress: user.presentAddress,
      permanentAddress: user.permanentAddress,
      isActive: user.isActive,
      isAvailable: user.isAvailable,
      permission: user.permission,
      premiumUserEndDate: user.premiumUserEndDate,
      registrationNo: user.registrationNo,
      hasServiceProviderProfile: user.hasServiceProviderProfile,
      reference: user.reference,
      token: generateToken(user._id),
    })
  } else {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(401)
    // res.json({message:"error"})
    throw new Error('Invalid email or password')
  }
})

const registerUser = expressAsyncHandler(async (req, res) => {
  const {
    bankAccountName,
    phoneNumber,
    transactionId,
    amount,
    reference,
    name,
    email,
    username,
    password,
    phone
  } = req.body
  const userExist = await User.findOne({ email, username, phone })

  if (userExist) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(400)
    throw new Error('User already exists with this email, username or phone')
  }

  const user = await User.create({
    reference,
    name,
    email,
    username,
    password,
    phone
  })

  if (user) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    // Update daily user count
    const today = new Date().setHours(0, 0, 0, 0); // Get current date
    const dailyUser = await DailyUser.findOne({ date: today });

    if (dailyUser) {
      dailyUser.userCount += 1;
      await dailyUser.save();
    } else {
      const newDailyUser = new DailyUser({ date: today, userCount: 1 });
      await newDailyUser.save();
    }
    // Update monthly user count

    const today2 = new Date();
    const year = today2.getFullYear();
    const month = today2.getMonth();

    const monthlyUser = await MonthlyUser.findOne({ year, month });

    if (monthlyUser) {
      monthlyUser.userCount += 1;
      await monthlyUser.save();
    } else {
      const newMonthlyUser = new MonthlyUser({ year, month, userCount: 1 });
      await newMonthlyUser.save();
    }
    // create registration payment 
    if (
      bankAccountName !== '' &&
      phoneNumber !== '' &&
      transactionId !== '' &&
      amount !== 0
    ) {
      await Payment.create({
        user: user._id,
        bankAccountName,
        phoneNumber,
        transactionId,
        amount
      })
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
      phone: user.phone,
      nidNo: user.nidNo,
      nidImage: user.nidImage,
      presentAddress: user.presentAddress,
      permanentAddress: user.permanentAddress,
      isActive: user.isActive,
      isAvailable: user.isAvailable,
      permission: user.permission,
      registrationNo: user.registrationNo,
      reference: user.reference,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
      phone: user.phone,
      nidNo: user.nidNo,
      nidImage: user.nidImage,
      presentAddress: user.presentAddress,
      permanentAddress: user.permanentAddress,
      permission: user.permission,
      registrationNo: user.registrationNo,
      isActive: user.isActive,
      isAvailable: user.isAvailable,
      reference: user.reference,
    })
  } else {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(404)
    throw new Error('User not found')
  }
})
// Update user profile
// route PUT api/user/profile
// acess Privet
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (req.body.permission) {
      user.permission = req.body.permission
    }
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.json({
      permission: updatedUser.permission,
    })
  } else {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const getUsers = expressAsyncHandler(async (req, res) => {
  const keywords = {}
  if (req.user.permission === 'self') {
    keywords.permission = { $nin: ['superAdmin', 'admin'] }
  }
  const pageSize = Number(req.query.pageSize) || 100;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.countDocuments({ ...keywords })
  const users = await User.find({ ...keywords }).select(["-password"]).limit(pageSize).skip(pageSize * (page - 1))
  res.json({ users, page, pages: Math.ceil(count / pageSize) })
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const getNidPendingUsers = expressAsyncHandler(async (req, res) => {
  const keywords = {
    nidStatus: 'pending'
  }
  const pageSize = Number(req.query.pageSize) || 100;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.countDocuments({ ...keywords })
  const users = await User.find({ ...keywords }).select(["-password"]).limit(pageSize).skip(pageSize * (page - 1))
  res.json({ users, page, pages: Math.ceil(count / pageSize) })
})

// @desc Get all users
// @route GET api/users
// @acess Privet
const approveOrRejectNid = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.nidStatus = req.body.nidStatus
    user.nidVerified = req.body.nidVerified
    user.note = req.body.note
    const updatedUser = await user.save()
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.json({
      _id: updatedUser._id,
      nidStatus: updatedUser.nidStatus,
      nidVerified: updatedUser.nidVerified,
      note: updatedUser.note,
    })
  } else {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Delete user
// @route PUT api/users/:id
// @acess Privet/Admin
const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.deleteOne()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Delete user
// @route PUT api/users/:id
// @acess Privet/Admin
const deleteRequest = expressAsyncHandler(async (req, res) => {
  if (req.user._id == req.params.id) {
    const user = await User.findById(req.params.id)
    if (user) {
      user.deleteRequest.requested = true
      user.deleteRequest.note = req.body.note
      await user.save()
      res.json({ message: 'Delete Request Submitted' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  } else {
    res.status(404)
    throw new Error('You can\'t make delete request')
  }
})

// @desc get user
// @route Put api/users/:id
// @acess Privet/Admin
const getUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (!user.permission == 'superAdmin') {
    user.phone = user.phone
    user.nidNo = user.nidNo
    user.nidImage = user.nidImage
    user.presentAddress = user.presentAddress
    user.permanentAddress = user.permanentAddress
  }
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// Update user profile
// route PUT api/user/profile
// acess Privet
const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    if (req.body.name?.bn) {
      user.name.bn = req.body.name?.bn
    }
    if (req.body.name?.en) {
      user.name.en = req.body.name?.en
    }
    if (req.body.email) {
      user.email = req.body.email
    }
    if (req.body.profileImage) {
      user.profileImage = req.body.profileImage
    }
    if (req.body.nidNo) {
      user.nidNo = req.body.nidNo
    }
    if (req.body.nidImage) {
      user.nidImage = req.body.nidImage
      user.nidStatus = 'pending'
      user.nidVerified = false
    }
    if (req.body.phone) {
      user.phone = req.body.phone
      user.phoneVerified = false
    }
    if (req.body.presentAddress?.bn) {
      user.presentAddress.bn = req.body.presentAddress?.bn
    }
    if (req.body.presentAddress?.en) {
      user.presentAddress.en = req.body.presentAddress?.en
    }
    if (req.body.permanentAddress?.bn) {
      user.permanentAddress.bn = req.body.permanentAddress?.bn
    }
    if (req.body.permanentAddress?.en) {
      user.permanentAddress.en = req.body.permanentAddress?.en
    }
    if (req.body.password) {
      user.password = req.body.password
    }
    if (req.body.hasOwnProperty("isAvailable")) {
      user.isAvailable = req.body.isAvailable
    }
    const updatedUser = await user.save()

    if (req.body.phone) {
      const serviceProvider = await ServiceProvider.findOne({ user: req.user._id })
      if (serviceProvider) {
        serviceProvider.phoneNumber1 = req.body.phone
        await serviceProvider.save()
      }
    }
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      phone: updatedUser.phone,
      nidNo: updatedUser.nidNo,
      nidImage: updatedUser.nidImage,
      presentAddress: updatedUser.presentAddress,
      permanentAddress: updatedUser.permanentAddress,
      permission: updatedUser.permission,
      registrationNo: updatedUser.registrationNo,
      isActive: updatedUser.isActive,
      isAvailable: updatedUser.isAvailable,
      reference: updatedUser.reference,
      token: generateToken(updatedUser._id),
    })
  } else {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getNidPendingUsers,
  approveOrRejectNid,
  deleteUser,
  getUserById,
  deleteRequest,
  updateUser
}