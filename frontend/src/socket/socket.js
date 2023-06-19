import { reactive } from "vue";
import { io } from "socket.io-client";
import { useLocalStorage } from "@vueuse/core";
export const state = reactive({
  connected: false,
  fooEvents: [],
  pushNotifications: [],
  barEvents: []
});
const languageStore = useLocalStorage('proyojon24language', {})
// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "156.67.217.198:5002";

export const socket = io(URL, {
  transports: ['websocket', 'polling', 'flushsocket']
});

socket.on("connect", () => {
  state.connected = true;
  console.log("socket connected")
});

socket.on("disconnect", () => {
  state.connected = false;
  console.log("socket disconnected")
});

// socket.on("new_message", (...args) => {
//   console.log("new message",args)
// });
var audio = new Audio("/sounds/new_messenge_ton.mp3"); // path to file
socket.on("push_new_notification", (...args) => {
  audio.play();
  state.pushNotifications.push(args);
  args.forEach(arg => {
    console.log(arg)
    Notification.requestPermission().then(perm => {
      if (perm == 'granted') {
        new Notification(arg._doc.title, {
          body: arg._doc.description,
        })
      } else {
        alert("Some notification is waiting. You need to enable notification to track notifications.")
      }
    })
  })
});
          // icon:'https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-facebook-social-media-icon-png-image_6315968.png',
