import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import {encode64} from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
export const suggestUserData = useLocalStorage('proyojonuserkey',{})
export const loginUser = useLocalStorage('proyojonloginuser',{})
loader.title = 'Requesting To Server...'
export const useServiceStore = defineStore('service store', ()=>{
      const router = useRouter(),
      authStore = useAuthStore(),
      openServiceCreateDialog = ref(false),
      openServiceEditDialog = ref(false),
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
       name: {
        bn:null,
        en:null
       },
       icon: null,
     })
    const openServiceEditDialogManager =(data)=>{
      openServiceEditDialog.value = true
      serviceInfo.id = data.id
      serviceInfo.name = data.name
      serviceInfo.icon = data.icon
    }
    const getServiceList= async()=>{
      const config = {
        method: "get",
        url: "api/services/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authStore.loginUserInfo.token}`

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
    const createService= async()=>{
      const data = serviceInfo
      const config = {
        method: "post",
        url: "api/services",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authStore.loginUserInfo.token}`

        },data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        getServiceList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
    const updateService= async()=>{
      const serviceInfoKeys = [
        "name",
        "icon",
      ]
      const data = {}
      serviceInfoKeys.forEach((value,index)=>{
        if(serviceInfo[value] instanceof Object){
          if(serviceInfo[value].bn && serviceInfo[value].bn){
            data[value] = serviceInfo[value]
          }
        }else if(serviceInfo[value]){
            data[value] = serviceInfo[value]

        }
      })
      const config = {
        method: "post",
        url: "api/services/"+serviceInfo.id,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authStore.loginUserInfo.token}`

        }
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        getServiceList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
    const deleteService= async()=>{
      const config = {
        method: "delete",
        url: "api/services/"+serviceInfo.id,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authStore.loginUserInfo.token}`

        }
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        getServiceList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
     return{
      openServiceEditDialog,
      openServiceCreateDialog,
      serviceList,
      serviceInfo,
      getServiceList,
      createService,
      updateService,
      deleteService,
      openServiceEditDialogManager
     }
});
