import express from "express";
import {    getDivisions,
    getDivisionById,
    deleteDivision,
    updateDivision,
    createDivision} from '../controllers/divisionController.js'
    import { admin, protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getDivisions).post(protect, admin, createDivision)
router.route('/:id')
    .get(getDivisionById)
    .delete(protect,admin, deleteDivision)
    .put(protect, admin, updateDivision)



export default router