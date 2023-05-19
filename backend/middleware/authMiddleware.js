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

const higherLavelPermission = async (req, res, next) => {
  if (req.user) {
    const collectorUser = await User.findById(req.body.collectorId)
    if (req.user.isSuperAdmin) {
      next()
    }
    else if (collectorUser.isDistrictAdmin && (
      req.user.isSuperAdmin ||
      req.user.isDivisionAdmin
      )) {
      next()
    }
    else if (collectorUser.isSubDistrictAdmin && (
      req.user.isSuperAdmin ||
      req.user.isDivisionAdmin ||
      req.user.isDistrictAdmin 
      )) {
      next()
    }
    else if (collectorUser.isUnionAdmin && (
      req.user.isSuperAdmin ||
      req.user.isDivisionAdmin ||
      req.user.isDistrictAdmin ||
      req.user.isSubDistrictAdmin 
      )) {
      next()
    }
    else if (collectorUser.isWardAdmin && (
      req.user.isSuperAdmin ||
      req.user.isDivisionAdmin ||
      req.user.isDistrictAdmin ||
      req.user.isSubDistrictAdmin ||
      req.user.isUnionAdmin 
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
    req.user.isDivisionAdmin ||
    req.user.isDistrictAdmin ||
    req.user.isSubDistrictAdmin ||
    req.user.isUnionAdmin ||
    req.user.isWardAdmin
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