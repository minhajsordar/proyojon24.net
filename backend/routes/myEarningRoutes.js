import express from "express";
import {
    withdrawEarning,
    getMyEarningList,
    getWithdrawalList,
    approveWithdraw,
} from '../controllers/myEarningController.js'
import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/')
    .get(protect,getMyEarningList)
router.route('/withdrawal_list')
    .get(protect,getWithdrawalList)
router.route('/withdraw')
    .post(protect,withdrawEarning)
router.route('/:id')
    .patch(protect, superAdmin, approveWithdraw)



export default router