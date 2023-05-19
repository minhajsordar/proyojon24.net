import express from "express";
import {    getUnions,
    getUnionById,
    deleteUnion,
    updateUnion,
    createUnion} from '../controllers/unionController.js'
    import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getUnions).post(protect, superAdmin, createUnion)
router.route('/:id')
    .get(getUnionById)
    .delete(protect,superAdmin, deleteUnion)
    .put(protect, superAdmin, updateUnion)



export default router