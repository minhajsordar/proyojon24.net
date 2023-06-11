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
    notificationInfo = reactive({
      id: null,
      title: {
        bn: null,
        en: null,
      },
      description: {
        bn: null,
        en: null,
      },
      published: false,
      link: null,
    })
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
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      publishedNotification.value = responseData.data;
      last7DaysNotification.value = responseData.data.notifications.filter(e=>{
        return date.getDateDiff(new Date(), e.updatedAt, "days") <= 6
      })
      publishedNotification.value = responseData.data.notifications.filter(e=>{
        return date.getDateDiff(new Date(), e.updatedAt, "days") >= 7
      })
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
  const updateNotification = async () => {
    const data = {}
    const config = {
      method: "post",
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
