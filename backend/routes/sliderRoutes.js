import express from "express";
import {    getSlider,
    getSliderById,
    updateSlider,
    createSlider} from '../controllers/sliderController.js'
    import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getSlider).post(protect, superAdmin, createSlider)

router.route('/:id')
    .get(getSliderById)
    .put(protect, superAdmin, updateSlider)



export default router