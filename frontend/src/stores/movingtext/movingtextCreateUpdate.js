
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { ref, reactive } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
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
    try {
      const responseData = await api.request(config);
      movingTextData.value = responseData.data
      if (responseData.data.length > 0) {
        movingText.value = responseData.data[0].announcement
        speed.value = responseData.data[0].speed
      }
    } catch (error) {
      console.log(error);
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
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      movingTextData.value[0] = responseData.data
      loader.hideLoader()
      Notify.create({
        message: "Successfully Created Moving Text",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      loader.hideLoader()
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
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      movingTextData.value[0] = responseData.data
      loader.hideLoader()
      Notify.create({
        message: "Successfully Updated Moving Text",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      loader.hideLoader()
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
