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
      allDistricts = ref([]),
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
       parent:{
        id: null,
        name: {
         bn: null,
         en: null
        }
      }
     })
    const openDistrictEditDialogManager =(data)=>{
      openDistrictEditDialog.value = true
      districtInfo.id = data._id
      districtInfo.name = data.name
      districtInfo.parent = divisionStore.divisionList.divisions.filter(e=>e._id == data.parent._id)[0]
    }
    const getDistrictList= async()=>{
      const config = {
        method: "get",
        url: "api/districts",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
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
    const getAllDistricts= async(id)=>{
      const params = {}
      if(id){
        params.divisionId = id
      }
      const config = {
        method: "get",
        url: "api/districts/all",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        },
        params
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        allDistricts.value = responseData.data;
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
        openDistrictCreateDialog.value = false
        getDistrictList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
    const updateDistrict= async()=>{
      const data = {}
      if(districtInfo.name.en && districtInfo.name.bn){
        data.name = districtInfo.name
      }
      if(districtInfo.parent instanceof Object){
        if(districtInfo.parent._id && districtInfo.parent.name.en && districtInfo.parent.name.bn){
          data.parent = districtInfo.parent
        }
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
    const deleteDistrict= async()=>{
      const config = {
        method: "delete",
        url: "api/districts/"+districtInfo.id+"/",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        }
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
      getAllDistricts,
allDistricts,
      districtList,
      districtInfo,
      getDistrictList,
      createNewDistrict,
updateDistrict,
deleteDistrict
     }
});
