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
export const useServiceProviderPreviewStore = defineStore('service provider preview store', () => {
  const router = useRouter(),
    authStore = useAuthStore();
    const serviceProviderPreview = ref(null)

  const getServiceProviderPreview = async (id) => {
    const config = {
      method: "get",
      url: "api/service_providers/preview/"+id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      serviceProviderPreview.value = responseData.data;
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: "Service provider not found",
      });
      loader.hideLoader()
    }
  }
  return {
    serviceProviderPreview,
    getServiceProviderPreview,
  }
});
