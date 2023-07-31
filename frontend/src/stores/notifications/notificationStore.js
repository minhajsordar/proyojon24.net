import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { encode64 } from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { Notify,date } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
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
    CustomLoading('get-common-notifications').showLoading()
    try {
      const responseData = await api.request(config);
      notificationList.value = responseData.data;
      CustomLoading('get-common-notifications').hideLoading()
      Notify.create({
        position: "center",
        type: "positive",
        message: "you have "+ responseData.data.length +" unread notifications",
      });
    } catch (error) {
      console.log(error);
      CustomLoading('get-common-notifications').hideLoading()
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
    CustomLoading('get-common-notifications-p').showLoading()
    try {
      const responseData = await api.request(config);
      publishedNotification.value = responseData.data;
      last7DaysNotification.value = responseData.data.notifications.filter(e=>{
        return date.getDateDiff(new Date(), e.updatedAt, "days") <= 6
      })
      publishedNotification.value = responseData.data.notifications.filter(e=>{
        return date.getDateDiff(new Date(), e.updatedAt, "days") >= 7
      })
      CustomLoading('get-common-notifications-p').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-common-notifications-p').hideLoading()
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
    CustomLoading('post-common-notifications').showLoading()
    try {
      const responseData = await api.request(config);
      getNotificationList()
      openCreateNotificationDialog.value = false
      CustomLoading('post-common-notifications').hideLoading()
      Notify.create({
        position: "center",
        type: "positive",
        message: "Notification Created Successfully.",
      });
    } catch (error) {
      console.log(error);
      CustomLoading('post-common-notifications').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
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
    CustomLoading('put-common-notifications').showLoading()
    try {
      const responseData = await api.request(config);
      getNotificationList()
      openEditNotificationDialog.value = false
      CustomLoading('put-common-notifications').hideLoading()
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
      CustomLoading('put-common-notifications').hideLoading()
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
    CustomLoading('delete-common-notifications').showLoading()
    try {
      const responseData = await api.request(config);
      getNotificationList()
      CustomLoading('delete-common-notifications').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('delete-common-notifications').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
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
