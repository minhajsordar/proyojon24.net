import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { encode64 } from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useLanguageStore } from '../lang/languageSettingsStore';
import { Notify } from 'quasar';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useRegisterStore = defineStore('register store', () => {
  const router = useRouter(),
    newUserInfo = reactive({
      name: {
        bn: null,
        en: null
      },
      username: null,
      phone: null,
      email: null,
      password: null,
      password2: null,
    })
const matchPassword = ()=>{
  if(newUserInfo.password == newUserInfo.password2){
    return true
  }else{
    return "Password Not Matched"
  }
}
  const registerNewUser = async () => {
    const config = {
      method: "post",
      url: "api/users/register",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        name: newUserInfo.name,
        phone: newUserInfo.phone,
        username: newUserInfo.username,
        email: newUserInfo.email,
        password: newUserInfo.password
      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      router.push('/login')
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
      loader.hideLoader()
    }
  }
  return {
    newUserInfo,
    matchPassword,
    registerNewUser
  }
});
