import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { socket } from "src/socket/socket";
import { Notify, date } from 'quasar';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useMessageStore = defineStore('message store', () => {
  const router = useRouter(),
    selectedRoom = ref(null),
    selectedRoomUser2 = ref(null),
    messageContent = ref(''),
    nextPageNumber = ref(null),
    messageSending = ref(false),
    messageListLoading = ref(false),
    messageList = ref(null),
    messageSent = ref(false)
  const getMessages = async () => {
    if (!selectedRoomUser2.value) {
      return
    }
    messageListLoading.value = true
    const config = {
      method: "get",
      url: "api/message",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`
      }, params: {
        user1: loginUser.value._id,
        user2: selectedRoomUser2.value.user._id
      }
    };
    try {
      const responseData = await api.request(config);
      responseData.data.messages = responseData.data.messages.sort(function (b, a) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
      messageList.value = responseData.data
      nextPageNumber.value = responseData.data.page + 1
      messageListLoading.value = false
    } catch (error) {
      console.log(error);
      messageListLoading.value = false
    }
  }
  const getPreviousMessages = async () => {
    if (!selectedRoomUser2.value?.user) {
      return
    }
    if (messageList.value?.pages < nextPageNumber.value && messageListLoading.value == false) {
      return
    }
    console.log("getting previous messages")
    messageListLoading.value = true
    const config = {
      method: "get",
      url: "api/message",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`
      }, params: {
        user1: loginUser.value._id,
        user2: selectedRoomUser2.value.user._id,
        pageNumber: nextPageNumber.value
      }
    };
    try {
      const responseData = await api.request(config);
      responseData.data.messages = responseData.data.messages.sort(function (b, a) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
      messageList.value.messages.push(...responseData.data.messages)
      messageList.value.page = responseData.data.page
      nextPageNumber.value = responseData.data.page + 1
      messageListLoading.value = false
    } catch (error) {
      console.log(error);
      messageListLoading.value = false
    }
  }
  const createMessage = async () => {
    const data = {
      room: selectedRoom.value,
      recipient: selectedRoomUser2.value.user._id,
      content: messageContent.value,
      token: loginUser.value.token
    }
    socket.emit('creating_new_message', { ...data })
    const config = {
      method: "post",
      url: "api/message",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data
    };
    messageSending.value = true
    messageSent.value = false
    try {
      const responseData = await api.request(config);
      getMessages()
      messageSending.value = true
      messageSent.value = false
      messageContent.value = ""
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
    }
  }
  return {
    selectedRoom,
    messageList,
    selectedRoomUser2,
    messageContent,
    messageSending,
    messageSent,
    getMessages,
    getPreviousMessages,
    nextPageNumber,
    messageListLoading,
    createMessage
  }
});
