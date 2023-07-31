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
loader.title = 'Requesting To Server...'
export const useEarningStore = defineStore('earning store', () => {
  const myEarningList = ref(null)
  const myEarningListLoading = ref(false)
  const currentPage = ref(1)
  const withdrawalMethode = ref('')
  const openWithdrawDialog = ref(false)
  const withdrawLoading = ref(false)
  const withdrawMethode = ref(null)
  const openEarningDialog = ref(false)
const openWithdrawDialogManager = ()=>{
  withdrawMethode.value = null
  openWithdrawDialog.value = true
}
  const getMyEarningList = async () => {
    const config = {
      method: "get",
      url: "api/earning",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`
      }, params: {
        pageNumber: currentPage.value
      }
    };
    myEarningListLoading.value = true
    CustomLoading('get-earning-user').showLoading()
    try {
      const responseData = await api.request(config);
      myEarningList.value = responseData.data;
      CustomLoading('get-earning-user').hideLoading()
      myEarningListLoading.value = false
    } catch (error) {
      console.log(error);
      CustomLoading('get-earning-user').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Couldn't get earning list",
      });
      myEarningListLoading.value = false
    }
  }
  const withdrawAmount = async () => {
    const config = {
      method: "post",
      url: "api/earning/withdraw",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`
      },data:{
        methode: withdrawMethode.value._id
      }
    };
    withdrawLoading.value = true
    CustomLoading('withdraw-amount').showLoading()
    try {
      const responseData = await api.request(config);
      openWithdrawDialog.value = false
      CustomLoading('withdraw-amount').hideLoading()
      withdrawLoading.value = false
      getMyEarningList()
    } catch (error) {
      console.log(error);
      openWithdrawDialog.value = false
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
    openWithdrawDialog,
    openWithdrawDialogManager,
    myEarningList,
    myEarningListLoading,
    getMyEarningList,
    withdrawAmount,
    withdrawMethode,
  }
});
