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
export const useDistrictStore = defineStore('district store', ()=>{

      const router = useRouter(),
      openDistrictCreateDialog = ref(false),
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
       name: null,
       parent: null,
     })
    const getDistrictList= async()=>{
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
        districtList.value = responseData.data;
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
     return{
      openDistrictCreateDialog,
      districtList,
      districtInfo,
      getDistrictList,
     }
});
