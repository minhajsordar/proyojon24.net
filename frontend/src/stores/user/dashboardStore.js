
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useLocalStorage } from '@vueuse/core';
import {  ref } from 'vue';
import { CustomLoading } from 'src/global_js/loadiingApi';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const usePublicDashboardStore = defineStore('public dashboard store', () => {
  const dashboardData = ref(null)
  const getDashboardData = async () => {
    const config = {
      method: "get",
      url: "api/dashboard/public_dashboard",
      headers: {
        "Content-Type": "application/json",

      }
    };
    CustomLoading('get-public-dashboard').showLoading()
    try {
      const responseData = await api.request(config);
      dashboardData.value = responseData.data
      CustomLoading('get-public-dashboard').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-public-dashboard').hideLoading()
    }
  }
  return {
    getDashboardData,
    dashboardData,
  }
});
