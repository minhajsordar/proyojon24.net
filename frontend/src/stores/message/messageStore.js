import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { socket } from "src/socket/socket";
import { Notify, date } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
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
    CustomLoading('get-message').showLoading()
    try {
      const responseData = await api.request(config);
      responseData.data.messages = responseData.data.messages.sort(function (b, a) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
      messageList.value = responseData.data
      nextPageNumber.value = responseData.data.page + 1
      messageListLoading.value = false
      CustomLoading('get-message').hideLoading()
    } catch (error) {
      console.log(error);
      messageListLoading.value = false
      CustomLoading('get-message').hideLoading()
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
        user2: selectedRoomUser2.value?.user?._id,
        pageNumber: nextPageNumber.value
      }
    };
    CustomLoading('get-message-s').showLoading()
    try {
      const responseData = await api.request(config);
      responseData.data.messages = responseData.data.messages.sort(function (b, a) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
      messageList.value.messages.push(...responseData.data.messages)
      messageList.value.page = responseData.data.page
      nextPageNumber.value = responseData.data.page + 1
      messageListLoading.value = false
      CustomLoading('get-message-s').hideLoading()
    } catch (error) {
      console.log(error);
      messageListLoading.value = false
      CustomLoading('get-message-s').hideLoading()
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
    CustomLoading('post-message').showLoading()
    try {
      const responseData = await api.request(config);
      getMessages()
      messageSending.value = true
      messageSent.value = false
      messageContent.value = ""
      CustomLoading('post-message').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('post-message').hideLoading()
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
