
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useAuthStore } from '../auth/authStore';
import loader from 'loader-animation'
import { Notify, Dialog } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CustomLoading } from 'src/global_js/loadiingApi';
import { useRegisterStore } from 'src/stores/auth/registerStore';
// verify_phone
loader.title = 'Requesting To Server...'
export const useOtpVerificationStore = defineStore('otp verification store', () => {
  const authStore = useAuthStore()
  const registrationStore = useRegisterStore()
  const router = useRouter()
  const openOtpVerificationDialog = ref(false)
  const openOtpRegistrationVerificationDialog = ref(false)
  const otpInput = ref('')
  const openOtpVerificationDialogManager = () => {
    openOtpVerificationDialog.value = true
    otpInput.value = ''
  }
  const openOtpRegistationVerificationDialogManager = () => {
    openOtpRegistrationVerificationDialog.value = true
    otpInput.value = ''
  }
  const closeOtpRegistationVerificationDialogManager = () => {
    openOtpRegistrationVerificationDialog.value = false
  }
  const closeOtpVerificationDialogManager = () => {
    openOtpVerificationDialog.value = false
  }
  const getOtpVerificationCode = async (callback) => {
    const config = {
      method: "post",
      url: "api/otp/request_phone_verification_otp",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }, data: {
        phone: authStore.loginUserInfo.phone
      }
    };
    CustomLoading('get-otp-verirication-code').showLoading()
    try {
      const responseData = await api.request(config);
      CustomLoading('get-otp-verirication-code').hideLoading()
      Notify.create({
        position: "center",
        type: "positive",
        message: `Otp Sent successfully`,
      });
      callback()
    } catch (error) {
      console.log(error);
      CustomLoading('get-otp-verirication-code').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: `Could not send OTP. Server error.`,
      });
    }
  }
  const getOtpVerificationCodeWhileRegistration = async () => {
    console.log(registrationStore.newUserInfo)
    const config = {
      method: "post",
      url: "api/otp/request_phone_verification_otp_while_registration",
      headers: {
        "Content-Type": "application/json",
      }, data: {
        phone: registrationStore.newUserInfo.phone
      }
    };
    CustomLoading('get-otp-verirication-code-while-registration').showLoading()
    try {
      await api.request(config);
      openOtpRegistationVerificationDialogManager()
      CustomLoading('get-otp-verirication-code-while-registration').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-otp-verirication-code-while-registration').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: `Could not send OTP. Server error.`,
      });
    }
  }
  const verifyOtpCode = async () => {
    if (otpInput.value == '') {
      return
    }
    const config = {
      method: "post",
      url: "api/otp/verify_phone",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }, data: {
        otp: otpInput.value
      }
    };
    CustomLoading('verify-otp-verirication-code').showLoading()
    try {
      const responseData = await api.request(config);
      authStore.loginUserInfo.phoneVerified = true
      openOtpVerificationDialog.value = false
      router.push('/service_provider_profile')
      CustomLoading('verify-otp-verirication-code').hideLoading()
    } catch (error) {
      console.log(error);
      openOtpVerificationDialog.value = false
      CustomLoading('verify-otp-verirication-code').hideLoading()

      Notify.create({
        position: "center",
        type: "negative",
        message: `Could not verify otp. Try again later.`,
      });
    }
  }
  const verifyOtpCodeWhileRegistration = async (otp) => {
    if (otpInput.value == '') {
      return
    }
    const config = {
      method: "post",
      url: "api/otp/verify_phone_while_registration",
      headers: {
        "Content-Type": "application/json",
      }, data: {
        otp: otpInput.value,
        phone: registrationStore.newUserInfo.phone
      }
    };
    CustomLoading('verify-otp-verirication-code').showLoading()
    try {
      const responseData = await api.request(config);
      openOtpVerificationDialog.value = false
      router.push('/service_provider_profile')
      CustomLoading('verify-otp-verirication-code').hideLoading()
      registrationStore.registerNewUser()
    } catch (error) {
      console.log(error);
      openOtpVerificationDialog.value = false
      CustomLoading('verify-otp-verirication-code').hideLoading()

      Notify.create({
        position: "center",
        type: "negative",
        message: `Could not verify otp. Try again later.`,
      });
    }
  }
  return {
    getOtpVerificationCode,
    verifyOtpCode,
    getOtpVerificationCodeWhileRegistration,
    verifyOtpCodeWhileRegistration,
    openOtpVerificationDialog,
    otpInput,
    openOtpVerificationDialogManager,
    closeOtpVerificationDialogManager,
    openOtpRegistationVerificationDialogManager,
    openOtpRegistrationVerificationDialog,
    closeOtpRegistationVerificationDialogManager,
  }
});
