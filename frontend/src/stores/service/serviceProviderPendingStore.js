import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useServiceProviderPendingStore = defineStore('service provider pending store', () => {
  const router = useRouter(),
    authStore = useAuthStore();
  const paginationCurrent = ref(1)
  const servicePage = ref(1)
  const serviceProviderPendingList = ref([])
  const serviceProviderPendingListLoading = ref(false)
  const getServiceProviderPendingList = async () => {
    // const params = {
    //   pageNumber: servicePage.value
    // }
    const config = {
      method: "get",
      url: "api/service_providers/pending_list",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    loader.showLoader()
    serviceProviderPendingListLoading.value = true
    try {
      const responseData = await api.request(config);
      serviceProviderPendingList.value = responseData.data;
      serviceProviderPendingListLoading.value = false
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      serviceProviderPendingListLoading.value = false
      loader.hideLoader()
    }
  }
  const approveServiceProviderProfile = async (id,dataCollector) => {
    const config = {
      method: "patch",
      url: "api/service_providers/"+id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      },data:{
        approved: true,
        dataCollectorId: dataCollector
      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getServiceProviderPendingList()
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
  const rejectServiceProviderProfile = async (id,dataCollector, note) => {
    const config = {
      method: "patch",
      url: "api/service_providers/"+id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      },data:{
        rejected: true,
        rejectNote: note,
        dataCollectorId: dataCollector
      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getServiceProviderPendingList()
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
    serviceProviderPendingList,
    serviceProviderPendingListLoading,
    getServiceProviderPendingList,
    approveServiceProviderProfile,
    rejectServiceProviderProfile,
  }
});
