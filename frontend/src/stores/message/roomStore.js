import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { Notify, date } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
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
    CustomLoading('get-room').showLoading()
    try {
      const responseData = await api.request(config);
      myRooms.value = responseData.data;
      myRoomList.value = responseData.data;
      responseData.data.rooms.forEach(room => {
        socket.emit("joinRoom", room)
      })
      CustomLoading('get-room').hideLoading()

    } catch (error) {
      console.log(error);
      CustomLoading('get-room').hideLoading()
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
    CustomLoading('post-room').showLoading()
    try {
      const responseData = await api.request(config);
      router.push('direct_message/' + responseData.data._id)
      getMyRooms()
      CustomLoading('post-room').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('post-room').hideLoading()
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
