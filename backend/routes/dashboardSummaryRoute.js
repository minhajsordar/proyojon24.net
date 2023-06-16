import express from "express";
import { userDashboardData } from '../controllers/dashboardSummary.js'
const router = express.Router()

router.route('/public_dashboard').get(userDashboardData)

export default router