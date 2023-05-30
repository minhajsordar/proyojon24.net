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
const locationListGlobal = useLocalStorage('global-location-list', {})
loader.title = 'Requesting To Server...'
export const useUnionStore = defineStore('union store', ()=>{

      const router = useRouter(),
      authStore = useAuthStore(),
      openUnionCreateDialog = ref(false),
      openUnionEditDialog = ref(false),
      allUnions = ref([]),
      allUnionsLoading = ref(false),
      unionListLoading = ref(false),
      unionList = ref([
        {
          id:123,
          name:{
            bn: "সজ্জনকান্দ",
            en:"Sajjankanda"
          },
          parent:{
            bn: "রাজবাড় সদর",
            en:"Rajbari Sadar"
          },
        },
        {
          id:123,
          name:{
            bn: "সজ্জনকান্দ",
            en:"Sajjankanda"
          },
          parent:{
            bn: "রাজবাড় সদর",
            en:"Rajbari Sadar"
          },
        },
        {
          id:123,
          name:{
            bn: "সজ্জনকান্দ",
            en:"Sajjankanda"
          },
          parent:{
            bn: "রাজবাড় সদর",
            en:"Rajbari Sadar"
          },
        },
      ]),
      unionInfo = reactive({
        id: null,
        name: {
         bn: null,
         en: null
        },
        parent:null,
     })
     const openUnionEditDialogManager =(data)=>{
      openUnionEditDialog.value = true
       unionInfo.id = data._id
       unionInfo.name = data.name
       unionInfo.parent = data.parent
     }
  const unionPage = ref(1)
    const getUnionList= async()=>{
      unionListLoading.value = true
    const params = {
      pageNumber: unionPage.value
    }
      const config = {
        method: "get",
        url: "api/unions",
        headers: {
          "Content-Type": "application/json"
        },params
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        unionList.value = responseData.data;
        loader.hideLoader()
        unionListLoading.value = false
      } catch (error) {
        console.log(error);
        loader.hideLoader()
        unionListLoading.value = false
      }

    }
    const getGlobalUnions= async()=>{
      allUnionsLoading.value = true
      const config = {
        method: "get",
        url: "api/unions/all",
        headers: {
          "Content-Type": "application/json"
        },
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        locationListGlobal.value.unions = responseData.data;
        loader.hideLoader()
        allUnionsLoading.value = false
      } catch (error) {
        console.log(error);
        loader.hideLoader()
        allUnionsLoading.value = false

      }

    }
    const getAllUnions= async(id)=>{
      allUnionsLoading.value = true
      const params = {}
      if(id){
        params.subDistrictId = id
      }
      const config = {
        method: "get",
        url: "api/unions/all",
        headers: {
          "Content-Type": "application/json"
        },params
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        allUnions.value = responseData.data;
        loader.hideLoader()
        allUnionsLoading.value = false
      } catch (error) {
        console.log(error);
        loader.hideLoader()
        allUnionsLoading.value = false

      }

    }
    const createNewUnion = async()=>{
      const data = unionInfo
      const config = {
        method: "post",
        url: "api/unions",
        headers: {
          "Authorization":`Bearer ${loginUser.value.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        openUnionCreateDialog.value = false
        getUnionList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
    const updateUnion= async()=>{
      const unionInfoKeys = [
        "name",
        "parent",
      ]
      const data = {}

      if(unionInfo.name.en && unionInfo.name.bn){
        data.name = unionInfo.name
      }
      if(unionInfo.parent instanceof Object){
        if(unionInfo.parent._id && unionInfo.parent.name.en && unionInfo.parent.name.bn){
          data.parent = unionInfo.parent
        }
      }
      const config = {
        method: "put",
        url: "api/unions/"+unionInfo.id+"/",
        headers: {
          "Authorization":`Bearer ${loginUser.value.token}`,
          "Content-Type": "application/json"
        },
        data
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        openUnionEditDialog.value = false
       getUnionList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
    const deleteUnion= async()=>{
      const config = {
        method: "delete",
        url: "api/unions/"+unionInfo.id+"/",
        headers: {
          "Authorization":`Bearer ${loginUser.value.token}`,
          "Content-Type": "application/json"
        }
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
       getUnionList()
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
     return{
      // dialogs states
      openUnionCreateDialog,
      openUnionEditDialog,
      openUnionEditDialogManager,
      // all unions states, functions
      allUnionsLoading,
      getGlobalUnions,
      getAllUnions,
      allUnions,
      // unions states, functions
      unionListLoading,
      unionPage,
      unionList,
      unionInfo,
      getUnionList,
      // union create, update, delete functions
      createNewUnion,
      updateUnion,
      deleteUnion,
     }
});
