import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import loader from 'loader-animation'
import { Notify } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
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
    CustomLoading('get-services-all').showLoading()
    try {
      const responseData = await api.request(config);
      allServices.value = responseData.data
      getServiceCategorys()
      CustomLoading('get-services-all').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-services-all').hideLoading()
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
    CustomLoading('get-service-categorys-all').showLoading()
    try {
      const responseData = await api.request(config);
      allServices.value.map((service) =>{
        service.serviceCategorys = responseData.data.filter(d=>d.service === service._id)
      });
      CustomLoading('get-service-categorys-all').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-service-categorys-all').hideLoading()
    }
  }
  return {
    allServices,
    getAllServices,
  }
});
