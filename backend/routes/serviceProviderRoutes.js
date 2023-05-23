import express from "express"
import {
    getServiceProviders,
    getServiceProviderById,
    getServiceProviderByIdPreview,
    deleteServiceProvider,
    createServiceProviderReview,
    createServiceProviderViewCount,
    updateServiceProvider,
    getTopServiceProvider,
    getServiceProviderByServiceCategory,
    createServiceProvider
} from "../controllers/serviceProviderController.js"
import { admin, anyAdmin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/').get(protect, admin, getServiceProviders).post(protect,admin,createServiceProvider)
router.route('/service_provider_review').put(protect, admin, createServiceProviderReview)
router.route('/service_provider_view').put(protect, admin, createServiceProviderViewCount)
router.route('/top_service_provider').get(protect, admin, getTopServiceProvider)
router.route('/:id')
    .delete(protect, admin, deleteServiceProvider)
    .get(protect, admin, getServiceProviderById)
    .put(protect, admin, updateServiceProvider)
router.route('/preview/:id')
    .get(protect, admin, getServiceProviderByIdPreview)
router.route('/service_category/:id')
    .get(protect, anyAdmin, getServiceProviderByServiceCategory)

export default router