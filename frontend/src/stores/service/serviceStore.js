import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import {encode64} from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
export const suggestUserData = useLocalStorage('proyojonuserkey',{})
export const loginUser = useLocalStorage('proyojonloginuser',{})
loader.title = 'Requesting To Server...'
export const useServiceStore = defineStore('service store', ()=>{
      const router = useRouter(),
      serviceList = ref([
        {
          name: {
              bn: 'ডক্টর সেবা',
              en: 'Doctor Service'
          },
          icon: 'null',
      },
        {
          name: {
              bn: 'কারিগরি সেবা',
              en: 'Engineering Service'
          },
          icon: 'null',
      },
    ]),
    serviceInfo = reactive({
       id: null,
       name: null,
       parent: null,
     })
    const getServiceList= async()=>{
      const config = {
        method: "get",
        url: "api/users/login",
        headers: {
          "Content-Type": "application/json"
        }
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        serviceList.value = responseData.data;
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
     return{
      serviceList,
      serviceInfo,
      getServiceList,
     }
});
