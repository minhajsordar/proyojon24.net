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
import { confetti } from "tsparticles-confetti";
import { useOtpVerificationStore } from "src/stores/auth/verifyPhone";
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
const myRooms = useLocalStorage('myrooms', {})
loader.title = 'Requesting To Server...'
const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}
export const useRegisterStore = defineStore('register store', () => {
  const otpVerificationStore = useOtpVerificationStore();

  const { t } = useI18n();
  const router = useRouter()
  const languageStore = useLanguageStore()
  const authStore = useAuthStore(),
    nidImage = ref(null),
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
      bankAccountName: "",
      phoneNumber: "",
      transactionId: "",
      amount: 0,
      reference: null,
    })
  const matchPassword = () => {
    if (newUserInfo.password == newUserInfo.password2) {
      return true
    } else {
      return "Password Not Matched"
    }
  }
  const registerNewUser = async () => {
    const data = {
      name: newUserInfo.name,
      phone: newUserInfo.phone,
      username: newUserInfo.username,
      email: newUserInfo.email,
      password: newUserInfo.password,
      reference: newUserInfo.reference
    }
    const config = {
      method: "post",
      url: "api/users/register",
      headers: {
        "Content-Type": "application/json"
      },
      data
    };
    loader.showLoader()

    try {
      const responseData = await api.request(config);
      // router.push('/login')
      loader.hideLoader()

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });

      fire(0.2, {
        spread: 60,
      });

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
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
        myRooms.value = null
        otpVerificationStore.getOtpVerificationCodeWhileRegistration()
        // router.push('/service_provider_profile')
      }).onCancel(() => {
        router.push('/login')
      });
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
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
        message: error,
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
