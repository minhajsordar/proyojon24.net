import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import {encode64} from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth/authStore';
export const suggestUserData = useLocalStorage('proyojonuserkey',{})
export const loginUser = useLocalStorage('proyojonloginuser',{})
loader.title = 'Requesting To Server...'
export const useDivisionStore = defineStore('division store', ()=>{

      const router = useRouter(),
      authStore = useAuthStore(),
      openDivisionCreateDialog= ref(false),
      openDivisionEditDialog= ref(false),
      allDivisions= ref([]),
      divisionList = ref([
        {
          id:123,
          name:{
            bn: "ঢাকা",
            en:"Dhaka"
          }
        },
        {
          id:123,
          name:{
            bn: "ঢাকা",
            en:"Dhaka"
          }
        },
        {
          id:123,
          name:{
            bn: "ঢাকা",
            en:"Dhaka"
          }
        },
      ]),
      divisionInfo = reactive({
        id: null,
        name: {
         bn: null,
         en: null
        }
     })
     const openDivisionEditDialogManager =(data)=>{
      openDivisionEditDialog.value = true
       divisionInfo.id = data._id
       divisionInfo.name.en = data.name.en
       divisionInfo.name.bn = data.name.bn
     }
    const getDivisionList= async()=>{
      const config = {
        method: "get",
        url: "api/divisions",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        }
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        divisionList.value = responseData.data;
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()

      }
    }
    const getAllDivisions= async()=>{
      const config = {
        method: "get",
        url: "api/divisions/all",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        }
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        allDivisions.value = responseData.data;
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()

      }
    }

    const createNewDivision= async()=>{
      const data = divisionInfo
      const config = {
        method: "post",
        url: "api/divisions",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        openDivisionCreateDialog.value = false
        getDivisionList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
    const updateDivision= async()=>{
      const divisionInfoKeys = [
        "name",
      ]
      const data = {}
      divisionInfoKeys.forEach((value,index)=>{
        if(divisionInfo[value] instanceof Object){
          if(divisionInfo[value].bn && divisionInfo[value].bn){
            data[value] = divisionInfo[value]
          }
        }else if(divisionInfo[value]){
            data[value] = divisionInfo[value]

        }
      })
      const config = {
        method: "put",
        url: "api/divisions/"+divisionInfo.id+"/",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        openDivisionEditDialog.value = false
        getDivisionList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
    const deleteDivision= async()=>{
      const config = {
        method: "delete",
        url: "api/divisions/"+divisionInfo.id+"/",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
          "Content-Type": "application/json"
        }
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        getDivisionList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
     return{
      openDivisionCreateDialog,
      openDivisionEditDialog,
      openDivisionEditDialogManager,
      allDivisions,
      getAllDivisions,
      divisionList,
      divisionInfo,
      getDivisionList,
      createNewDivision,
      updateDivision,
      deleteDivision
     }
});
