import express from "express";
import {
    createMonthlyFee,
    getMonthlyFeeList,
    updateMonthlyFee,
    deleteMonthlyFee,
} from '../controllers/monthlyFeeController.js'
import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getMonthlyFeeList).post(protect,superAdmin, createMonthlyFee)
router.route('/:id')
    .delete(protect,superAdmin, deleteMonthlyFee)
    .put(protect,superAdmin, superAdmin, updateMonthlyFee)



export default router