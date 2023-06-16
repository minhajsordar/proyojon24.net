import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import loader from 'loader-animation'
import { Notify } from 'quasar';
loader.title = 'Requesting To Server...'
export const useTopSuggestedStore = defineStore('Top Suggested Store', () => {
  const router = useRouter(),
    suggested = ref(null),
    topSuggested = ref(null)
  const getSuggestedProvider = async () => {
    const config = {
      method: "get",
      url: "api/service_providers/suggested_service_provider",
      headers: {
        "Content-Type": "application/json",
      }
    };
    try {
      const responseData = await api.request(config);
      suggested.value = responseData.data;
    } catch (error) {
      console.log(error);
    }
  }
  const getTopSuggestedProvider = async () => {
    const config = {
      method: "get",
      url: "api/service_providers/top_suggested_service_provider",
      headers: {
        "Content-Type": "application/json",
      }
    };
    try {
      const responseData = await api.request(config);
      topSuggested.value = responseData.data;
    } catch (error) {
      console.log(error);
    }
  }
  return {
    topSuggested,
    getTopSuggestedProvider,
    suggested,
    getSuggestedProvider,
  }
});
