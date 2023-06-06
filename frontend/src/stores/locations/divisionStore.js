import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import {encode64} from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth/authStore';
import  { divisions } from "src/global_js/staticLocation"
export const suggestUserData = useLocalStorage('proyojonuserkey',{})
export const loginUser = useLocalStorage('proyojonloginuser',{})
const locationListGlobal = useLocalStorage('global-location-list', {})
loader.title = 'Requesting To Server...'
export const useDivisionStore = defineStore('division store', ()=>{
      const router = useRouter(),
      authStore = useAuthStore(),
      openDivisionCreateDialog= ref(false),
      openDivisionEditDialog= ref(false),
      allDivisionsLoading= ref(false),
      allDivisions= ref([]),
      divisionListLoading= ref(false),
      divisionList = ref({
        page:1,
        pages:1,
        divisions:[]
      }),
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
    const getGlobalDivisions= async()=>{
      divisionListLoading.value = true
      const config = {
        method: "get",
        url: "api/divisions",
        headers: {
          "Authorization":`Bearer ${loginUser.value.token}`,
          "Content-Type": "application/json"
        }
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        locationListGlobal.value.divisions = responseData.data.divisions;
        loader.hideLoader()
        getDivisionList()
        divisionListLoading.value = false
      } catch (error) {
        console.log(error);
        loader.hideLoader()
        divisionListLoading.value = false

      }
    }
    const getDivisionList= async()=>{
        divisionList.value.divisions = divisions;
    }
    const getAllDivisions= ()=>{
      allDivisions.value = divisions;
    }

    const createNewDivision= async()=>{
      const data = divisionInfo
      const config = {
        method: "post",
        url: "api/divisions",
        headers: {
          "Authorization":`Bearer ${loginUser.value.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        openDivisionCreateDialog.value = false
        getGlobalDivisions()
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
          "Authorization":`Bearer ${loginUser.value.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        openDivisionEditDialog.value = false
        getGlobalDivisions()
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
          "Authorization":`Bearer ${loginUser.value.token}`,
          "Content-Type": "application/json"
        }
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        getGlobalDivisions()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
     return{
      // dialogs states
      openDivisionCreateDialog,
      openDivisionEditDialog,
      openDivisionEditDialogManager,
      // all divisions states, functions
      allDivisions,
      allDivisionsLoading,
      getAllDivisions,
      getGlobalDivisions,
      // all divisions states, functions
      divisionListLoading,
      divisionList,
      divisionInfo,
      getDivisionList,
      // divisions create, update, delete functions
      createNewDivision,
      updateDivision,
      deleteDivision
     }
});
