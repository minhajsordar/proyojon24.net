import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import {encode64} from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { useWardStore } from './wardStore';
export const suggestUserData = useLocalStorage('proyojonuserkey',{})
export const loginUser = useLocalStorage('proyojonloginuser',{})
const locationListGlobal = useLocalStorage('global-location-list', {})
loader.title = 'Requesting To Server...'
export const useUnionStore = defineStore('union store', ()=>{

      const router = useRouter(),
      authStore = useAuthStore(),
      wardStore = useWardStore(),
      openUnionCreateDialog = ref(false),
      openUnionEditDialog = ref(false),
      allUnions = ref([]),
      allUnionsLoading = ref(false),
      unionListLoading = ref(false),
      unionList = ref({
        page:1,pages:1,
        unions:[]
      }),
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
    unionList.value.unions = locationListGlobal.value.unions

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
        getUnionList()
        allUnionsLoading.value = false
      } catch (error) {
        console.log(error);
        loader.hideLoader()
        allUnionsLoading.value = false

      }

    }
    const getAllUnions= async(id)=>{
      const params = {}
      if (id) {
        allUnions.value = locationListGlobal.value.unions.filter(e=>{
          return e.parent._id === id
        })
      }else{
        allUnions.value = locationListGlobal.value.unions
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
        wardStore.getGlobalWards()
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
