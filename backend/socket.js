import socket from "socket.io";
import { createPersonalMessageOnReceive } from './controllers/personalMessageCreateController.js'

let io;

export default  {
  init: (httpServer) => {
    io = socket(httpServer, {
      cors: {
        origin: '*',
      }
    });
    io.on("creating_new_message", (arg) => {
        console.log("creating new message", arg);
        
    })
    io.on("connection", (socket) => {
        socket.on('joinRoom', (arg) => {
            // const user = userJoin(socket.id, room)
            if (arg?._id) {
                socket.join(arg._id)
            }
        })
        // socket.on('creating_new_message', (arg) => {
        //     // const user = userJoin(socket.id, room)
        //     console.log(arg.toString)
        //     // socket.to(arg.room).emit('receiving_new_message','ping-new-message')
        // })
        
    });
    return io;
  },
  get: () => {
    if (!io) {
      throw new Error("socket is not initialized");
    }
    return io;
  }
};

// io.on("creating_new_message", (arg) => {
//     console.log("creating new message", arg);
// })