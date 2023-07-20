import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import loader from 'loader-animation'
import { Notify } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
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
    CustomLoading('get-suggested-service-provider').showLoading()
    try {
      const responseData = await api.request(config);
      suggested.value = responseData.data;
      CustomLoading('get-suggested-service-provider').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-suggested-service-provider').hideLoading()
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
    CustomLoading('get-top-suggested-service-provider').showLoading()
    try {
      const responseData = await api.request(config);
      topSuggested.value = responseData.data;
      CustomLoading('get-top-suggested-service-provider').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-top-suggested-service-provider').hideLoading()
    }
  }
  return {
    topSuggested,
    getTopSuggestedProvider,
    suggested,
    getSuggestedProvider,
  }
});
