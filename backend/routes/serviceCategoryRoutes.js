import express from "express";
import {
    getServiceCategorys,
    getServiceCategoryById,
    getServiceCategoryByIdPreview,
    deleteServiceCategory,
    updateServiceCategory,
    createServiceCategory,
    getServiceCategoryByService,
    getAllServiceCategorys, getServiceCategoryByServiceByCategory
} from '../controllers/serviceCategoryController.js'
import {  protect, superAdmin, anyAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getServiceCategorys).post(protect, superAdmin, createServiceCategory)
router.route('/all')
    .get(getAllServiceCategorys)
router.route('/:id')
    .get(getServiceCategoryById)
    .delete(protect, superAdmin, deleteServiceCategory)
    .put(protect, superAdmin, updateServiceCategory)
router.route('/preview/:id')
    .get(protect, anyAdmin,getServiceCategoryByIdPreview)
router.route('/service/:id')
    .get(protect, anyAdmin, getServiceCategoryByService)
router.route('/service_category_by_service_category/:id')
    .get(getServiceCategoryByServiceByCategory)



export default router