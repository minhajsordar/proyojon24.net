import expressAsyncHandler from "express-async-handler";
import PersonalMessage from '../models/personalMessageModel.js'
import PersonalRoom from '../models/personalRoomModel.js'
// import socket from "../socket.js";
// const io = socket.get()
// @desc create a message
// @route create api/message/
// @acess Privet socket.to("room1").emit(/* ... */)
const createPersonalMessageOnReceive = (io) => {
    io.on('creating_new_message', async(args) => {
        console.log(args)
        // socket.to(args.room).emit('receiving_new_message','ping-new-message')
        // if (req.body.room) {
        //     const personalRoom = await PersonalRoom.findById(req.body.room)       // find room by id
        //     const personalMessages = new PersonalMessage({                  // assign new message data
        //         sender: req.user._id,
        //         recipient: req.body.recipient,
        //         content: req.body.content,
        //         seen: false,
        //     })
        //     const createdPersonalMessage = await personalMessages.save()
        //     personalRoom.messages = createdPersonalMessage._id              // assign last message id to personal room.
        //     await personalRoom.save()                                       // finally save last message id to personal room.
        //     io.to(req.body.room).emit('new_message', { ...createdPersonalMessage })
        //     res.status(201).json(createdPersonalMessage)
        // } else {
        //     res.status(404)
        //     throw new Error('Room not provided.')
        // }
    })
}



export {
    createPersonalMessageOnReceive,
}
