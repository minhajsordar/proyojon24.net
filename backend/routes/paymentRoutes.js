import express from "express";
import {
    createPayment,
    approveOrRejectPayment,
    getPaymentList,
    deletePayment,
    createRegistrationFee,
    getRegistrationPaymentByUser,
    getPendingPaymentList
} from '../controllers/paymentController.js'
import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(protect, getPaymentList).post(protect, createPayment)
router.route('/:id')
    .delete(protect, deletePayment)
    .put(protect, superAdmin, approveOrRejectPayment)
router.route('/registration_fee').get(protect, getRegistrationPaymentByUser).post(protect, createRegistrationFee)
router.route('/pending').get(protect, getPendingPaymentList)



export default router