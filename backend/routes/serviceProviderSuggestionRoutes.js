import express from "express";
import { 
    getAllSuggestions,
    createSuggestion,
    deleteSuggestion
} from '../controllers/serviceProviderSuggestionController.js'
    import { protect, superAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').post(protect, superAdmin, createSuggestion)
router.route('/all')
    .get(getAllSuggestions)
router.route('/:id')
    .delete(protect, superAdmin, deleteSuggestion)



export default router