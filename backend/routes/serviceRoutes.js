import express from "express";
import {
    getServices,
    getServiceId,
    getServiceIdPreview,
    deleteService,
    updateService,
    createService
} from '../controllers/serviceController.js'
import {  protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getServices).post(protect, superAdmin, createService)
router.route('/:id')
    .get(getServiceId)
    .delete(protect, superAdmin, deleteService)
    .put(protect, superAdmin, updateService)
router.route('/preview/:id')
    .get(getServiceIdPreview)



export default router