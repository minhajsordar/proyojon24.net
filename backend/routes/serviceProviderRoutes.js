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
    getAllServiceProviders,
    suggestServiceProvider,
    getServiceProviderPendingList,
    rankAndApprovalServiceProvider,
    getSuggestedServiceProvider,
    getTopSuggestedServiceProvider,
    getUserServiceProvider
} from "../controllers/serviceProviderController.js"
import { admin, anyAdmin, higherLavelPermission, protect, specialPermission, superAdmin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/').get(protect, anyAdmin, getServiceProviders).post(protect, createServiceProvider)
router.route('/service_provider_review').put(protect, createServiceProviderReview)
router.route('/top_service_provider').get(getTopServiceProvider)
router.route('/pending_list').get(protect, specialPermission,getServiceProviderPendingList)
router.route('/suggested_service_provider').get(getSuggestedServiceProvider)
router.route('/top_suggested_service_provider').get(getTopSuggestedServiceProvider)
router.route('/user_service_provider').get(protect,getUserServiceProvider)
router.route('/all')
.get(getAllServiceProviders)
router.route('/:id')
.delete(protect, admin, deleteServiceProvider)
.get(getServiceProviderById)
.put(protect, admin, updateServiceProvider)
.patch(protect, higherLavelPermission, rankAndApprovalServiceProvider)
router.route('/service_provider_view/:id').put(createServiceProviderViewCount)
router.route('/preview/:id')
    .get(protect, anyAdmin, getServiceProviderByIdPreview)
router.route('/suggest/:id')
    .put(protect, superAdmin, suggestServiceProvider)
router.route('/service_category/:id')
    .get(protect, anyAdmin, getServiceProviderByServiceCategory)

export default router