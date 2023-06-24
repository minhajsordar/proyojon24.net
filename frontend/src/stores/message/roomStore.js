import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { Notify, date } from 'quasar';
import { socket } from 'src/socket/socket';
import { useAuthStore } from '../auth/authStore';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
export const myRooms = useLocalStorage('myrooms', {})
loader.title = 'Requesting To Server...'
export const useRoomsStore = defineStore('rooms store', () => {
  const router = useRouter()
  const authStore = useAuthStore()
  const myRoomList = ref()
  const getMyRooms = async () => {
    if (!authStore.loginUserInfo) {
      return
    }
    const config = {
      method: "get",
      url: "api/room",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }
    }
    try {
      const responseData = await api.request(config);
      myRooms.value = responseData.data;
      myRoomList.value = responseData.data;
      responseData.data.rooms.forEach(room => {
        socket.emit("joinRoom", room)
      })

    } catch (error) {
      console.log(error);
    }
  }
  const createRoom = async (id) => {
    const data = {
      recipient: id
    }
    const config = {
      method: "post",
      url: "api/room",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      router.push('direct_message/' + responseData.data._id)
      getMyRooms()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
    }
  }
  return {
    myRoomList,
    getMyRooms,
    createRoom
  }
});
