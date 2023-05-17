import express from "express";
import {    getWards,
    getWardById,
    deleteWard,
    updateWard,
    createWard} from '../controllers/wardController.js'
    import { admin, protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getWards).post(protect, admin, createWard)
router.route('/:id')
    .get(getWardById)
    .delete(protect,admin, deleteWard)
    .put(protect, admin, updateWard)



export default router