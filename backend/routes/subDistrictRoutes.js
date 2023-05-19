import express from "express";
import {    getSubDistricts,
    getSubDistrictById,
    deleteSubDistrict,
    updateSubDistrict,
    createSubDistrict} from '../controllers/subDistrictController.js'
    import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getSubDistricts).post(protect, superAdmin, createSubDistrict)
router.route('/:id')
    .get(getSubDistrictById)
    .delete(protect,superAdmin, deleteSubDistrict)
    .put(protect, superAdmin, updateSubDistrict)



export default router