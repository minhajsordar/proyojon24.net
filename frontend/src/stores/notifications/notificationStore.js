import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { encode64 } from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { Notify,date } from 'quasar';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useNotificationStore = defineStore('notification store', () => {
  const router = useRouter(),
    notificationList = ref(null),
    publishedNotification = ref(null),
    last7DaysNotification = ref(null),
    openCreateNotificationDialog = ref(false),
    openEditNotificationDialog = ref(false),
    notificationInfo = reactive({
      id: null,
      title: null,
      description: null,
      published: false,
      link: null,
    })
  const openCreateNotificationManager =()=>{
    notificationInfo.id = null
    notificationInfo.title = null
    notificationInfo.description = null
    notificationInfo.published = false
    notificationInfo.link = null

    openCreateNotificationDialog.value =true
  }
  const openEditNotificationManager =(data)=>{
    notificationInfo.id = data._id
    notificationInfo.title = data.title
    notificationInfo.description = data.description
    notificationInfo.published = data.published
    notificationInfo.link = data.link

    openEditNotificationDialog.value =true
  }
  const getNotificationList = async () => {
    const config = {
      method: "get",
      url: "api/common_notifications",
      headers: {
        "Content-Type": "application/json",
      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      notificationList.value = responseData.data;
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "positive",
        message: "you have "+ responseData.data.length +" unread notifications",
      });
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const getPublishedNotification = async () => {
    const config = {
      method: "get",
      url: "api/common_notifications",
      headers: {
        "Content-Type": "application/json",
      },
      params:{
        published: true
      }
    };
    try {
      const responseData = await api.request(config);
      publishedNotification.value = responseData.data;
      last7DaysNotification.value = responseData.data.notifications.filter(e=>{
        return date.getDateDiff(new Date(), e.updatedAt, "days") <= 6
      })
      publishedNotification.value = responseData.data.notifications.filter(e=>{
        return date.getDateDiff(new Date(), e.updatedAt, "days") >= 7
      })
    } catch (error) {
      console.log(error);
    }
  }
  const createNotification = async () => {
    const data = notificationInfo
    const config = {
      method: "post",
      url: "api/common_notifications",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getNotificationList()
      openCreateNotificationDialog.value = false
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "positive",
        message: "Notification Created Successfully.",
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
      loader.hideLoader()
    }
  }
  const updateNotification = async () => {
    const data = notificationInfo
    const config = {
      method: "put",
      url: "api/common_notifications/" + notificationInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      },data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getNotificationList()
      openEditNotificationDialog.value = false
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
      loader.hideLoader()
    }
  }
  const deleteNotification = async () => {
    const config = {
      method: "delete",
      url: "api/common_notifications/" + notificationInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getNotificationList()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
      loader.hideLoader()
    }
  }
  return {
    openCreateNotificationDialog,
    openCreateNotificationManager,
    openEditNotificationDialog,
    openEditNotificationManager,
    notificationInfo,
    notificationList,
    getPublishedNotification,
    last7DaysNotification,
    publishedNotification,
    getNotificationList,
    createNotification,
    updateNotification,
    deleteNotification
  }
});
