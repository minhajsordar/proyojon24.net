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
export const useWithdrawalMethodeStore = defineStore('withdrawal methode store', () => {
  const withdrawalMethodeInfo = reactive({
    id: null,
    mobileBankName: '',
    phone: "",
  })
  const existingBankAccount = reactive({
    bkash: false,
    rocket: false,
    nagad: false,
  })
  const myWithdrawalMethodeList = ref(null)
  const myWithdrawalMethodeListLoading = ref(false)
  const openWithdrawalMethodeDialog = ref(false)

  const withdrawalMethodeDialogManagerBkash = () => {
    openWithdrawalMethodeDialog.value = true
    withdrawalMethodeInfo.id = null
    withdrawalMethodeInfo.mobileBankName = 'Bkash (Personal)'
    withdrawalMethodeInfo.phone = ""
  }
  const withdrawalMethodeDialogManagerRocket = () => {
    openWithdrawalMethodeDialog.value = true
    withdrawalMethodeInfo.id = null
    withdrawalMethodeInfo.mobileBankName = 'Rocket (Personal)'
    withdrawalMethodeInfo.phone = ""
  }
  const withdrawalMethodeDialogManagerNagad = () => {
    openWithdrawalMethodeDialog.value = true
    withdrawalMethodeInfo.id = null
    withdrawalMethodeInfo.mobileBankName = 'Nagad (Personal)'
    withdrawalMethodeInfo.phone = ""
  }

  const getMyWithdrawalMethodeList = async () => {
    const config = {
      method: "get",
      url: "api/withdrawal_methode",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    myWithdrawalMethodeListLoading.value = true
    CustomLoading('get-withdrawalMethode-user').showLoading()
    try {
      const responseData = await api.request(config);
      myWithdrawalMethodeList.value = responseData.data;

      responseData.data.forEach(e=>{
        if(e.mobileBankName == 'Bkash (Personal)'){
          existingBankAccount.bkash = true
        }
        if(e.mobileBankName == 'Rocket (Personal)'){
          existingBankAccount.rocket = true
        }
        if(e.mobileBankName == 'Nagad (Personal)'){
          existingBankAccount.nagad = true
        }
      })

      CustomLoading('get-withdrawalMethode-user').hideLoading()
      myWithdrawalMethodeListLoading.value = false
    } catch (error) {
      console.log(error);
      CustomLoading('get-withdrawalMethode-user').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Couldn't get withdrawalMethode list",
      });
      myWithdrawalMethodeListLoading.value = false
    }
  }
  const createWithdrawalMethode = async () => {
    const data = withdrawalMethodeInfo
    const config = {
      method: "post",
      url: "api/withdrawal_methode",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      },data
    };
    CustomLoading('create-withdrawalMethode_methode').showLoading()
    try {
      const responseData = await api.request(config);
      getMyWithdrawalMethodeList()
      openWithdrawalMethodeDialog.value = false
      CustomLoading('create-withdrawalMethode_methode').hideLoading()
      Notify.create({
        position: "center",
        type: "positive",
        message: "Successfully created withdrawalMethode",
      });
    } catch (error) {
      console.log(error);
      CustomLoading('create-withdrawalMethode_methode').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Failed to delete withdrawalMethode",
      });
    }
  }
  const deleteWithdrawalMethode = async (withdrawalMethodeId) => {
    const config = {
      method: "patch",
      url: "api/withdrawal_methode/" + withdrawalMethodeId,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`
      }
    };
    CustomLoading('delete-withdrawalMethode_methode').showLoading()
    try {
      const responseData = await api.request(config);
      getMyWithdrawalMethodeList()
      CustomLoading('delete-withdrawalMethode_methode').hideLoading()
      Notify.create({
        position: "center",
        type: "positive",
        message: "Successfully deleted withdrawalMethode",
      });
    } catch (error) {
      console.log(error);
      CustomLoading('delete-withdrawalMethodes').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Failed to delete withdrawalMethode",
      });
    }
  }
  return {
    withdrawalMethodeInfo,
    myWithdrawalMethodeList,
    existingBankAccount,
    getMyWithdrawalMethodeList,
    myWithdrawalMethodeListLoading,
    openWithdrawalMethodeDialog,
    withdrawalMethodeDialogManagerBkash,
    withdrawalMethodeDialogManagerRocket,
    withdrawalMethodeDialogManagerNagad,
    deleteWithdrawalMethode,
    createWithdrawalMethode
  }
});
