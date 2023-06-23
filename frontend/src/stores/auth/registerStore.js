import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { encode64 } from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useLanguageStore } from '../lang/languageSettingsStore';
import { Notify, Dialog } from 'quasar';
import { useI18n } from "vue-i18n";
import { useAuthStore } from './authStore';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
const myRooms = useLocalStorage('myrooms', {})
loader.title = 'Requesting To Server...'
export const useRegisterStore = defineStore('register store', () => {

  const { t } = useI18n();
  const router = useRouter()
  const languageStore = useLanguageStore()
  const authStore = useAuthStore(),
  nidImage= ref(null),
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
  const matchPassword = () => {
    if (newUserInfo.password == newUserInfo.password2) {
      return true
    } else {
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
      // router.push('/login')
      loader.hideLoader()
      Dialog.create({
        title: t("register_success"),
        message: t("create_service_provider"),
        ok: {
          push: true
        },
        cancel: {
          push: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        authStore.loginUserInfo = responseData.data
        loginUser.value = responseData.data
        loginUser.value = responseData.data
        authStore.isAuthorized = true
        authStore.rememberUserData()
        languageStore.switchToBn()
        router.push('/service_provider_profile')
        myRooms.value = null
      }).onCancel(() => {
        router.push('/login')
      });
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
    }
  }
  const uploadNidAndRegisterUser = async () => {
    if (!nidImage.value || typeof nidImage.value == 'string' || typeof nidImage.value == 'Object') {
      return
    }
    const config = {
      method: "post",
      url: "api/upload",
      headers: {
        "Content-Type": "multipart/form-data",

      }, data: {
        image: nidImage.value
      }
    };
    try {
      const responseData = await api.request(config);
      newUserInfo.nidImage = responseData.data

      registerNewUser()
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
    newUserInfo,
    matchPassword,
    nidImage,
    registerNewUser
  }
});
