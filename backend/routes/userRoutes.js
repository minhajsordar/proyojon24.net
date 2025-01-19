import express from "express"
import { authUser, deleteUser, getUserById, getUserProfile, getNidPendingUsers, approveOrRejectNid, getUsers, registerUser,resetPassword, updateUser, updateUserProfile, deleteRequest } from "../controllers/userController.js"
import { superAdmin, protect, anyAdmin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/').get(protect, getUsers)
router.route('/register').post(registerUser)
router.route('/reset_password').post(resetPassword)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/pending_verification').get(protect, anyAdmin, getNidPendingUsers)
router.route('/pending_verification/:id').put(protect, anyAdmin, approveOrRejectNid)
router.route('/:id')
    .delete(protect, superAdmin, deleteUser)
    .get(protect, superAdmin, getUserById)
    .put(protect, updateUser)
    .patch(protect, superAdmin, updateUserProfile)
router.route('/delete_request/:id').post(protect, deleteRequest)

export default router