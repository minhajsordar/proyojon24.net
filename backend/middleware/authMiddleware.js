import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


const protect = expressAsyncHandler(async (req, res, next) => {
  if (req.body.dataCollectorId) {
    req.dataCollector = await User.findById(req.body.dataCollectorId)
  }
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id).select('-password')
        next()
      } else {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    } catch (error) {
      // console.log(req.user)
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})
// division
// district
// subDistrict
// union
// ward
const higherLavelPermission = (req, res, next) => {
  if (req.user && req.user.permission === "superAdmin") {
    next()
    return
  }
  else if (req.user && req.user.permission === "admin") {
    next()
    return
  }
  else if (req.user && req.dataCollector.permission == "district" && (
    ["superAdmin", "division"].includes(req.user.permission)
  )) {
    next()
    return
  }
  else if (req.user && req.dataCollector.permission == "subDistrict" && (
    ["superAdmin", "division", "district"].includes(req.user.permission)
  )) {
    next()
    return
  }
  else if (req.user && req.dataCollector.permission == "union" && (
    ["superAdmin", "division", "district", "subDistrict"].includes(req.user.permission)
  )) {
    next()
    return
  }
  else if (req.user && req.dataCollector.permission == "self" && (
    ["superAdmin", "division", "district", "subDistrict", "union"].includes(req.user.permission)
  )) {
    next()
    return
  }
  else {
    res.status(401)
    throw new Error('Need Higher Lavel Permission.')
  }
}
const admin = (req, res, next) => {
  if (req.user && req.user.permission === 'admin') {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}
const anyAdmin = (req, res, next) => {
  if (req.user && (
    req.user.permission === 'superAdmin' ||
    req.user.permission === 'admin'
  )) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as any admin')
  }
}
const specialPermission = (req, res, next) => {
  if (req.user && (
    ["superAdmin", "admin", "division", "district", "subDistrict", "union"].includes(req.user.permission)
  )) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as any admin')
  }
}
const superAdmin = (req, res, next) => {
  if (req.user && req.user.permission === 'superAdmin') {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an super admin')
  }
}
export {
  protect,
  higherLavelPermission,
  specialPermission,
  admin,
  anyAdmin,
  superAdmin
}