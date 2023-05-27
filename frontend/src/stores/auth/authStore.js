import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import {encode64} from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useLanguageStore } from '../lang/languageSettingsStore';
export const suggestUserData = useLocalStorage('proyojonuserkey',{})
export const loginUser = useLocalStorage('proyojonloginuser',{})
loader.title = 'Requesting To Server...'
export const useAuthStore = defineStore('auth store', ()=>{
      const router = useRouter(),
      languageStore = useLanguageStore(),
      rememberMe=ref(false),
      loginUserInfo = ref(null),
      isAuthorized = ref(false),
      userAuthInfo = reactive({
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
    const loginFunc2= async()=>{
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
      loader.showLoader()
      try {
        const responseData = await api.request(config);
        loginUser.value = responseData.data
        loginUserInfo.value = responseData.data;
        loader.hideLoader()
        isAuthorized.value = true
        rememberUserData()
        languageStore.switchToBn()
        router.push('/profile')
      } catch (error) {
        console.log(error);
        // loader.hideLoader()
        rememberUserData()

      }

    }
    const logoutFunc =()=>{
      loginUser.value = null
      loginUserInfo.value = null
      isAuthorized.value = false
      router.push('/login')
    }
    const checkLogin=()=>{
      function isObjEmpty(obj) {
        return Object.keys(obj).length === 0;
      }
      if ((loginUser.value instanceof Object) && isObjEmpty(loginUser.value)) {
        isAuthorized.value = false;
      router.push('/login')
        return false;
      } else {
        loginUserInfo.value = loginUser.value
        isAuthorized.value = true;
        return true;
      }
    }
     return{
      rememberMe,
      loginUserInfo,
      isAuthorized,
      userAuthInfo,

      rememberUserData,
loginFunc2,
logoutFunc,
checkLogin
     }
});
// export const useAuthStore = defineStore('auth store', {
//   state: () => {
//     return {
//       router: useRouter(),
//       rememberMe:false,
//       loginUserInfo : null,
//       isAuthorized : false,
//       userAuthInfo : {
//        username: null,
//        email: null,
//        password: null,
//        password2: null,
//        oldPassword: null,
//      }
//      }
//   },
//   actions: {
//     rememberUserData() {
//       if (!this.rememberMe) {
//         this.userAuthInfo.password = null
//         this.userAuthInfo.password2 = null
//         this.userAuthInfo.oldPassword = null
//         this.userAuthInfo.email = null
//         suggestUserData.value = null
//       } else {
//         suggestUserData.value = encode64(this.userAuthInfo.email + 'seperator' + this.userAuthInfo.password + 'seperator' + this.rememberMe)
//       }
//     },
//     async loginFunc2(){
//       const config = {
//         method: "post",
//         url: "api/users/login",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         data: {
//           email:this.userAuthInfo.email,
//           password:this.userAuthInfo.password
//         }
//       };
//       loader.showLoader()
//       try {
//         const responseData = await api.request(config);
//         loginUser.value = responseData.data;
//         this.loginUserInfo = responseData.data;
//         loader.hideLoader()
//         this.isAuthorized = true
//         this.rememberUserData()
//         this.router.push('/profile')
//       } catch (error) {
//         console.log(error);
//         // loader.hideLoader()
//         this.rememberUserData()

//       }

//     },
//     logoutFunc (){
//       loginUser.value = null
//       this.loginUserInfo = null
//       this.isAuthorized = false
//       this.router.push('/login')
//     },
//     checkLogin(){
//       function isObjEmpty(obj) {
//         return Object.keys(obj).length === 0;
//       }
//       if ((loginUser.value instanceof Object) && isObjEmpty(loginUser.value)) {
//         this.isAuthorized = false;
//       this.router.push('/login')
//         return false;
//       } else {
//         this.loginUserInfo = loginUser.value
//         this.isAuthorized = true;
//         return true;
//       }
//     }
//   }
// });
