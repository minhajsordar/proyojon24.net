import expressAsyncHandler from "express-async-handler";
import PersonalMessage from '../models/personalMessageModel.js'
import PersonalRoom from '../models/personalRoomModel.js'

// @desc get messages
// @route Put api/message
// @acess Privet
const getPersonalMessages = expressAsyncHandler(async (req, res) => {
    if (req.query.user1 && req.query.user2) {
        const pageSize = Number(req.query.pageSize) || 10;
        const page = Number(req.query.pageNumber) || 1;
        const keyword = req.query.user1 && req.query.user2 ? {
            $or: [
                { sender: req.query.user1, recipient: req.query.user2 },
                { sender: req.query.user2, recipient: req.query.user1 },
            ],
        } : {}


        const count = await PersonalMessage.countDocuments({ ...keyword })
        const messages = await PersonalMessage.find({
            $or: [
                { sender: req.query.user1, recipient: req.query.user2 },
                { sender: req.query.user2, recipient: req.query.user1 },
            ],
        })
            .sort({ updatedAt: -1 })
            .populate('sender', 'name profileImage')
            .populate('recipient', 'name profileImage')
            .limit(pageSize).skip(pageSize * (page - 1))
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(200).json({ messages, page, pages: Math.ceil(count / pageSize) })
    } else {
        res.status(404)
        throw new Error('Messages not found, Please Provide user\'s id')
    }
})


// @desc create a message
// @route create api/message/
// @acess Privet socket.to("room1").emit(/* ... */)
const createPersonalMessage = expressAsyncHandler(async (req, res) => {
    if (req.body.room) {
        const personalRoom = await PersonalRoom.findById(req.body.room)       // find room by id
        const personalMessages = new PersonalMessage({                  // assign new message data
            sender: req.user._id,
            recipient: req.body.recipient,
            content: req.body.content,
            seen: false,
        })
        const createdPersonalMessage = await personalMessages.save()
        personalRoom.messages = createdPersonalMessage._id              // assign last message id to personal room.
        await personalRoom.save()                                       // finally save last message id to personal room.
        req.io.to(req.body.room).emit('new_message', {...createdPersonalMessage })
        console.log(req.body.room)
        res.status(201).json(createdPersonalMessage)
    } else {
        res.status(404)
        throw new Error('Room not provided.')
    }
})


export {
    getPersonalMessages,
    createPersonalMessage,
}
