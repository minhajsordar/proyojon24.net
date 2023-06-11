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
socket.on("push_new_notification", (...args) => {
  state.pushNotifications.push(args);
  args.forEach(arg => {
    console.log(arg)
    Notification.requestPermission().then(perm => {
      if (perm == 'granted') {
        new Notification(arg._doc.title[languageStore.value], {
          body: arg._doc.description[languageStore.value],
        })
      } else {
        alert("Some notification is waiting. You need to enable notification to track notifications.")
      }
    })
  })
});
          // icon:'https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-facebook-social-media-icon-png-image_6315968.png',
