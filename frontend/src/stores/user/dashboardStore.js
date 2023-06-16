
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useLocalStorage } from '@vueuse/core';
import {  ref } from 'vue';
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
    try {
      const responseData = await api.request(config);
      dashboardData.value = responseData.data
    } catch (error) {
      console.log(error);
    }
  }
  return {
    getDashboardData,
    dashboardData,
  }
});
