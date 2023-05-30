import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { encode64 } from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
const locationListGlobal = useLocalStorage('global-location-list', {})
loader.title = 'Requesting To Server...'
export const useWardStore = defineStore('ward store', () => {

  const router = useRouter(),
    authStore = useAuthStore(),
    openWardCreateDialog = ref(false),
    openWardEditDialog = ref(false),
    allWards = ref(null),
    allWardsLoading = ref(false),
    wardListLoading = ref(false),
    wardList = ref({
      page:1,
      pages:1,
      wards:[]
    }),
    wardInfo = reactive({
      id: null,
      name: {
        bn: null,
        en: null
      },
      parent: null,
    })
  const openWardEditDialogManager = (data) => {
    openWardEditDialog.value = true
    wardInfo.id = data._id
    wardInfo.name = data.name
    wardInfo.parent = data.parent
  }
  const wardPage = ref(1)
  const getWardList = async () => {
    wardListLoading.value = true
    const params = {
      pageNumber: wardPage.value
    }

      wardList.value.wards = locationListGlobal.value.wards;

  }
  const getGlobalWards = async () => {
    const config = {
      method: "get",
      url: "api/wards/all",
      headers: {
        "Content-Type": "application/json"
      },
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      locationListGlobal.value.wards = responseData.data;
      getWardList()
      loader.hideLoader()
      allWardsLoading.value = false
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      allWardsLoading.value = false
    }

  }
  const getAllWards = async (id) => {
    const params = {}
    if (id) {
      allWards.value = locationListGlobal.value.wards.filter(e=>{
        return e.parent._id === id
      })
    }else{
      allWards.value = locationListGlobal.value.wards
    }

  }
  const createNewWard = async () => {
    const data = wardInfo
    const config = {
      method: "post",
      url: "api/wards",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      },
      data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openWardCreateDialog.value = false
      getGlobalWards()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const updateWard = async () => {
    const data = {}
    if (wardInfo.name.en && wardInfo.name.bn) {
      data.name = wardInfo.name
    }
    if (wardInfo.parent instanceof Object) {
      if (wardInfo.parent._id && wardInfo.parent.name.en && wardInfo.parent.name.bn) {
        data.parent = wardInfo.parent
      }
    }
    const config = {
      method: "put",
      url: "api/wards/" + wardInfo.id + "/",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      },
      data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openWardEditDialog.value = false
      getGlobalWards()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const deleteWard = async () => {
    const config = {
      method: "delete",
      url: "api/wards/" + wardInfo.id + "/",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getGlobalWards()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  return {
    // dialogs states
    openWardCreateDialog,
    openWardEditDialog,
    openWardEditDialogManager,
    // all wards states, functions
    allWardsLoading,
    getAllWards,
    getGlobalWards,
    allWards,
    // wards states, functions
    wardListLoading,
    wardPage,
    wardList,
    wardInfo,
    getWardList,
    // wards create, update, delete functions
    createNewWard,
    updateWard,
    deleteWard
  }
});
