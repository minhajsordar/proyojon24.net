import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { encode64 } from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { useWardStore } from './wardStore';
import { usePublicUserStore } from '../user/publicStore';
import { unions } from "src/global_js/staticLocation"
import { Notify } from 'quasar';
import { Loading, QSpinnerIos } from "quasar";
import { CustomLoading } from 'src/global_js/loadiingApi';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
const locationListGlobal = useLocalStorage('global-location-list', {})
const browsingLocation = useLocalStorage('browsing-location', {})
loader.title = 'Requesting To Server...'
export const useUnionStore = defineStore('union store', () => {

  const router = useRouter(),
    authStore = useAuthStore(),
    publicUserStore = usePublicUserStore(),
    wardStore = useWardStore(),
    openUnionCreateDialog = ref(false),
    openUnionEditDialog = ref(false),
    allUnions = ref([]),
    allUnionsLoading = ref(false),
    unionListLoading = ref(false),
    unionList = ref({
      page: 1, pages: 1,
      unions: []
    }),
    unionInfo = reactive({
      id: null,
      name: {
        bn: null,
        en: null
      },
      parent: null,
    })
  const openUnionEditDialogManager = (data) => {
    openUnionEditDialog.value = true
    unionInfo.id = data._id
    unionInfo.name = data.name
    unionInfo.parent = data.parent
  }
  const unionPage = ref(1)
  const getUnionList = async () => {
    unionListLoading.value = true
    const params = {
      pageNumber: unionPage.value
    }
    unionList.value.unions = unions

  }
  const getUnionListFromServer = async () => {
    unionListLoading.value = true
    const params = {
      pageNumber: unionPage.value
    }
    if (browsingLocation.value?.subDistrict) {
      params.subDistrictId = browsingLocation.value?.subDistrict?._id
    }
    // unionList.value.unions = unions
    const config = {
      method: "get",
      url: "api/unions/all",
      headers: {
        "Content-Type": "application/json"
      },
      params
    };
    CustomLoading('get-all-union-list').showLoading()
    try {
      const responseData = await api.request(config);
      unionList.value = responseData.data;
      CustomLoading('get-all-union-list').hideLoading()
      unionListLoading.value = false
    } catch (error) {
      console.log(error);
      CustomLoading('get-all-union-list').hideLoading()
      unionListLoading.value = false

    }
  }
  const getUnionListByBrowsingSubDistrictId = async () => {
    unionListLoading.value = true
    const params = {
      pageNumber: unionPage.value
    }
    unionList.value.unions = unions.filter(e => {
      if (browsingLocation.value.subDistrict) {
        return e.parent._id === browsingLocation.value.subDistrict._id
      } else {
        return true
      }
    })
  }
  const getGlobalUnions = async () => {
    allUnionsLoading.value = true
    const config = {
      method: "get",
      url: "api/unions/all",
      headers: {
        "Content-Type": "application/json"
      },
    };
    CustomLoading('get-all-unions').showLoading()
    try {
      const responseData = await api.request(config);
      locationListGlobal.value.unions = responseData.data;
      CustomLoading('get-all-unions').hideLoading()
      allUnionsLoading.value = false
    } catch (error) {
      console.log(error);
      CustomLoading('get-all-unions').hideLoading()
      allUnionsLoading.value = false

    }
  }
  const getAllUnions = async (id) => {
    if (id) {
      unionListLoading.value = true
      const params = {
        pageSize: 500
      }
      params.subDistrictId = id
      // unionList.value.unions = unions
      const config = {
        method: "get",
        url: "api/unions/all",
        headers: {
          "Content-Type": "application/json"
        },
        params
      };
      CustomLoading('get-all-union-list').showLoading()
      try {
        const responseData = await api.request(config);
        allUnions.value = responseData.data.unions;
        CustomLoading('get-all-union-list').hideLoading()
        unionListLoading.value = false
      } catch (error) {
        console.log(error);
        CustomLoading('get-all-union-list').hideLoading()
        unionListLoading.value = false

      }
    } else {
      // allUnions.value = unions
    }

  }
  const createNewUnion = async () => {
    const data = unionInfo
    const config = {
      method: "post",
      url: "api/unions",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      },
      data
    };
    CustomLoading('post-union').showLoading()
    try {
      const responseData = await api.request(config);
      openUnionCreateDialog.value = false
      // getUnionList()
      getUnionListFromServer()
      wardStore.getGlobalWards()
      CustomLoading('post-union').hideLoading()
      Notify.create({
        message: "Successfully Created a union/powroshova",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      CustomLoading('post-union').hideLoading()
      Notify.create({
        message: "Failed Created a union/powroshova",
        type: "negative",
        position: "center"
      })
    }
  }
  const updateUnion = async () => {
    const unionInfoKeys = [
      "name",
      "parent",
    ]
    const data = {}

    if (unionInfo.name.en && unionInfo.name.bn) {
      data.name = unionInfo.name
    }
    if (unionInfo.parent instanceof Object) {
      if (unionInfo.parent._id && unionInfo.parent.name.en && unionInfo.parent.name.bn) {
        data.parent = unionInfo.parent
      }
    }
    const config = {
      method: "put",
      url: "api/unions/" + unionInfo.id + "/",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      },
      data
    };
    CustomLoading('put-unions').showLoading()
    try {
      const responseData = await api.request(config);
      openUnionEditDialog.value = false
      getUnionListFromServer()
      CustomLoading('put-unions').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('put-unions').hideLoading()
    }
  }
  const deleteUnion = async () => {
    const config = {
      method: "delete",
      url: "api/unions/" + unionInfo.id + "/",
      headers: {
        "Authorization": `Bearer ${loginUser.value.token}`,
        "Content-Type": "application/json"
      }
    };
    CustomLoading('delete-unions').showLoading()
    try {
      const responseData = await api.request(config);
      // getUnionList()
      getUnionListFromServer()
      CustomLoading('delete-unions').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('delete-unions').hideLoading()
    }
  }
  return {
    // dialogs states
    openUnionCreateDialog,
    openUnionEditDialog,
    openUnionEditDialogManager,
    // all unions states, functions
    getUnionListByBrowsingSubDistrictId,
    allUnionsLoading,
    getGlobalUnions,
    getAllUnions,
    allUnions,
    // unions states, functions
    unionListLoading,
    unionPage,
    unionList,
    unionInfo,
    getUnionList,
    getUnionListFromServer,
    // union create, update, delete functions
    createNewUnion,
    updateUnion,
    deleteUnion,
  }
});
