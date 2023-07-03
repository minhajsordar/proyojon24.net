import express from "express";
import {
    createRegistrationFee,
    getRegistrationFeeList,
    updateRegistrationFee,
    deleteRegistrationFee,
} from '../controllers/registrationFeeController.js'
import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getRegistrationFeeList).post(protect,superAdmin, createRegistrationFee)
router.route('/:id')
    .delete(protect,superAdmin, deleteRegistrationFee)
    .put(protect,superAdmin, superAdmin, updateRegistrationFee)



export default router