import express from "express";
import {    getDivisions,
    getAllDivisions,
    getDivisionById,
    deleteDivision,
    updateDivision,
    createDivision} from '../controllers/divisionController.js'
    import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getDivisions).post(protect, superAdmin, createDivision)
router.route('/all')
    .get(getAllDivisions)
router.route('/:id')
    .get(getDivisionById)
    .delete(protect,superAdmin, deleteDivision)
    .put(protect, superAdmin, updateDivision)



export default router