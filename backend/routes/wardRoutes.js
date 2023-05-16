import express from "express";
import {    getUnions,
    getUnionById,
    deleteUnion,
    updateUnion,
    createUnion} from '../controllers/unionController.js'
    import { admin, protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getUnions).post(protect, admin, createUnion)
router.route('/:id')
    .get(getUnionById)
    .delete(protect,admin, deleteUnion)
    .put(protect, admin, updateUnion)



export default router