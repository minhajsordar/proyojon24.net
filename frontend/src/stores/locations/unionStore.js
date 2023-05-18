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
export const useUnionStore = defineStore('union store', ()=>{

      const router = useRouter(),
      authStore = useAuthStore(),
      openUnionCreateDialog = ref(false),
      openUnionEditDialog = ref(false),
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
    const getUnionList= async()=>{
      const config = {
        method: "get",
        url: "api/unions",
        headers: {
          "Content-Type": "application/json"
        }
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        unionList.value = responseData.data;
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()

      }

    }
    const createNewUnion = async()=>{
      const data = unionInfo
      const config = {
        method: "post",
        url: "api/unions",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
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
    const updateUnion= async()=>{
      const unionInfoKeys = [
        "name",
        "parent",
      ]
      const data = {}
      unionInfoKeys.forEach((value,index)=>{
        if(unionInfo[value] instanceof Object){
          if(unionInfo[value].bn && unionInfo[value].bn){
            data[value] = unionInfo[value]
          }
        }
      })

      if(unionInfo.parent instanceof Object){
        data.parent = unionInfo.parent._id
      }else{
        data.parent = unionInfo.parent
      }
      const config = {
        method: "put",
        url: "api/unions/"+unionInfo.id+"/",
        headers: {
          "Authorization":`Bearer ${authStore.loginUserInfo.token}`,
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
     return{
      openUnionCreateDialog,
      openUnionEditDialog,
      openUnionEditDialogManager,
      unionList,
      unionInfo,
      getUnionList,
      createNewUnion,
      updateUnion,
     }
});
