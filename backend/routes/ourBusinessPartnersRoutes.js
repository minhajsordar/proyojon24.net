import express from "express";
import {    getOurBusinessPartners,
    getOurBusinessPartnerById,
    deleteOurBusinessPartner,
    updateOurBusinessPartner,
    createOurBusinessPartner,
    updateOurBusinessPartnerSectionTitle
} from '../controllers/ourBusinessPartnersController.js'
    import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(getOurBusinessPartners).post(protect, superAdmin, createOurBusinessPartner)
router.route('/:id')
    .get(getOurBusinessPartnerById)
    .delete(protect, superAdmin, deleteOurBusinessPartner)
    .put(protect, superAdmin, updateOurBusinessPartner)
router.route('/our_business_partner_title')
    .post(updateOurBusinessPartnerSectionTitle)



export default router