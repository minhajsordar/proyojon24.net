import express from "express";
import {    getDistricts,
    getDistrictById,
    deleteDistrict,
    updateDistrict,
    createDistrict} from '../controllers/districtController.js'
    import { admin, protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getDistricts).post(protect, admin, createDistrict)
router.route('/:id')
    .get(getDistrictById)
    .delete(protect,admin, deleteDistrict)
    .put(protect, admin, updateDistrict)



export default router