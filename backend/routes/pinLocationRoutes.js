import express from "express";
import {    getPinLocations,
    getAllPinLocations,
    getPinLocationById,
    deletePinLocation,
    updatePinLocation,
    createPinLocation} from '../controllers/pinLocationController.js'
    import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getPinLocations).post(protect, superAdmin, createPinLocation)
router.route('/all')
    .get(getAllPinLocations)
router.route('/:id')
    .get(getPinLocationById)
    .delete(protect, superAdmin, deletePinLocation)
    .put(protect, superAdmin, updatePinLocation)



export default router