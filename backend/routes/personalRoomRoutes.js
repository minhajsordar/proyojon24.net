import express from "express";
import {    getPersonalRooms,
createPersonalRoom } from '../controllers/personalRoomController.js'
import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/').get(protect, getPersonalRooms)
                 .post(protect, createPersonalRoom)


export default router