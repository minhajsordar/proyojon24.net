import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { encode64 } from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { usePublicUserStore } from '../user/publicStore';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
const browsingLocation = useLocalStorage('browsing-location', {})
const locationListGlobal = useLocalStorage('global-location-list', {})
loader.title = 'Requesting To Server...'
export const usePinlocationStore = defineStore('pinlocation store', () => {

  const router = useRouter(),
    authStore = useAuthStore(),
    publicUserStore = usePublicUserStore(),
    openPinlocationCreateDialog = ref(false),
    openPinlocationEditDialog = ref(false),
    allPinlocations = ref(null),
    allPinlocationsLoading = ref(false),
    pinlocationListLoading = ref(false),
    pinlocationList = ref({
      page:1,
      pages:1,
      pinlocations:[]
    }),
    pinlocationInfo = reactive({
      id: null,
      name: {
        bn: null,
        en: null
      },
      parent: null,
    })
  const openPinlocationEditDialogManager = (data) => {
    openPinlocationEditDialog.value = true
    pinlocationInfo.id = data._id
    pinlocationInfo.name = data.name
    pinlocationInfo.parent = data.parent
  }
  const pinlocationPage = ref(1)
  const getPinlocationList = async () => {
    pinlocationListLoading.value = true
    const params = {
      pageNumber: pinlocationPage.value
    }
      pinlocationList.value.pinlocations = locationListGlobal.value.pinlocations;

  }
  const getPinlocationListByBrowsingUnionId = async () => {
    pinlocationListLoading.value = true
    const params = {
      pageNumber: pinlocationPage.value
    }
    pinlocationList.value.pinlocations = locationListGlobal.value.pinlocations.filter(e=>{
      if(browsingLocation.value.union){
        return e.parent._id === browsingLocation.value.union._id
      }else{
        return true
      }
      })

  }
  const getGlobalPinlocations = async () => {
    const config = {
      method: "get",
      url: "api/pinlocations/all",
      headers: {
        "Content-Type": "application/json"
      },
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      locationListGlobal.value.pinlocations = responseData.data;
      loader.hideLoader()
      allPinlocationsLoading.value = false
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      allPinlocationsLoading.value = false
    }

  }
  const getAllPinlocations = async (id) => {
    const params = {}
    if (id && id != undefined) {
      allPinlocations.value = locationListGlobal.value.pinlocations.filter(e=>{
        return e.parent._id === id
      })
    }else{
      allPinlocations.value = locationListGlobal.value.pinlocations
    }

  }
  const createNewPinlocation = async () => {
    const data = pinlocationInfo
    const config = {
      method: "post",
      url: "api/pinlocations",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      },
      data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openPinlocationCreateDialog.value = false
      getGlobalPinlocations()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const updatePinlocation = async () => {
    const data = {}
    if (pinlocationInfo.name.en && pinlocationInfo.name.bn) {
      data.name = pinlocationInfo.name
    }
    if (pinlocationInfo.parent instanceof Object) {
      if (pinlocationInfo.parent._id && pinlocationInfo.parent.name.en && pinlocationInfo.parent.name.bn) {
        data.parent = pinlocationInfo.parent
      }
    }
    const config = {
      method: "put",
      url: "api/pinlocations/" + pinlocationInfo.id + "/",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      },
      data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openPinlocationEditDialog.value = false
      getGlobalPinlocations()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const deletePinlocation = async () => {
    const config = {
      method: "delete",
      url: "api/pinlocations/" + pinlocationInfo.id + "/",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getGlobalPinlocations()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  return {
    // dialogs states
    openPinlocationCreateDialog,
    openPinlocationEditDialog,
    openPinlocationEditDialogManager,
    // all Pinlocations states, functions
    getPinlocationListByBrowsingUnionId,
    allPinlocationsLoading,
    getAllPinlocations,
    getGlobalPinlocations,
    allPinlocations,
    // wards states, functions
    pinlocationListLoading,
    pinlocationPage,
    pinlocationList,
    pinlocationInfo,
    getPinlocationList,
    // pinlocations create, update, delete functions
    createNewPinlocation,
    updatePinlocation,
    deletePinlocation
  }
});
