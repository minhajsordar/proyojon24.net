import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { Notify } from 'quasar';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const usePaymentStore = defineStore('payment store', () => {
  const paymentInfo = reactive({
    bankAccountName: '',
    phoneNumber: "",
    transactionId: "",
    amount: 0,
  })
  const currentPage = ref(1)
  const myPaymentList = ref(null)
  const myPaymentListLoading = ref(false)
  const openPaymentDialog = ref(false)

  const paymentDialogManager = () => {
    openPaymentDialog.value = true
    paymentInfo.bankAccountName = ''
    paymentInfo.phoneNumber = ""
    paymentInfo.transactionId = ""
    paymentInfo.amount = 0
  }

  const getMyPaymentList = async () => {
    const config = {
      method: "get",
      url: "api/payments",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      },params:{
        pageSize: 1,
        pageNumber: currentPage.value
      }
    };
    myPaymentListLoading.value = true
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      myPaymentList.value = responseData.data;
      loader.hideLoader()
      myPaymentListLoading.value = false
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Couldn't get payment list",
      });
      myPaymentListLoading.value = false
    }
  }
  const makePayment = async () => {
    const data = paymentInfo
    const config = {
      method: "post",
      url: "api/payments",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getMyPaymentList()
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "positive",
        message: "Successfully Submitted your payment information. Our team will check your payment information. After confirmation you will enjoy your premium account.",
      });
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Failed To Create User",
      });
    }
  }
  const deletePayment = async (paymentId) => {
    const config = {
      method: "delete",
      url: "api/payments/" + paymentId,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getMyPaymentList()
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "positive",
        message: "Successfully deleted payment",
      });
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Failed to delete payment",
      });
    }
  }
  return {
    currentPage,
    paymentInfo,
    myPaymentList,
    myPaymentListLoading,
    getMyPaymentList,
    makePayment,
    openPaymentDialog,
    paymentDialogManager,
    deletePayment,
  }
});
