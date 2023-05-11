import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { reactive, ref } from 'vue';
import loader from 'loader-animation'
import {useRouter} from 'vue-router'
import {encode64} from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
loader.title = 'Requesting To Server...'
export const suggestUserData = useLocalStorage('userkey',{})
export const loginUser = useLocalStorage('loginuser',{})
export const useAuthStore = defineStore('auth store', ()=>{
  const router = useRouter()
  const rememberMe = ref(false)
  const loginUserInfo = ref(null)
  const isAuthorized = ref(false)
  const userAuthInfo = reactive({
    username: null,
    email: null,
    password: null,
    password2: null,
    oldPassword: null,
  })
  const rememberUserData=()=> {
    if (!rememberMe.value) {
      userAuthInfo.password = null
      userAuthInfo.password2 = null
      userAuthInfo.oldPassword = null
      userAuthInfo.email = null
      suggestUserData.value = null
    } else {
      suggestUserData.value = encode64(userAuthInfo.email + 'seperator' + userAuthInfo.password + 'seperator' + rememberMe.value)
    }
  }
  const loginFunc = async()=>{
    loader.showLoader()
    const config = {
      method: "post",
      url: "api/users/login",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email:userAuthInfo.email,
        password:userAuthInfo.password
      }
    };

    try {
      const responseData = await api.request(config);
      loginUser.value = responseData.data;
      loginUserInfo.value = responseData.data;
      loader.hideLoader()
      router.push('/user')
      isAuthorized.value = true
      rememberUserData()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      rememberUserData()

    }

  }
  const logoutFunc = ()=>{
    loginUser.value = null
    loginUserInfo.value = null

    isAuthorized.value = false
    router.push('/login')
  }
  const checkLogin = ()=>{
    function isObjEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
    if (isObjEmpty(loginUser.value)) {
      router.push("/login");
      isAuthorized.value = false;
      return false;
    } else {
      loginUserInfo.value = loginUser.value
      isAuthorized.value = true;
      return true;
    }
  }
  return{
    // states
    rememberMe,
    userAuthInfo,
    loginUserInfo,
    isAuthorized,
    // actions
    rememberUserData,
    loginFunc,
    checkLogin
  }
});
