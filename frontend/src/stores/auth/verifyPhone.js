
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useAuthStore } from '../auth/authStore';
import loader from 'loader-animation'
import { Notify, Dialog } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// verify_phone
loader.title = 'Requesting To Server...'
export const useOtpVerificationStore = defineStore('otp verification store', () => {
  const authStore = useAuthStore()
  const router = useRouter()
  const openOtpVerificationDialog = ref(false)
  const otpInput = ref('')
  const openOtpVerificationDialogManager=()=>{
    openOtpVerificationDialog.value = true
    otpInput.value = ''
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
    try {
      const responseData = await api.request(config);
      Notify.create({
        position: "center",
        type: "positive",
        message: `Otp Sent successfully`,
      });
      callback()
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: `Could not send OTP. Server error.`,
      });
    }
  }
  const getOtpVerificationCodeWhileRegistration = async () => {
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
    try {
      await api.request(config);
      Dialog.create({
        title: "Check your phone for otp",
        message: "Enter otp or verify from https://proyojon24.net/profile",
        ok: {
          push: true
        },
        persistent: true,
        prompt: {
          model: "",
          type: "text", // optional
        },
      }).onOk((data) => {
        verifyOtpCodeWhileRegistration(data)
      }).onCancel(() => {
        router.push('/login')
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: `Could not send OTP. Server error.`,
      });
    }
  }
  const verifyOtpCode = async () => {
    if(otpInput.value == ''){
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
    try {
      const responseData = await api.request(config);
      authStore.loginUserInfo.phoneVerified = true
      openOtpVerificationDialog.value = false
    } catch (error) {
      console.log(error);
      openOtpVerificationDialog.value = false

      Notify.create({
        position: "center",
        type: "negative",
        message: `Could not verify otp. Try again later.`,
      });
    }
  }
  const verifyOtpCodeWhileRegistration = async (otp) => {
    const config = {
      method: "post",
      url: "api/otp/verify_phone",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }, data: {
        otp
      }
    };
    try {
      await api.request(config);
      authStore.loginUserInfo.phoneVerified = true
      router.push('/service_provider_profile')
    } catch (error) {
      console.log(error);
    }
  }
  return {
    getOtpVerificationCode,
    verifyOtpCode,
    getOtpVerificationCodeWhileRegistration,
    verifyOtpCodeWhileRegistration,
    openOtpVerificationDialog,
    otpInput,
    openOtpVerificationDialogManager
  }
});
