
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import {  ref,reactive } from 'vue';
import { useAuthStore } from '../auth/authStore';
loader.title = 'Requesting To Server...'
export const usePublicSliderCreateUpdateStore = defineStore('public slider create Update store', () => {
  const authStore = useAuthStore()
  const sliderInfo = reactive({
    id:"",
    slider1:[],
    slider2:[],
    slider3:[],
    slider4:[],
  })
  const createSliders = async () => {
    const data = {...sliderInfo}

    const config = {
      method: "post",
      url: "api/sliders",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      },data
    };
    try {
      const responseData = await api.request(config);
    } catch (error) {
      console.log(error);
    }
  }
  const updateSlider = async () => {
    const data = {...sliderInfo}

    const config = {
      method: "put",
      url: "api/sliders/"+sliderInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      },data
    };
    try {
      const responseData = await api.request(config);
    } catch (error) {
      console.log(error);
    }
  }
  const uploadSliderImage = async (slidercount,imageposition) => {
    if (!sliderInfo[slidercount][imageposition] || typeof sliderInfo[slidercount][imageposition] == 'string') {
      return
    }
    const config = {
      method: "post",
      url: "api/upload",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }, data: {
        image: sliderInfo[slidercount][imageposition]
      }
    };
    try {
      const responseData = await api.request(config);
      sliderInfo[slidercount][imageposition] = responseData.data
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
    }
  }

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
      sliderInfo.id = responseData.data[0]._id
      sliderInfo.slider1 = responseData.data[0].slider1
      sliderInfo.slider2 = responseData.data[0].slider2
      sliderInfo.slider3 = responseData.data[0].slider3
      sliderInfo.slider4 = responseData.data[0].slider4
    } catch (error) {
      console.log(error);
    }
  }
  return {
getSliderData,
    sliderInfo,
    createSliders,
    updateSlider,
    uploadSliderImage,
  }
});
