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
    createServiceProvider,
    getAllServiceProviders
} from "../controllers/serviceProviderController.js"
import { admin, anyAdmin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/').get(protect, anyAdmin, getServiceProviders).post(protect,anyAdmin,createServiceProvider)
router.route('/service_provider_review').put(protect, createServiceProviderReview)
router.route('/service_provider_view').put( createServiceProviderViewCount)
router.route('/top_service_provider').get( getTopServiceProvider)
router.route('/all')
    .get(getAllServiceProviders)
router.route('/:id')
    .delete(protect, admin, deleteServiceProvider)
    .get(getServiceProviderById)
    .put(protect, admin, updateServiceProvider)
router.route('/preview/:id')
    .get(protect, anyAdmin, getServiceProviderByIdPreview)
router.route('/service_category/:id')
    .get(protect, anyAdmin, getServiceProviderByServiceCategory)

export default router