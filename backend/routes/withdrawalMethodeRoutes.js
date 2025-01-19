import express from "express";
import {  createWithdrawalMethode, 
    deleteWithdrawalMethode, 
    requestDeleteWithdrawalMethode, 
    getWithdrawalMethodeList  } from "../controllers/withdrawalMethodeController.js";
import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/')
    .get(protect, getWithdrawalMethodeList)
    .post(protect, createWithdrawalMethode)
router.route('/:id')
    .delete(protect, superAdmin, deleteWithdrawalMethode)
    .patch(protect, requestDeleteWithdrawalMethode)



export default router