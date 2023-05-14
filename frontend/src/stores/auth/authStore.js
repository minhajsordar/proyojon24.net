import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import {encode64} from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
export const suggestUserData = useLocalStorage('userkey',{})
export const loginUser = useLocalStorage('loginuser',{})
loader.title = 'Requesting To Server...'
export const useAuthStore = defineStore('auth store', {
  state: () => {
    return {
      router: useRouter(),
      rememberMe:false,
      loginUserInfo : null,
      isAuthorized : false,
      userAuthInfo : {
       username: null,
       email: null,
       password: null,
       password2: null,
       oldPassword: null,
     }
     }
  },
  actions: {
    rememberUserData() {
      if (!this.rememberMe) {
        this.userAuthInfo.password = null
        this.userAuthInfo.password2 = null
        this.userAuthInfo.oldPassword = null
        this.userAuthInfo.email = null
        suggestUserData.value = null
      } else {
        suggestUserData.value = encode64(this.userAuthInfo.email + 'seperator' + this.userAuthInfo.password + 'seperator' + this.rememberMe)
      }
    },
    async loginFunc2(){
      const config = {
        method: "post",
        url: "api/users/login",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          email:this.userAuthInfo.email,
          password:this.userAuthInfo.password
        }
      };
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        loginUser.value = responseData.data;
        this.loginUserInfo = responseData.data;
        loader.hideLoader()
        this.isAuthorized = true
        this.rememberUserData()
        this.router.push('/profile')
      } catch (error) {
        console.log(error);
        // loader.hideLoader()
        this.rememberUserData()

      }

    },
    logoutFunc (){
      loginUser.value = null
      this.loginUserInfo = null
      this.isAuthorized = false
      this.router.push('/login')
    },
    checkLogin(){
      function isObjEmpty(obj) {
        return Object.keys(obj).length === 0;
      }
      if ((loginUser.value instanceof Object) && isObjEmpty(loginUser.value)) {
        this.isAuthorized = false;
      this.router.push('/login')
        return false;
      } else {
        this.loginUserInfo = loginUser.value
        this.isAuthorized = true;
        return true;
      }
    }
  }
});
