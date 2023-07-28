
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { ref, reactive } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
loader.title = 'Requesting To Server...'
export const useDataAnalysisStore = defineStore('data analysis store', () => {
  const authStore = useAuthStore()
  const dataAnalysisGraph = ref(null)
  const getDataAnalysisGraph = async () => {
    const config = {
      method: "get",
      url: "api/dashboard/data_analysis",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo?.token}`
      }
    };
    CustomLoading('get-dashboard-data-analysis').showLoading()
    try {
      const responseData = await api.request(config);
      responseData.data.dailyProfileView.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      responseData.data.monthlyUsers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      responseData.data.dailyUsers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      dataAnalysisGraph.value = responseData.data
      CustomLoading('get-dashboard-data-analysis').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-dashboard-data-analysis').hideLoading()
    }
  }
  return {
    dataAnalysisGraph,
    getDataAnalysisGraph,
  }
});
