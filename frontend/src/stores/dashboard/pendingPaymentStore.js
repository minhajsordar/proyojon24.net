import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { Notify } from 'quasar';
import { isObjEmpty } from 'src/global_js/utils';
import { CustomLoading } from 'src/global_js/loadiingApi';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const usePendingPaymentStore = defineStore('pending payment store', () => {
  const currentPage = ref(1)
  const rejectNote = ref("Please make sure you have paid correct amount or the transaction id is correct")
  const pendingPaymentList = ref(null)
  const pendingPaymentListLoading = ref(false)

  const getPendingPaymentList = async () => {
    CustomLoading('pending-payment-list').showLoading()
    const config = {
      method: "get",
      url: "api/payments/pending",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, params: {
        pageSize: 1,
        pageNumber: currentPage.value
      }
    };
    pendingPaymentListLoading.value = true
    // loader.showLoader()
    try {
      const responseData = await api.request(config);
      pendingPaymentList.value = responseData.data;
      // loader.hideLoader()
      pendingPaymentListLoading.value = false

    CustomLoading('pending-payment-list').hideLoading()
  } catch (error) {
    console.log(error);
    // loader.hideLoader()
    CustomLoading('pending-payment-list').hideLoading()
    Notify.create({
        position: "center",
        type: "negative",
        message: "Couldn't get payment list",
      });
      pendingPaymentListLoading.value = false
    }
  }
  const approvePayment = async (id) => {
    const config = {
      method: "put",
      url: "api/payments/" + id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data: {
        note: '',
        status: 'approved',
      }
    };
    pendingPaymentListLoading.value = true
    CustomLoading('put-payments').showLoading()
    try {
      const responseData = await api.request(config);
      pendingPaymentList.value = responseData.data;
      CustomLoading('put-payments').hideLoading()
      pendingPaymentListLoading.value = false
    } catch (error) {
      console.log(error);
      CustomLoading('put-payments').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Couldn't get payment list",
      });
      pendingPaymentListLoading.value = false
    }
  }
  const rejectPayment = async (id) => {
    const config = {
      method: "put",
      url: "api/payments/" + id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data: {
        note: rejectNote.value,
        status: 'rejected',
      }
    };
    pendingPaymentListLoading.value = true
    CustomLoading('put-payments-id').showLoading()
    try {
      const responseData = await api.request(config);
      pendingPaymentList.value = responseData.data;
      CustomLoading('put-payments-id').hideLoading()
      pendingPaymentListLoading.value = false
    } catch (error) {
      console.log(error);
      CustomLoading('put-payments-id').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Couldn't get payment list",
      });
      pendingPaymentListLoading.value = false
    }
  }
  return {
    currentPage,
    rejectNote,
    pendingPaymentList,
    pendingPaymentListLoading,
    getPendingPaymentList,
    approvePayment,
    rejectPayment
  }
});
