
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { ref, reactive } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
loader.title = 'Requesting To Server...'
export const useMovingTextCreateUpdateStore = defineStore('moving text create Update store', () => {
  const authStore = useAuthStore()
  const movingText = ref(null)
  const speed = ref(null)
  const movingTextData = ref(null)
  const getMovingText = async () => {
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
      movingTextData.value = responseData.data
      if (responseData.data.length > 0) {
        movingText.value = responseData.data[0].announcement
        speed.value = responseData.data[0].speed
      }
      CustomLoading('get-moving-text').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-moving-text').hideLoading()
    }
  }
  const updateMovingTextManager =()=>{
    if(movingTextData.value.length > 0) {
      updateMovingText()
    }else{
      createMovingText()
    }
  }
  const createMovingText = async () => {
    const data = { announcement: movingText.value, speed: speed.value }

    const config = {
      method: "post",
      url: "api/movingtext",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }, data
    };
    CustomLoading('post-moving-text').showLoading()
    try {
      const responseData = await api.request(config);
      movingTextData.value[0] = responseData.data
      CustomLoading('post-moving-text').hideLoading()
      Notify.create({
        message: "Successfully Created Moving Text",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      CustomLoading('post-moving-text').hideLoading()
      Notify.create({
        message: "Failed to Create Moving Text",
        type: "negative",
        position: "center"
      })
    }
  }
  const updateMovingText = async () => {
    const data = { announcement: movingText.value, speed: speed.value }

    const config = {
      method: "put",
      url: "api/movingtext/" + movingTextData.value[0]._id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }, data
    };
    CustomLoading('put-moving-text').showLoading()
    try {
      const responseData = await api.request(config);
      movingTextData.value[0] = responseData.data
      CustomLoading('put-moving-text').hideLoading()
      Notify.create({
        message: "Successfully Updated Moving Text",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      CustomLoading('put-moving-text').hideLoading()
      Notify.create({
        message: "Failed to Update Moving Text",
        type: "negative",
        position: "center"
      })
    }
  }

  return {
    movingTextData,
    movingText,
    getMovingText,
    updateMovingTextManager,
    speed
  }
});
