import express from "express";
import {
    createPayment,
    approveOrRejectPayment,
    getPaymentList,
    deletePayment
} from '../controllers/paymentController.js'
import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(protect, getPaymentList).post(protect, createPayment)
router.route('/:id')
    .delete(protect, deletePayment)
    .put(protect, superAdmin, approveOrRejectPayment)



export default router