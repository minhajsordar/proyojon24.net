import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


const protect = expressAsyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
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
const higherLavelPermission = async (req, res, next) => {
  if (req.user) {
    const dataCollector = await User.findById(req.body.dataCollectorId)
    if (req.user.isSuperAdmin) {
      next()
    }
    else if (dataCollector.permission == "district" && (
      req.user.isSuperAdmin ||
      ["division"].includes(req.user.permission)
    )) {
      next()
    }
    else if (dataCollector.permission == "subDistrict" && (
      req.user.isSuperAdmin ||
      ["division", "district"].includes(req.user.permission)
    )) {
      next()
    }
    else if (dataCollector.permission == "union" && (
      req.user.isSuperAdmin ||
      ["division", "district", "subDistrict"].includes(req.user.permission)
    )) {
      next()
    }
    else if (dataCollector.isWardAdmin && (
      req.user.isSuperAdmin ||
      ["division", "district", "subDistrict", "union"].includes(req.user.permission)
    )) {
      next()
    } else {
      res.status(401)
      throw new Error('Permission not granted')
    }
  }
  else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}
const anyAdmin = (req, res, next) => {
  if (req.user && (
    req.user.isSuperAdmin ||
    req.user.isAdmin || 
    ["division", "district", "subDistrict", "union", "ward"].includes(req.user.permission)
  )) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}
const superAdmin = (req, res, next) => {
  if (req.user && req.user.isSuperAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an super admin')
  }
}
export {
  protect,
  higherLavelPermission,
  admin,
  anyAdmin,
  superAdmin
}