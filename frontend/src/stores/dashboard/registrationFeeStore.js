
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { ref, reactive } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
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
    CustomLoading('registration-fee-list').showLoading()
    try {
      const responseData = await api.request(config);
      registrationFeeData.value = responseData.data
      CustomLoading('registration-fee-list').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('registration-fee-list').hideLoading()
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
    CustomLoading('registration-fee-create').showLoading()
    try {
      const responseData = await api.request(config);
      getRegistrationFeeList()
      CustomLoading('registration-fee-create').hideLoading()
      Notify.create({
        message: "Successfully Created Registration Fee",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      CustomLoading('registration-fee-create').hideLoading()
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
    CustomLoading('registration-fee-update').showLoading()
    try {
      const responseData = await api.request(config);
      getRegistrationFeeList()
      CustomLoading('registration-fee-update').hideLoading()
      Notify.create({
        message: "Successfully Updated Registration Fee",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      CustomLoading('registration-fee-update').hideLoading()
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
    CustomLoading('registration-fee-delete').showLoading()
    try {
      const responseData = await api.request(config);
      getRegistrationFeeList()
    CustomLoading('registration-fee-delete').hideLoading()
      Notify.create({
        message: "Successfully Updated Registration Fee",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
    CustomLoading('registration-fee-delete').hideLoading()
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
