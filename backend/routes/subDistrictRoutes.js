import express from "express";
import {    getSubDistricts,
    getSubDistrictById,
    deleteSubDistrict,
    updateSubDistrict,
    createSubDistrict} from '../controllers/subDistrictController.js'
    import { admin, protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getSubDistricts).post(protect, admin, createSubDistrict)
router.route('/:id')
    .get(getSubDistrictById)
    .delete(protect,admin, deleteSubDistrict)
    .put(protect, admin, updateSubDistrict)



export default router