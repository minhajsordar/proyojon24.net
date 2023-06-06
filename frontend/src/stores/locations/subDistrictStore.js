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
const locationListGlobal = useLocalStorage('global-location-list', {})
const browsingLocation = useLocalStorage('browsing-location', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useSubDistrictStore = defineStore('sub district store', () => {

  const router = useRouter(),
    authStore = useAuthStore(),
    publicUserStore = usePublicUserStore(),
    openSubDistrictCreateDialog = ref(false),
    openSubDistrictEditDialog = ref(false),
    allSubDistricts = ref([]),
    subDistrictList = ref({
      page: 1,
      pages: 1,
      subDistricts: []
    }),
    subDistrictInfo = reactive({
      id: null,
      name: {
        bn: null,
        en: null
      },
      parent: null,
    })
  const openSubDistrictEditDialogManager = (data) => {
    openSubDistrictEditDialog.value = true
    subDistrictInfo.id = data._id
    subDistrictInfo.name = data.name
    subDistrictInfo.parent = data.parent
  }
  const subDistrictPage = ref(1)
  const getSubDistrictList = async () => {
    const params = {
      pageNumber: subDistrictPage.value
    }
    subDistrictList.value.subDistricts = locationListGlobal.value.subDistricts;

  }
  const getSubDistrictListByBrowsingDistrictId = async () => {
    const params = {
      pageNumber: subDistrictPage.value
    }
    subDistrictList.value.subDistricts = locationListGlobal.value.subDistricts.filter(e => {
      if(browsingLocation.value.district){
        return e.parent._id === browsingLocation.value.district._id
      }else{
        return true
      }
    })

  }
  const getGlobalSubDistricts = async () => {
    const config = {
      method: "get",
      url: "api/subdistricts/all",
      headers: {
        "Content-Type": "application/json"
      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      locationListGlobal.value.subDistricts = responseData.data;
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()

    }

  }
  const getAllSubDistricts = async (id) => {

    if (id) {
      allSubDistricts.value = locationListGlobal.value.subDistricts.filter(e => {
        return e.parent._id === id
      })
    } else {
      allSubDistricts.value = locationListGlobal.value.subDistricts
    }

  }
  const createNewSubDistrict = async () => {
    const data = subDistrictInfo
    const config = {
      method: "post",
      url: "api/subdistricts",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      },
      data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openSubDistrictCreateDialog.value = false
      getGlobalSubDistricts()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const updateSubDistrict = async () => {
    const subDistrictInfoKeys = [
      "name",
    ]
    const data = {}
    if (subDistrictInfo.name.en && subDistrictInfo.name.bn) {
      data.name = subDistrictInfo.name
    }
    if (subDistrictInfo.parent instanceof Object) {
      if (subDistrictInfo.parent._id && subDistrictInfo.parent.name.en && subDistrictInfo.parent.name.bn) {
        data.parent = subDistrictInfo.parent
      }
    }
    const config = {
      method: "put",
      url: "api/subdistricts/" + subDistrictInfo.id + "/",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      },
      data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openSubDistrictEditDialog.value = false
      getGlobalSubDistricts()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const deleteSubDistrict = async () => {
    const config = {
      method: "delete",
      url: "api/subdistricts/" + subDistrictInfo.id + "/",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getGlobalSubDistricts()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  return {
    openSubDistrictCreateDialog,
    openSubDistrictEditDialog,
    openSubDistrictEditDialogManager,
    getSubDistrictListByBrowsingDistrictId,
    getAllSubDistricts,
    allSubDistricts,
    subDistrictPage,
    subDistrictList,
    subDistrictInfo,
    getGlobalSubDistricts,
    getSubDistrictList,
    createNewSubDistrict,
    updateSubDistrict,
    deleteSubDistrict
  }
});
