import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { encode64 } from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useLanguageStore } from '../lang/languageSettingsStore';
import { Notify, date } from "quasar";
import { CustomLoading } from 'src/global_js/loadiingApi';
import { useUserStore } from '../user/userStore';
// room
import { useRoomsStore } from "src/stores/message/roomStore";
import { confetti } from "tsparticles-confetti";
const sessionEndTimeStorage = useLocalStorage("session-timeout-end", {});
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})

import { useMenuControllerStore } from "src/stores/menucontroller/menuControllerStore";
const myRooms = useLocalStorage('myrooms', {})
loader.title = 'Requesting To Server...'
export const useAuthStore = defineStore('auth store', () => {

  const menuControllerStore = useMenuControllerStore();
  const roomStore = useRoomsStore()
  const userStore = useUserStore();
  const router = useRouter(),
    languageStore = useLanguageStore(),

    isAvailable = ref(false),
    rememberMe = ref(false),
    loginUserInfo = ref(null),
    profileEdit = ref(false),
    isAuthorized = ref(false),
    userAuthInfo = reactive({
      username: null,
      email: null,
      password: null,
      password2: null,
      password3: null,
      password4: null,
      oldPassword: null,
    })

  const rememberUserData = () => {
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
  const loginFunc2 = async () => {
    const config = {
      method: "post",
      url: "api/users/login",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        phoneOremail: userAuthInfo.email,
        password: userAuthInfo.password
      }
    };
    CustomLoading('post-user-login').showLoading()
    try {
      const responseData = await api.request(config);
      loginUser.value = responseData.data
      loginUserInfo.value = responseData.data;
      isAvailable.value = responseData.data.isAvailable
      CustomLoading('post-user-login').hideLoading()
      Notify.create({
        position: "top",
        type: "positive",
        message: "Login successful",
      });
      isAuthorized.value = true
      rememberUserData()
      languageStore.switchToBn()
      router.push('/profile')
      myRooms.value = null
      roomStore.getMyRooms()
      sessionEndTimeStorage.value = date.addToDate(new Date(), { minute: 5 })
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      console.log(error);
      CustomLoading('post-user-login').hideLoading()
      rememberUserData()
      Notify.create({
        position: "center",
        type: "negative",
        message: `Error login: ${error}`,
      });
    }

  }
  const logoutFunc = () => {
    loginUser.value = null
    loginUserInfo.value = null
    isAuthorized.value = false
    router.push('/home')
  }
  const checkLogin = () => {
    function isObjEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
    if ((loginUser.value instanceof Object) && isObjEmpty(loginUser.value)) {
      isAuthorized.value = false;
      router.push('/')
      menuControllerStore.leftDashboardOpen = false;
      return false;
    } else {
      loginUserInfo.value = loginUser.value
      isAuthorized.value = true;
      isAvailable.value = loginUser.value.isAvailable
      // roomStore.getMyRooms()
      return true;
    }
  }
  // update user info

  const updateUserInfo = reactive({
    email: "",
    password: "",
    password2: "",
    password3: "",
    password4: "",
    nidNo: "",
    nidImage: null,
    nidImageUrl: "",
    profileImage: null,
    profileImageUrl: "",
    phone: "",
    name: {
      bn: "",
      en: ""
    },
    presentAddress: {
      bn: "",
      en: ""
    },
    permanentAddress: {
      bn: "",
      en: ""
    },
  })

  const updateUserPermission = async (id, permission) => {
    const data = {}
    if (permission) {
      data.permission = permission
    }
    const config = {
      method: "patch",
      url: "api/users/" + id,
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      },
      data
    };
    CustomLoading('patch-users').showLoading()
    try {
      const responseData = await api.request(config);
      CustomLoading('patch-users').hideLoading()
      userStore.getUserList();

    } catch (error) {
      console.log(error);
      CustomLoading('patch-users').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
    }

  }
  const updateUserProfile = async () => {
    if (
      updateUserInfo.email == "" && updateUserInfo.name.bn == "" &&
      updateUserInfo.name.en == "" && updateUserInfo.phone == "" &&
      updateUserInfo.password3 == "" && updateUserInfo.nidNo == "" &&
      updateUserInfo.nidImage == null && updateUserInfo.profileImage == null &&
      updateUserInfo.presentAddress.bn == "" && updateUserInfo.presentAddress.en == "" &&
      updateUserInfo.permanentAddress.bn == "" && updateUserInfo.permanentAddress.en == ""
    ) {
      console.log("null value")
      return
    }
    if (updateUserInfo.password3 !== updateUserInfo.password4) {
      return
    }
    if (updateUserInfo.nidImage instanceof File) {
      try {
        await uploadImage("nidImage", "nidImageUrl")
      } catch (error) {
        console.log(error)
      }
    }
    if (updateUserInfo.profileImage instanceof File) {
      try {
        await uploadImage("profileImage", "profileImageUrl")
      } catch (error) {
        console.log(error)
      }
    }
    const data = {}
    if (updateUserInfo.password3 !== "") {
      data.password = updateUserInfo.password3
    }
    if (updateUserInfo.email !== "") {
      data.email = updateUserInfo.email
    }
    if (updateUserInfo.phone !== "") {
      data.phone = updateUserInfo.phone
    }
    if (updateUserInfo.nidNo !== "") {
      data.nidNo = updateUserInfo.nidNo
    }
    if (updateUserInfo.nidImageUrl !== "") {
      data.nidImage = updateUserInfo.nidImageUrl
    }
    if (updateUserInfo.profileImageUrl !== "") {
      data.profileImage = updateUserInfo.profileImageUrl
    }
    if (updateUserInfo.name.en !== "" || updateUserInfo.name.bn !== "") {
      data.name = updateUserInfo.name
    }
    if (updateUserInfo.presentAddress.en !== "" || updateUserInfo.presentAddress.bn !== "") {
      data.presentAddress = updateUserInfo.presentAddress
    }
    if (updateUserInfo.permanentAddress.en !== "" || updateUserInfo.permanentAddress.bn !== "") {
      data.permanentAddress = updateUserInfo.permanentAddress
    }

    const config = {
      method: "put",
      url: "api/users/" + loginUserInfo.value?._id,
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      },
      data
    };
    CustomLoading('put-users').showLoading()
    try {
      const responseData = await api.request(config);
      loginUser.value = responseData.data
      loginUserInfo.value = responseData.data;
      isAuthorized.value = true
      rememberUserData()
      languageStore.switchToBn()
      CustomLoading('put-users').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('put-users').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
    }

  }
  const updateUserAvailablity = async () => {
    const config = {
      method: "put",
      url: "api/users/" + loginUserInfo.value?._id,
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      },
      data:{
        isAvailable: isAvailable.value
      }
    };
    CustomLoading('put-users').showLoading()
    try {
      const responseData = await api.request(config);
      loginUserInfo.value.isAvailable = responseData.data.isAvailable
      CustomLoading('put-users').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('put-users').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
    }

  }
  const uploadImage = async (field, replace) => {
    if (!updateUserInfo[field] || typeof updateUserInfo[field] == 'string') {
      return
    }
    const config = {
      method: "post",
      url: "api/upload",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data: {
        image: updateUserInfo[field]
      }
    };
    CustomLoading('post-user-upload').showLoading()
    try {
      const responseData = await api.request(config);
      updateUserInfo[replace] = responseData.data
      CustomLoading('post-user-upload').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('post-user-upload').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
    }
  }
  return {
    rememberMe,
    loginUserInfo,
    isAuthorized,
    userAuthInfo,
    profileEdit,
    updateUserInfo,
    updateUserProfile,
    updateUserPermission,

    rememberUserData,
    loginFunc2,
    logoutFunc,
    checkLogin,

    isAvailable,
    updateUserAvailablity
  }
});
