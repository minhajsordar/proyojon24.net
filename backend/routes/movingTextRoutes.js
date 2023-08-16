import express from "express";
import {    getMovingText,
    getMovingTextById,
    updateMovingText,
    createMovingText,
    removeMovingText
} from '../controllers/movingTextController.js'
    import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getMovingText).post(protect, superAdmin, createMovingText)

router.route('/remove').get(removeMovingText)
router.route('/:id')
    .get(getMovingTextById)
    .put(protect, superAdmin, updateMovingText)

export default router