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
export const useUserStore = defineStore('user store', ()=>{
      const router = useRouter(),
      userList = ref([
        {
            name: {
                bn: 'নুর মোহাম্মাদ',
                en: 'Noor Mohammad'
            },
            email: 'mdnoor@gmail.com',
            phone: '+8801756853831',
            nidNo: '123456789123',
            nidImage: '123456789123',
            presentAddress: {
                bn: 'গোয়ালন্দ',
                en: 'Goalonda'
            },
            permanentAddress: {
                bn: 'গোয়ালন্দ',
                en: 'Goalonda'
            },
            isActive: true,
            isAdmin: true,
            isSuperAdmin: true
        },
        {
            name: {
                bn: 'মিনহাজ সরদার',
                en: 'Minhaj Sorder'
            },
            email: 'minhajsorder8567@gmail.com',
            phone: '+8801835158205',
            nidNo: '123456789123',
            nidImage: '123456789123',
            presentAddress: {
                bn: 'রাজবাড়ী',
                en: 'Rajbari'
            },
            permanentAddress: {
                bn: 'রাজবাড়ী',
                en: 'Rajbari'
            },
            isActive: true,
            isAdmin:true,
        },
        {
            name: {
                bn: 'নুর মোহাম্মাদ',
                en: 'Noor Mohammad'
            },
            email: 'noor@gmail.com',
            phone: '+8801756853831',
            nidNo: '123456789123',
            nidImage: '123456789123',
            presentAddress: {
                bn: 'গোয়ালন্দ',
                en: 'Goalonda'
            },
            permanentAddress: {
                bn: 'গোয়ালন্দ',
                en: 'Goalonda'
            },
            isActive: true,
        },
    ]),
      userInfo = reactive({
       id: null,
       name: null,
       parent: null,
     })
    const getUserList= async()=>{
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
        userList.value = responseData.data;
        loader.hideLoader()
      } catch (error) {
        console.log(error);
        loader.hideLoader()
      }
    }
     return{
      userList,
      userInfo,
      getUserList,
     }
});
