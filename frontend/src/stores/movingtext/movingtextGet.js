
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import {  ref } from 'vue';
loader.title = 'Requesting To Server...'
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
    try {
      const responseData = await api.request(config);
      movingTextData.value = responseData.data[0]
    } catch (error) {
      console.log(error);
    }
  }
  return {
    movingTextData,
    getMovingTextData,
  }
});
