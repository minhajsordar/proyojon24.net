import express from "express";
import {    getWards,
    getAllWards,
    getWardById,
    deleteWard,
    updateWard,
    createWard} from '../controllers/wardController.js'
    import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getWards).post(protect, superAdmin, createWard)
router.route('/all')
    .get(getAllWards)
router.route('/:id')
    .get(getWardById)
    .delete(protect, superAdmin, deleteWard)
    .put(protect, superAdmin, updateWard)



export default router