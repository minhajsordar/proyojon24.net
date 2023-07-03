import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { encode64 } from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { Notify } from 'quasar';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useUserStore = defineStore('user store', () => {
  const router = useRouter(),
    userList = ref([
      {
        name: {
          bn: 'নুর মোহাম্মাদ',
          en: 'Noor Mohammad'
        },
        email: 'mdnoor@gmail.com',
        phone: '+8801756853831',
        nidNo: '123456789123',
        nidImage: '123456789123',
        presentAddress: {
          bn: 'গোয়ালন্দ',
          en: 'Goalonda'
        },
        permanentAddress: {
          bn: 'গোয়ালন্দ',
          en: 'Goalonda'
        },
        isActive: true,
        permission: 'superAdmin'
      },
      {
        name: {
          bn: 'মিনহাজ সরদার',
          en: 'Minhaj Sorder'
        },
        email: 'minhajsorder8567@gmail.com',
        phone: '+8801835158205',
        nidNo: '123456789123',
        nidImage: '123456789123',
        presentAddress: {
          bn: 'রাজবাড়ী',
          en: 'Rajbari'
        },
        permanentAddress: {
          bn: 'রাজবাড়ী',
          en: 'Rajbari'
        },
        isActive: true,
        permission : 'admin'
      },
      {
        name: {
          bn: 'নুর মোহাম্মাদ',
          en: 'Noor Mohammad'
        },
        email: 'noor@gmail.com',
        phone: '+8801756853831',
        nidNo: '123456789123',
        nidImage: '123456789123',
        presentAddress: {
          bn: 'গোয়ালন্দ',
          en: 'Goalonda'
        },
        permanentAddress: {
          bn: 'গোয়ালন্দ',
          en: 'Goalonda'
        },
        isActive: true,
      },
    ]),
    userInfo = reactive({
      id: null,
      name: {
        bn: null,
        en: null,
      },
      email: null,
      profileImage: null,
      phone: null,
      nidNo: null,
      nidImage: null,
      presentAddress: null,
      permanentAddress: null,
      password: null,
      isActive: true,
      permission: 'self',
    }),
    deleteRequestDialog = ref(false),
    deleteNote = ref(null)
  const getUserList = async () => {
    const config = {
      method: "get",
      url: "api/users/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      userList.value = responseData.data;
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
      loader.hideLoader()
    }
  }
  const createUser = async () => {
    const data = userInfo
    const config = {
      method: "post",
      url: "api/users",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getUserList()
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "positive",
        message: "Successfully Created User",
      });
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "negative",
        message: "Failed To Create User",
      });
    }
  }
  const updateUser = async () => {
    const userInfoKeys = [
      "name",
      "email",
      "profileImage",
      "phone",
      "nidNo",
      "nidImage",
      "presentAddress",
      "permanentAddress",
      "password",
      "isActive",
      "permission"
    ]
    const data = {}
    userInfoKeys.forEach((value,index)=>{
      if(userInfo[value] instanceof Object){
        if(userInfo[value].bn && userInfo[value].bn){
          data[value] = userInfo[value]
        }
      }else if(userInfo[value]){
          data[value] = userInfo[value]

      }
    })
    const config = {
      method: "post",
      url: "api/users/" + userInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getUserList()
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "positive",
        message: "Successfully Updated User",
      });
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
    }
  }
  const deleteUser = async () => {
    const config = {
      method: "delete",
      url: "api/users/" + userInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getUserList()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
      loader.hideLoader()
    }
  }
  const requestDeleteUserProfile = async () => {
    const config = {
      method: "post",
      url: "api/users/delete_request/" + loginUser.value._id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      },body:{
        note: deleteNote.value
      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "positive",
        message: "Your Profile Is Under Review, Once We Confirm Your Profile Will Delete Permanently.",
      });
    } catch (error) {
      loader.hideLoader()
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
    }
  }
  return {
    userList,
    userInfo,
    getUserList,
    requestDeleteUserProfile,
    deleteNote,
    deleteRequestDialog
  }
});
