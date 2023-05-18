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
export const useSubDistrictStore = defineStore('sub district store', ()=>{

      const router = useRouter(),
      authStore = useAuthStore(),
      openSubDistrictCreateDialog = ref(false),
      openSubDistrictEditDialog = ref(false),
      subDistrictList = ref([
        {
          id:123,
          name:{
            bn: "রাজবাড় সদর",
            en:"Rajbari Sadar"
          },
          parent:{
            bn: "রাজবাড়",
            en:"Rajbari"
          },
        },
        {
          id:123,
          name:{
            bn: "রাজবাড় সদর",
            en:"Rajbari Sadar"
          },
          parent:{
            bn: "রাজবাড়",
            en:"Rajbari"
          },
        },
        {
          id:123,
          name:{
            bn: "রাজবাড় সদর",
            en:"Rajbari Sadar"
          },
          parent:{
            bn: "রাজবাড়",
            en:"Rajbari"
          },
        },
      ]),
      subDistrictInfo = reactive({
        id: null,
        name: {
         bn: null,
         en: null
        },
        parent:null,
     })
     const openSubDistrictEditDialogManager =(data)=>{
      openSubDistrictEditDialog.value = true
       subDistrictInfo.id = data._id
       subDistrictInfo.name = data.name
       subDistrictInfo.parent = data.parent
     }
    const getSubDistrictList= async()=>{
      const config = {
        method: "get",
        url: "api/subdistricts",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        }
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        subDistrictList.value = responseData.data;
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()

      }

    }
    const createNewSubDistrict= async()=>{
      const data = subDistrictInfo
      const config = {
        method: "post",
        url: "api/subdistricts",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        openSubDistrictEditDialog.value = false
        getSubDistrictList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
    const updateSubDistrict= async()=>{
      const subDistrictInfoKeys = [
        "name",
      ]
      const data = {}
      subDistrictInfoKeys.forEach((value,index)=>{
        if(subDistrictInfo[value] instanceof Object){
          if(subDistrictInfo[value].bn && subDistrictInfo[value].bn){
            data[value] = subDistrictInfo[value]
          }
        }
      })

      if(subDistrictInfo.parent instanceof Object){
        data.parent = subDistrictInfo.parent._id
      }else{
        data.parent = subDistrictInfo.parent
      }
      const config = {
        method: "put",
        url: "api/subdistricts/"+subDistrictInfo.id+"/",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        openSubDistrictEditDialog.value = false
       getSubDistrictList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
     return{
      openSubDistrictCreateDialog,
      openSubDistrictEditDialog,
      openSubDistrictEditDialogManager,
      subDistrictList,
      subDistrictInfo,
      getSubDistrictList,
      createNewSubDistrict,
      updateSubDistrict,
     }
});
