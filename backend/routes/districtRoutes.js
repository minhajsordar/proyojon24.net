import express from "express";
import {    getDistricts,
    getDistrictById,
    getAllDistricts,
    deleteDistrict,
    updateDistrict,
    createDistrict} from '../controllers/districtController.js'
    import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getDistricts).post(protect, superAdmin, createDistrict)
router.route('/all').get(getAllDistricts)
router.route('/:id')
    .get(getDistrictById)
    .delete(protect,superAdmin, deleteDistrict)
    .put(protect, superAdmin, updateDistrict)



export default router