import express from "express"
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile } from "../controllers/userController.js"
import {
    getServiceProviders,
    getServiceProviderId,
    deleteServiceProvider,
    createServiceProviderReview,
    createServiceProviderViewCount,
    updateServiceProvider,
    getTopServiceProvider,
    createServiceProvider
} from "../controllers/userController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/').get(protect, admin, getServiceProviders).post(protect,admin,createServiceProvider)
router.route('/service_provider_review').put(protect, admin, createServiceProviderReview)
router.route('/service_provider_view').put(protect, admin, createServiceProviderViewCount)
router.route('/top_service_provider').get(protect, admin, getTopServiceProvider)
router.route('/:id')
    .delete(protect, admin, deleteServiceProvider)
    .get(protect, admin, getServiceProviderId)
    .put(protect, admin, updateServiceProvider)

export default router