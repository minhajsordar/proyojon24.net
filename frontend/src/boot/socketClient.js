import { boot } from 'quasar/wrappers'
import { io } from "socket.io-client";
export default boot(({ app }) => {

  const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:5002";

  const socket = io(URL);

  app.use(io)
  app.use(socket)
})
