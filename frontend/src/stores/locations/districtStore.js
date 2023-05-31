import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { encode64 } from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { useDivisionStore } from './divisionStore';
const suggestUserData = useLocalStorage('proyojonuserkey', {})
const loginUser = useLocalStorage('proyojonloginuser', {})
const locationListGlobal = useLocalStorage('global-location-list', {})
loader.title = 'Requesting To Server...'
export const useDistrictStore = defineStore('district store', () => {

  const router = useRouter(),
    authStore = useAuthStore(),
    divisionStore = useDivisionStore(),
    openDistrictCreateDialog = ref(false),
    openDistrictEditDialog = ref(false),
    allDistricts = ref([]),
    allDistrictsLoading = ref(false),
    districtListLoading = ref(false),
    districtList = ref({
      page:1,
      pages:1,
      districts:[]
    }),
    districtInfo = reactive({
      id: null,
      name: {
        bn: null,
        en: null
      },
      parent: {
        id: null,
        name: {
          bn: null,
          en: null
        }
      }
    })
  const openDistrictEditDialogManager = (data) => {
    openDistrictEditDialog.value = true
    districtInfo.id = data._id
    districtInfo.name = data.name
    districtInfo.parent = divisionStore.divisionList.divisions.filter(e => e._id == data.parent._id)[0]
  }
  const districtPage = ref(1)
  const getDistrictList = async () => {
    districtListLoading.value = true
    const params = {
      pageNumber: districtPage.value
    }
    districtList.value.districts = locationListGlobal.value.districts
  }
  const getGlobalDistricts = async () => {
    allDistrictsLoading.value = true
    const config = {
      method: "get",
      url: "api/districts/all",
      headers: {
        "Content-Type": "application/json"
      },

    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      locationListGlobal.value.districts = responseData.data;
      loader.hideLoader()
      getDistrictList()
      allDistrictsLoading.value = false
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      allDistrictsLoading.value = false
    }
  }
  const getAllDistricts = async (id) => {
    if (id) {
      districtList.value.districts = allDistricts.value = locationListGlobal.value.districts.filter(e=>{
        return e.parent._id === id
      })
    }else{
      districtList.value.districts = allDistricts.value = locationListGlobal.value.districts
    }
  }
  const createNewDistrict = async () => {
    const data = districtInfo
    const config = {
      method: "post",
      url: "api/districts",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      },
      data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openDistrictCreateDialog.value = false
      getGlobalDistricts()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const updateDistrict = async () => {
    const data = {}
    if (districtInfo.name.en && districtInfo.name.bn) {
      data.name = districtInfo.name
    }
    if (districtInfo.parent instanceof Object) {
      if (districtInfo.parent._id && districtInfo.parent.name.en && districtInfo.parent.name.bn) {
        data.parent = districtInfo.parent
      }
    }
    const config = {
      method: "put",
      url: "api/districts/" + districtInfo.id + "/",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      },
      data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openDistrictEditDialog.value = false
      getGlobalDistricts()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const deleteDistrict = async () => {
    const config = {
      method: "delete",
      url: "api/districts/" + districtInfo.id + "/",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openDistrictEditDialog.value = false
      getGlobalDistricts()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  return {
    // dialogs states
    openDistrictCreateDialog,
    openDistrictEditDialog,
    openDistrictEditDialogManager,
    // all districts states, functions
    getAllDistricts,
    allDistrictsLoading,
    allDistricts,
    //  districts states, functions
    districtPage,
    districtList,
    districtListLoading,
    districtInfo,
    getGlobalDistricts,
    getDistrictList,
    //  districts create, update, delete functions
    createNewDistrict,
    updateDistrict,
    deleteDistrict
  }
});
