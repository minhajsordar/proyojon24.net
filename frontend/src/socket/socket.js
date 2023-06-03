import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:5002";

export const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
  console.log("socket connected")
});

socket.on("disconnect", () => {
  state.connected = false;
  console.log("socket disconnected")
});

socket.on("foo", (...args) => {
  state.fooEvents.push(args);
  console.log(args)
});

socket.on("bar", (...args) => {
  state.barEvents.push(args);
});
