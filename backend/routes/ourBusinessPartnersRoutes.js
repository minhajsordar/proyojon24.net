import express from "express";
import {    getOurBusinessPartners,
    getOurBusinessPartnerById,
    deleteOurBusinessPartner,
    updateOurBusinessPartner,
    createOurBusinessPartner,
} from '../controllers/ourBusinessPartnersController.js'
    import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getOurBusinessPartners).post(protect, superAdmin, createOurBusinessPartner)
router.route('/:id')
    .get(getOurBusinessPartnerById)
    .delete(protect, superAdmin, deleteOurBusinessPartner)
    .put(protect, superAdmin, updateOurBusinessPartner)



export default router