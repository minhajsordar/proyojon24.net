import express from "express";
import {
    getServiceCategorys,
    getServiceCategoryById,
    getServiceCategoryByIdPreview,
    deleteServiceCategory,
    updateServiceCategory,
    createServiceCategory
} from '../controllers/serviceCategoryController.js'
import {  protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getServiceCategorys).post(protect, superAdmin, createServiceCategory)
router.route('/:id')
    .get(getServiceCategoryById)
    .delete(protect, superAdmin, deleteServiceCategory)
    .put(protect, superAdmin, updateServiceCategory)
router.route('/preview/:id')
    .get(getServiceCategoryByIdPreview)



export default router