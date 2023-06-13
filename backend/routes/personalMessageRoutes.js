import express from "express";
import {    getPersonalMessages,
createPersonalMessage } from '../controllers/personalMessageController.js'
import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(protect, getPersonalMessages)
                 .post(protect, createPersonalMessage)


export default router