
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { ref, reactive } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
loader.title = 'Requesting To Server...'
export const usePendingForApprovalListCountStore = defineStore('pending_for_approval_list_count store', () => {
  const authStore = useAuthStore()
  const pendingCount = ref(null)
  const getPendingCount = async () => {
    const config = {
      method: "get",
      url: "api/dashboard/pending_for_approval_list_count",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo?.token}`
      }
    };
    CustomLoading('get-pending-count').showLoading()
    try {
      const responseData = await api.request(config);
      pendingCount.value = responseData.data
      CustomLoading('get-pending-count').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-pending-count').hideLoading()
    }
  }
  return {
    pendingCount,
    getPendingCount,
  }
});
