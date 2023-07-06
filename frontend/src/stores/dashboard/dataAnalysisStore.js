
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { ref, reactive } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
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
    try {
      const responseData = await api.request(config);
      dataAnalysisGraph.value = responseData.data
    } catch (error) {
      console.log(error);
    }
  }
  return {
    dataAnalysisGraph,
    getDataAnalysisGraph,
  }
});
