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
export const useSubDistrictStore = defineStore('sub district store', ()=>{

      const router = useRouter(),
      openSubDistrictCreateDialog = ref(false),
      subDistrictList = ref([
        {
          id:123,
          name:{
            bn: "রাজবাড় সদর",
            en:"Rajbari Sadar"
          },
          parent:{
            bn: "রাজবাড়",
            en:"Rajbari"
          },
        },
        {
          id:123,
          name:{
            bn: "রাজবাড় সদর",
            en:"Rajbari Sadar"
          },
          parent:{
            bn: "রাজবাড়",
            en:"Rajbari"
          },
        },
        {
          id:123,
          name:{
            bn: "রাজবাড় সদর",
            en:"Rajbari Sadar"
          },
          parent:{
            bn: "রাজবাড়",
            en:"Rajbari"
          },
        },
      ]),
      subDistrictInfo = reactive({
       id: null,
       name: null,
       parent: null,
     })
    const getSubDistrictList= async()=>{
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
        subDistrictList.value = responseData.data;
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()

      }

    }
     return{
      openSubDistrictCreateDialog,
      subDistrictList,
      subDistrictInfo,
      getSubDistrictList,
     }
});