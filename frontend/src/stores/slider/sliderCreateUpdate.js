
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { ref, reactive } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
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
    CustomLoading('post-sliders').showLoading()
    try {
      const responseData = await api.request(config);
      CustomLoading('post-sliders').hideLoading()
      Notify.create({
        message: "Successfully Created Banner Image"
      })
    } catch (error) {
      console.log(error);
      CustomLoading('post-sliders').hideLoading()
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
    CustomLoading('put-sliders').showLoading()
    try {
      const responseData = await api.request(config);
      CustomLoading('put-sliders').hideLoading()
      Notify.create({
        message: "Successfully Updated Banner Image",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      CustomLoading('put-sliders').hideLoading()
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
    CustomLoading('upload-image-sliders').showLoading()
    try {
      const responseData = await api.request(config);
      sliderInfo[slidercount][imageposition] = responseData.data
      CustomLoading('upload-image-sliders').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('upload-image-sliders').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
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
    CustomLoading('get-image-sliders').showLoading()
    try {
      const responseData = await api.request(config);
      sliderInfo.id = responseData.data[0]._id
      sliderInfo.slider1 = responseData.data[0].slider1
      sliderInfo.slider2 = responseData.data[0].slider2
      sliderInfo.slider3 = responseData.data[0].slider3
      sliderInfo.slider4 = responseData.data[0].slider4
      CustomLoading('get-image-sliders').hideLoading()
    } catch (error) {
      CustomLoading('get-image-sliders').hideLoading()
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
