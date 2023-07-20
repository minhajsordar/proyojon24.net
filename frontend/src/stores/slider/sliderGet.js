
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import {  ref } from 'vue';
import { CustomLoading } from 'src/global_js/loadiingApi';
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
    CustomLoading('get-sliders').showLoading()
    try {
      const responseData = await api.request(config);
      sliderData.value = responseData.data[0]
      CustomLoading('get-sliders').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-sliders').hideLoading()
    }
  }
  return {
    sliderData,
    getSliderData,
  }
});
