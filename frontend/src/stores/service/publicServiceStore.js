import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import loader from 'loader-animation'
import { Notify } from 'quasar';
loader.title = 'Requesting To Server...'
export const usePublicServiceStore = defineStore('Publice service store', () => {
  const router = useRouter(),
    allServices = ref(null)
  const getAllServices = async () => {
    const config = {
      method: "get",
      url: "api/services/all",
      headers: {
        "Content-Type": "application/json",

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      responseData.data.sort((a, b) => a.order - b.order);
      allServices.value = responseData.data
      getServiceCategorys()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const getServiceCategorys = async () => {
    const config = {
      method: "get",
      url: "api/service_categorys/all",
      headers: {
        "Content-Type": "application/json",

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      allServices.value.map((service) =>{
        service.serviceCategorys = responseData.data.filter(d=>d.service === service._id)
      });
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  return {
    allServices,
    getAllServices,
  }
});
