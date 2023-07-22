
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Notify, Dialog } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// verify_phone
export const useResetPasswordStore = defineStore('reset password store', () => {
  const router = useRouter()
  const phone = ref(null)

  const getResetPassword = async () => {
    const config = {
      method: "post",
      url: "api/users/reset_password",
      headers: {
        "Content-Type": "application/json",
      }, data: {
        phone: phone.value
      }
    };
    CustomLoading('post-resetpass').showLoading()
    try {
      const responseData = await api.request(config);
      CustomLoading('post-resetpass').hideLoading()
      Notify.create({
        position: "center",
        type: "positive",
        message: `Check your Phone for one time password`,
      });
      router.push("/login")
    } catch (error) {
      console.log(error);
      CustomLoading('post-resetpass').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error?.response?.data?.message ? error?.response?.data?.message : "Could not reset password",
      });
    }
  }
  return {
    phone,
    getResetPassword,
  }
});
