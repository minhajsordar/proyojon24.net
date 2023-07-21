import express from "express";
import { getDataAnalysis, userDashboardData,getDailyUser,
    getMonthlyUser,
    getMonthlyUserProfileView,pendingForApprovalList, } from '../controllers/dashboardSummary.js'
const router = express.Router()

router.route('/public_dashboard').get(userDashboardData)
router.route('/data_analysis').get(getDataAnalysis)
router.route('/new_daily_user_count_analysis').get(getDailyUser)
router.route('/new_monthly_user_count_analysis').get(getMonthlyUser)
router.route('/profile_view_monthly_count_analysis').get(getMonthlyUserProfileView)
router.route('/pending_for_approval_list_count').get(pendingForApprovalList)

export default router