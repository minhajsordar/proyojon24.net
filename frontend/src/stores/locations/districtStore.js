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
export const useDistrictStore = defineStore('district store', ()=>{

  const router = useRouter(),
   authStore = useAuthStore(),
      openDistrictCreateDialog = ref(false),
      openDistrictEditDialog = ref(false),
      districtList = ref([
        {
          id:123,
          name:{
            bn: "রাজবাড়",
            en:"Rajbari"
          },
          parent:{
            bn: "ঢাকা",
            en:"Dhaka"
          },
        },
        {
          id:123,
          name:{
            bn: "রাজবাড়",
            en:"Rajbari"
          },
          parent:{
            bn: "ঢাকা",
            en:"Dhaka"
          },
        },
        {
          id:123,
          name:{
            bn: "রাজবাড়",
            en:"Rajbari"
          },
          parent:{
            bn: "ঢাকা",
            en:"Dhaka"
          },
        },
      ]),
      districtInfo = reactive({
       id: null,
       name: {
        bn: null,
        en: null
       },
       parent:null,
     })
    const openDistrictEditDialogManager =(data)=>{
      openDistrictEditDialog.value = true
      districtInfo.id = data.id
      districtInfo.name = data.name
      districtInfo.parent = data.parent
    }
    const getDistrictList= async()=>{
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
        districtList.value = responseData.data;
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
    const createNewDistrict= async()=>{
      const data = {}
      data.name = districtInfo.name
      const config = {
        method: "post",
        url: "api/users/login",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        districtList.value = responseData.data;
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
    const updateDistrict= async()=>{
      const data = {}
      data.name = districtInfo.name
      const config = {
        method: "put",
        url: "api/users/login/"+districtInfo.id+"/",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        districtList.value = responseData.data;
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
     return{
      openDistrictCreateDialog,
      openDistrictEditDialog,
      openDistrictEditDialogManager,
      districtList,
      districtInfo,
      getDistrictList,
      createNewDistrict,
updateDistrict
     }
});
