import express from "express";
import {    getCommonNotifications,
    getAllCommonNotifications,
    getCommonNotificationById,
    deleteCommonNotification,
    updateCommonNotification,
    createCommonNotification} from '../controllers/commonNotificationController.js'
    import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getCommonNotifications).post(protect, superAdmin, createCommonNotification)
router.route('/all')
    .get(getAllCommonNotifications)
router.route('/:id')
    .get(getCommonNotificationById)
    .delete(protect, superAdmin, deleteCommonNotification)
    .put(protect, superAdmin, updateCommonNotification)



export default router