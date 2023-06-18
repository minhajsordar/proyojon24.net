
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import {  ref } from 'vue';
loader.title = 'Requesting To Server...'
export const usePublicSliderStore = defineStore('public slider store', () => {
  const sliderData = ref(null)
  const getSliderData = async () => {
    const config = {
      method: "get",
      url: "api/sliders",
      headers: {
        "Content-Type": "application/json",
      }
    };
    try {
      const responseData = await api.request(config);
      sliderData.value = responseData.data[0]
    } catch (error) {
      console.log(error);
    }
  }
  return {
    sliderData,
    getSliderData,
  }
});
