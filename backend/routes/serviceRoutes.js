import express from "express";
import {
    getServices,
    getServiceById,
    getServiceByIdPreview,
    deleteService,
    updateService,
    createService
} from '../controllers/serviceController.js'
import {  anyAdmin, protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getServices).post(protect, superAdmin, createService)
router.route('/:id')
    .get(getServiceById)
    .delete(protect, superAdmin, deleteService)
    .put(protect, superAdmin, updateService)
router.route('/preview/:id')
    .get(protect, anyAdmin, getServiceByIdPreview)



export default router