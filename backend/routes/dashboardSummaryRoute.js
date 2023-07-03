import express from "express";
import { getDataAnalysis, userDashboardData } from '../controllers/dashboardSummary.js'
const router = express.Router()

router.route('/public_dashboard').get(userDashboardData)
router.route('/data_analysis').get(getDataAnalysis)

export default router