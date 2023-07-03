
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { ref, reactive } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
loader.title = 'Requesting To Server...'
export const useRegistrationFeeStore = defineStore('registration fee store', () => {
  const authStore = useAuthStore()
  const registrationFeeInfo = reactive({
    amount: 0,
    employeeCount: 0,
  })
  const registrationFeeData = ref(null)
  const getRegistrationFeeList = async () => {
    const config = {
      method: "get",
      url: "api/registrationfee",
      headers: {
        "Content-Type": "application/json",
      }
    };
    try {
      const responseData = await api.request(config);
      registrationFeeData.value = responseData.data
    } catch (error) {
      console.log(error);
    }
  }
  const createRegistrationFee = async () => {
    const data = registrationFeeInfo

    const config = {
      method: "post",
      url: "api/registrationfee",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getRegistrationFeeList()
      loader.hideLoader()
      Notify.create({
        message: "Successfully Created Registration Fee",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        message: "Failed to Create Registration Fee",
        type: "negative",
        position: "center"
      })
    }
  }
  const updateRegistrationFee = async () => {
    const data = { registrationFeeInfo }

    const config = {
      method: "put",
      url: "api/registrationfee/" + registrationFeeData.value[0]._id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getRegistrationFeeList()
      loader.hideLoader()
      Notify.create({
        message: "Successfully Updated Registration Fee",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        message: "Failed to Update Registration Fee",
        type: "negative",
        position: "center"
      })
    }
  }
  const deleteRegistrationFee = async (id) => {
    const config = {
      method: "delete",
      url: "api/registrationfee/" + id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      },
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getRegistrationFeeList()
      loader.hideLoader()
      Notify.create({
        message: "Successfully Updated Registration Fee",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        message: "Failed to Update Registration Fee",
        type: "negative",
        position: "center"
      })
    }
  }

  return {
    registrationFeeInfo,
    registrationFeeData,
    getRegistrationFeeList,
    createRegistrationFee,
    updateRegistrationFee,
    deleteRegistrationFee,
  }
});
