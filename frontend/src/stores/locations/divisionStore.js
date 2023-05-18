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
export const useDivisionStore = defineStore('division store', ()=>{

      const router = useRouter(),
      openDivisionCreateDialog= ref(false),
      openDivisionEditDialog= ref(false),
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
       divisionInfo.id = data.id
       divisionInfo.name.en = data.name.en
       divisionInfo.name.bn = data.name.bn
     }
    const getDivisionList= async()=>{
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
        divisionList.value = responseData.data;
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
      divisionList,
      divisionInfo,
      getDivisionList,
     }
});
