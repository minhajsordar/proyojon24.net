import { Server } from "socket.io";
import { createPersonalMessageOnReceive } from './controllers/personalMessageCreateController.js'

let io;

export default  {
  init: (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origins: [
                "*", 
                // "https://proyojon24.net", 
                // "https://156.67.217.198", 
                // "https://156.67.217.198:5002", 
                // "http://localhost:9000"
            ],
        },
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