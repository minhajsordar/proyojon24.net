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
export const useWardStore = defineStore('ward store', ()=>{

      const router = useRouter(),
      authStore = useAuthStore(),
      openWardCreateDialog = ref(false),
      openWardEditDialog = ref(false),
      wardList = ref([
        {
          id:123,
          name:{
            bn: "৫",
            en:"5"
          },
          parent:{
            bn: "সজ্জনকান্দ",
            en:"Sajjankanda"
          },
        },
        {
          id:123,
          name:{
            bn: "৫",
            en:"5"
          },
          parent:{
            bn: "সজ্জনকান্দ",
            en:"Sajjankanda"
          },
        },
        {
          id:123,
          name:{
            bn: "৫",
            en:"5"
          },
          parent:{
            bn: "সজ্জনকান্দ",
            en:"Sajjankanda"
          },
        },
      ]),
      wardInfo = reactive({
        id: null,
        name: {
         bn: null,
         en: null
        },
        parent:null,
     })
     const openWardEditDialogManager =(data)=>{
      openWardEditDialog.value = true
       wardInfo.id = data._id
       wardInfo.name = data.name
       wardInfo.parent = data.parent
     }
    const getWardList= async()=>{
      const config = {
        method: "get",
        url: "api/wards",
        headers: {
          "Content-Type": "application/json"
        }
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        wardList.value = responseData.data;
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()

      }

    }
    const createNewWard = async()=>{
      const data = wardInfo
      const config = {
        method: "post",
        url: "api/wards",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        openWardCreateDialog.value = false
        getWardList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
    const updateWard= async()=>{
      const data = {}
      if(wardInfo.name.en && wardInfo.name.bn){
        data.name = wardInfo.name
      }
      if(wardInfo.parent instanceof Object){
        if(wardInfo.parent._id && wardInfo.parent.name.en && wardInfo.parent.name.bn){
          data.parent = wardInfo.parent
        }
      }
      const config = {
        method: "put",
        url: "api/wards/"+wardInfo.id+"/",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        openWardEditDialog.value = false
       getWardList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
     return{
      openWardCreateDialog,
      openWardEditDialog,
      openWardEditDialogManager,
      wardList,
      wardInfo,
      getWardList,
      createNewWard,
      updateWard,
     }
});
