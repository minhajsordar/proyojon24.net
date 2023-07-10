
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { ref, reactive } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
loader.title = 'Requesting To Server...'
export const useMonthlyFeeStore = defineStore('monthly fee store', () => {
  const authStore = useAuthStore()
  const monthlyFeeInfo = reactive({
    amount: 0,
    employeeCount: 0,
  })
  const monthlyFeeData = ref(null)
  const getMonthlyFeeList = async () => {
    const config = {
      method: "get",
      url: "api/monthlyfee",
      headers: {
        "Content-Type": "application/json",
      }
    };
    CustomLoading('monthly-fee-list').showLoading()
    try {
      const responseData = await api.request(config);
      monthlyFeeData.value = responseData.data
      CustomLoading('monthly-fee-list').hideLoading()
    } catch (error) {
      CustomLoading('monthly-fee-list').hideLoading()
      console.log(error);
    }
  }
  const createMonthlyFee = async () => {
    const data = monthlyFeeInfo

    const config = {
      method: "post",
      url: "api/monthlyfee",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }, data
    };
    CustomLoading('monthly-fee-create').showLoading()
    try {
      const responseData = await api.request(config);
      getMonthlyFeeList()
      CustomLoading('monthly-fee-create').hideLoading()
      Notify.create({
        message: "Successfully Created Monthly Fee",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      CustomLoading('monthly-fee-create').hideLoading()
      Notify.create({
        message: "Failed to Create Monthly Fee",
        type: "negative",
        position: "center"
      })
    }
  }
  const updateMonthlyFee = async () => {
    const data = monthlyFeeInfo

    const config = {
      method: "put",
      url: "api/monthlyfee/" + monthlyFeeData.value[0]._id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getMonthlyFeeList()
      loader.hideLoader()
      Notify.create({
        message: "Successfully Updated Monthly Fee",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        message: "Failed to Update Monthly Fee",
        type: "negative",
        position: "center"
      })
    }
  }
  const deleteMonthlyFee = async (id) => {
    const config = {
      method: "delete",
      url: "api/monthlyfee/" + id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      },
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getMonthlyFeeList()
      loader.hideLoader()
      Notify.create({
        message: "Successfully Updated Monthly Fee",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        message: "Failed to Update Monthly Fee",
        type: "negative",
        position: "center"
      })
    }
  }

  return {
    monthlyFeeInfo,
    monthlyFeeData,
    getMonthlyFeeList,
    createMonthlyFee,
    updateMonthlyFee,
    deleteMonthlyFee,
  }
});
