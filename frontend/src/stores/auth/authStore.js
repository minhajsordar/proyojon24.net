import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { encode64 } from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useLanguageStore } from '../lang/languageSettingsStore';
import { Notify } from 'quasar';
import { useUserStore } from '../user/userStore';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useAuthStore = defineStore('auth store', () => {
  const userStore = useUserStore();
  const router = useRouter(),
    languageStore = useLanguageStore(),

    rememberMe = ref(false),
    loginUserInfo = ref(null),
    profileEdit = ref(false),
    isAuthorized = ref(false),
    userAuthInfo = reactive({
      username: null,
      email: null,
      password: null,
      password2: null,
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
        email: userAuthInfo.email,
        password: userAuthInfo.password
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
  const logoutFunc = () => {
    loginUser.value = null
    loginUserInfo.value = null
    isAuthorized.value = false
    router.push('/login')
  }
  const checkLogin = () => {
    function isObjEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
    if ((loginUser.value instanceof Object) && isObjEmpty(loginUser.value)) {
      isAuthorized.value = false;
      router.push('/')
      return false;
    } else {
      loginUserInfo.value = loginUser.value
      isAuthorized.value = true;
      return true;
    }
  }
  // update user info

  const updateUserInfo = reactive({
    email: "",
    password: "",
    password2: "",
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

  const updateUserPermission = async (id,permission) => {
    const data = {}
    if (permission == "superAdmin") {
      data.isSuperAdmin = true
    }
    else if (permission == "admin") {
      data.isAdmin = true
    }
    else{
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
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      loader.hideLoader()
  userStore.getUserList();

    } catch (error) {
      loader.hideLoader()
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
    }

  }
  const updateUserProfile = async () => {
    if (
      updateUserInfo.email == "" && updateUserInfo.name.bn == "" &&
      updateUserInfo.name.en == "" && updateUserInfo.phone == "" &&
      updateUserInfo.password == "" && updateUserInfo.nidNo == "" &&
      updateUserInfo.nidImage == null && updateUserInfo.profileImage == null &&
      updateUserInfo.presentAddress.bn == "" && updateUserInfo.presentAddress.en == "" &&
      updateUserInfo.permanentAddress.bn == "" && updateUserInfo.permanentAddress.en == ""
    ) {
      console.log("failed")
      return
    }
    if (updateUserInfo.password !== updateUserInfo.password2) {
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
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      loginUser.value = responseData.data
      loginUserInfo.value = responseData.data;
      loader.hideLoader()
      isAuthorized.value = true
      rememberUserData()
      languageStore.switchToBn()
      loader.hideLoader()
    } catch (error) {
      loader.hideLoader()
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
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
    try {
      const responseData = await api.request(config);
      updateUserInfo[replace] = responseData.data
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
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
    checkLogin
  }
});
