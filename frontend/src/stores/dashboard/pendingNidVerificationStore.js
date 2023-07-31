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
import { usePendingForApprovalListCountStore } from "src/stores/dashboard/pendingForApprovalListCountStore";

loader.title = 'Requesting To Server...'
export const usePendingNidVerificationStore = defineStore('pending nid verification store', () => {
  const pendingForApprovalListCountStore = usePendingForApprovalListCountStore();
  const currentPage = ref(1)
  const rejectNote = ref("Please make sure you have paid correct amount or the transaction id is correct")
  const pendingNidVerificationList = ref(null)
  const pendingNidVerificationListLoading = ref(false)

  const getPendingNidVerificationList = async () => {
    CustomLoading('pending-nid-verification-list').showLoading()
    const config = {
      method: "get",
      url: "api/users/pending_verification",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, params: {
        pageSize: 30,
        pageNumber: currentPage.value
      }
    };
    pendingNidVerificationListLoading.value = true
    // loader.showLoader()
    try {
      const responseData = await api.request(config);
      pendingNidVerificationList.value = responseData.data;
      // loader.hideLoader()
      pendingNidVerificationListLoading.value = false

    CustomLoading('pending-nid-verification-list').hideLoading()
  } catch (error) {
    console.log(error);
    // loader.hideLoader()
    CustomLoading('pending-nid-verification-list').hideLoading()
    Notify.create({
        position: "center",
        type: "negative",
        message: "Couldn't get payment list",
      });
      pendingNidVerificationListLoading.value = false
    }
  }
  const approveNid = async (id) => {
    const config = {
      method: "put",
      url: "api/users/pending_verification/" + id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data: {
        nidStatus: 'approved',
        nidVerified: true,
        note: '',
      }
    };
    pendingNidVerificationListLoading.value = true
    CustomLoading('put-pending-verification').showLoading()
    try {
      const responseData = await api.request(config);
      pendingNidVerificationList.value = responseData.data;
      CustomLoading('put-pending-verification').hideLoading()
      pendingNidVerificationListLoading.value = false
      pendingForApprovalListCountStore.getPendingCount()
    } catch (error) {
      console.log(error);
      CustomLoading('put-pending-verification').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Couldn't get payment list",
      });
      pendingNidVerificationListLoading.value = false
    }
  }
  const rejectNid = async (id) => {
    const config = {
      method: "put",
      url: "api/users/pending_verification/" + id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data: {
        nidStatus: 'rejected',
        nidVerified: false,
        note: rejectNote.value,
      }
    };
    pendingNidVerificationListLoading.value = true
    CustomLoading('put-users-pendinglist').showLoading()
    try {
      const responseData = await api.request(config);
      pendingNidVerificationList.value = responseData.data;
      CustomLoading('put-users-pendinglist').hideLoading()
      pendingNidVerificationListLoading.value = false
      pendingForApprovalListCountStore.getPendingCount()
    } catch (error) {
      console.log(error);
      CustomLoading('put-users-pendinglist').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Couldn't get payment list",
      });
      pendingNidVerificationListLoading.value = false
    }
  }
  return {
    currentPage,
    rejectNote,
    pendingNidVerificationList,
    pendingNidVerificationListLoading,
    getPendingNidVerificationList,
    approveNid,
    rejectNid
  }
});
