import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { Notify } from 'quasar';
import { isObjEmpty } from 'src/global_js/utils';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const usePaymentStore = defineStore('payment store', () => {
  const paymentInfo = reactive({
    id: null,
    bankAccountName: '',
    phoneNumber: "",
    transactionId: "",
    amount: 0,
  })
  const currentPage = ref(1)
  const myPaymentList = ref(null)
  const myPaymentListLoading = ref(false)
  const openPaymentDialog = ref(false)
  const openRegistrationFeeDialog = ref(false)
  const registrationFeePaid = ref(false)

  const paymentDialogManager = () => {
    openPaymentDialog.value = true
    paymentInfo.id = null
    paymentInfo.bankAccountName = ''
    paymentInfo.phoneNumber = ""
    paymentInfo.transactionId = ""
    paymentInfo.amount = 0
  }
  const registrationFeeDialogManager = () => {
    openRegistrationFeeDialog.value = true
    paymentInfo.id = null
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
  const getMyRegistrationPayment = async () => {
    const config = {
      method: "get",
      url: "api/payments/registration_fee",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    try {
      const responseData = await api.request(config);
      if(!isObjEmpty(responseData.data)){
        registrationFeePaid.value = true
      }
    } catch (error) {
      console.log(error);
      registrationFeePaid.value = false
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
      openPaymentDialog.value = false
    } catch (error) {
      openPaymentDialog.value = false
      console.log(error);
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Failed To Create User",
      });
    }
  }
  const makePaymentForRegistration = async () => {
    const data = paymentInfo
    const config = {
      method: "post",
      url: "api/payments/registration_fee",
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
      registrationFeePaid.value = true
      Notify.create({
        position: "center",
        type: "positive",
        message: "Successfully Submitted your payment information. Our team will check your payment information. We will confirm your payment soon.",
      });
      openRegistrationFeeDialog.value = false
    } catch (error) {
      openRegistrationFeeDialog.value = false
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
    getMyRegistrationPayment,
    registrationFeeDialogManager,
    openRegistrationFeeDialog,
    registrationFeePaid,
    makePaymentForRegistration
  }
});
