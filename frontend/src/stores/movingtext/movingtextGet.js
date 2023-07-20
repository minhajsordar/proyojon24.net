
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import {  ref } from 'vue';
loader.title = 'Requesting To Server...'
import { CustomLoading } from 'src/global_js/loadiingApi';
export const useMovingTextStore = defineStore('moving text store', () => {
  const movingTextData = ref(null)
  const getMovingTextData = async () => {
    const config = {
      method: "get",
      url: "api/movingtext",
      headers: {
        "Content-Type": "application/json",
      }
    };
    CustomLoading('get-moving-text').showLoading()
    try {
      const responseData = await api.request(config);
      movingTextData.value = responseData.data[0]
      CustomLoading('get-moving-text').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-moving-text').hideLoading()
    }
  }
  return {
    movingTextData,
    getMovingTextData,
  }
});
