
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { ref, reactive } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
loader.title = 'Requesting To Server...'
export const usePublicSliderCreateUpdateStore = defineStore('public slider create Update store', () => {
  const authStore = useAuthStore()
  const sliderInfo = reactive({
    id: "",
    slider1: [],
    slider2: [],
    slider3: [],
    slider4: [],
  })
  const createSliders = async () => {
    const data = { ...sliderInfo }

    const config = {
      method: "post",
      url: "api/sliders",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      loader.hideLoader()
      Notify.create({
        message: "Successfully Created Banner Image"
      })
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        message: "Failed to Create Banner Image"
      })
    }
  }
  const updateSlider = async () => {
    const data = { ...sliderInfo }

    const config = {
      method: "put",
      url: "api/sliders/" + sliderInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      loader.hideLoader()
      Notify.create({
        message: "Successfully Updated Banner Image",
        type: "positive",
        position:"center"
      })
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const uploadSliderImage = async (slidercount, imageposition) => {
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
