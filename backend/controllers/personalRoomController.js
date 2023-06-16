import expressAsyncHandler from "express-async-handler";
import PersonalRoom from '../models/personalRoomModel.js'

// @desc get rooms
// @route Put api/room
// @acess Privet
const getPersonalRooms = expressAsyncHandler(async (req, res) => {
    // const pageSize = Number(req.query.pageSize) || 30;
    // const page = Number(req.query.pageNumber) || 1;
    const keyword = req.user._id ? {
        "participants.user": req.user._id,
    } : {}
    // const count = await PersonalRoom.countDocuments({ ...keyword })
    const rooms = await PersonalRoom.find({ ...keyword }).populate('participants.user', 'name profileImage').populate('messages', 'content seen').sort({ updatedAt: -1 })
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ rooms })
})

// @desc create a room
// @route create api/room
// @acess Privet/Admin
const createPersonalRoom = expressAsyncHandler(async (req, res) => {
    if (req.body.recipient) {
        const personalRooms = new PersonalRoom({
            participants: [{ user: req.user._id }, { user: req.body.recipient }]
        })
        const createdPersonalRoom = await personalRooms.save()
        res.status(201).json(createdPersonalRoom)
    } else {
        res.status(404)
        throw new Error('Recipient not provided.')
    }
})

export {
    getPersonalRooms,
    createPersonalRoom,
}