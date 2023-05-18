import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import {encode64} from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
export const suggestUserData = useLocalStorage('proyojonuserkey',{})
export const loginUser = useLocalStorage('proyojonloginuser',{})
loader.title = 'Requesting To Server...'
export const useUnionStore = defineStore('union store', ()=>{

      const router = useRouter(),
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
       unionInfo.id = data.id
       unionInfo.name = data.name
       unionInfo.parent = data.parent
     }
    const getUnionList= async()=>{
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
        unionList.value = responseData.data;
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
     }
});
