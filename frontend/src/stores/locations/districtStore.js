import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import {encode64} from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { useDivisionStore } from './divisionStore';
export const suggestUserData = useLocalStorage('proyojonuserkey',{})
export const loginUser = useLocalStorage('proyojonloginuser',{})
loader.title = 'Requesting To Server...'
export const useDistrictStore = defineStore('district store', ()=>{

  const router = useRouter(),
   authStore = useAuthStore(),
   divisionStore = useDivisionStore(),
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
      districtInfo.id = data._id
      districtInfo.name = data.name
      districtInfo.parent = divisionStore.divisionList.divisions.filter(e=>e._id == data.parent)[0]
    }
    const getDistrictList= async()=>{
      const config = {
        method: "get",
        url: "api/districts",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        },params:{
          keyword: "bn"
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
      const data = districtInfo
      const config = {
        method: "post",
        url: "api/districts",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        openDistrictEditDialog.value = false
        getDistrictList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
    const updateDistrict= async()=>{
      const districtInfoKeys = [
        "name",
      ]
      const data = {}
      districtInfoKeys.forEach((value,index)=>{
        if(districtInfo[value] instanceof Object){
          if(districtInfo[value].bn && districtInfo[value].bn){
            data[value] = districtInfo[value]
          }
        }
      })
      if(districtInfo.parent instanceof Object){
        data.parent = districtInfo.parent._id
      }else{
        data.parent = districtInfo.parent
      }
      const config = {
        method: "put",
        url: "api/districts/"+districtInfo.id+"/",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        openDistrictEditDialog.value = false
        getDistrictList()
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
