import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  pushNotifications: [],
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
socket.on("pushNotification", (...args) => {
  state.pushNotifications.push(args);

//   Notification.requestPermission().then(perm=>{
//     if(perm == 'granted'){
//       new Notification("Greetings",{
//           body:"Thank you for signing up here.",
//           icon:'https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-facebook-social-media-icon-png-image_6315968.png',
//       })
//     }else{
//         alert("Some notification is waiting. You need to enable notification to track notifications.")
//     }
// })
});
