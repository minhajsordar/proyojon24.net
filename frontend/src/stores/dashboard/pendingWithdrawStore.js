import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { Notify } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
import { isObjEmpty } from 'src/global_js/utils';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
import { usePendingForApprovalListCountStore } from "src/stores/dashboard/pendingForApprovalListCountStore";

loader.title = 'Requesting To Server...'
export const usePendingWithdrawStore = defineStore('Pending withdraw store', () => {
  const pendingForApprovalListCountStore = usePendingForApprovalListCountStore();
  const pendingWithdrawList = ref(null)
  const pendingWithdrawListLoading = ref(false)
  const withdrawLoading = ref(false)
  const currentPage = ref(1)
  const getPendingWithdrawList = async () => {
    const config = {
      method: "get",
      url: "api/earning/withdrawal_list",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`
      }, params: {
        pageNumber: currentPage.value
      }
    };
    pendingWithdrawListLoading.value = true
    CustomLoading('get-earning-user').showLoading()
    try {
      const responseData = await api.request(config);
      pendingWithdrawList.value = responseData.data;
      CustomLoading('get-earning-user').hideLoading()
      pendingWithdrawListLoading.value = false
    } catch (error) {
      console.log(error);
      CustomLoading('get-earning-user').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Couldn't get earning list",
      });
      pendingWithdrawListLoading.value = false
    }
  }
  const approveWithdrawAmount = async (id) => {
    if(!id){
      return
    }
    const config = {
      method: "patch",
      url: "api/earning/"+id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`
      }
    };
    withdrawLoading.value = true
    CustomLoading('withdraw-amount').showLoading()
    try {
      const responseData = await api.request(config);
      CustomLoading('withdraw-amount').hideLoading()
      withdrawLoading.value = false
      Notify.create({
        position: "center",
        type: "positive",
        message: "Successfully approved the withdraw-amount.",
      });
      getPendingWithdrawList()
      pendingForApprovalListCountStore.getPendingCount()
    } catch (error) {
      console.log(error);
      CustomLoading('withdraw-amount').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Couldn't get earning list",
      });
      withdrawLoading.value = false
    }
  }
  return {
    currentPage,
    pendingWithdrawList,
    pendingWithdrawListLoading,
    getPendingWithdrawList,
    withdrawLoading,
    approveWithdrawAmount,
  }
});
