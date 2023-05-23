import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { useServiceStore } from './serviceStore';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useServiceProviderStore = defineStore('service provider store', () => {
  const router = useRouter(),
    authStore = useAuthStore(),
    serviceStore = useServiceStore(),
    openServiceProviderCreateDialog = ref(false),
    openServiceProviderEditDialog = ref(false),
    openServiceProviderPreviewDialog = ref(false),
    imageIcon = ref(null),
    imageCover = ref(null),
    selectedServiceCategory = ref(null),
    filteredByServiseId = ref(null),
    filteredByServiseCategoryId = ref(null),
    serviceProviderLocationR = reactive({
      division: null,
      district: null,
      subDistrict: null,
      union: null,
      ward:null,
    }),
    serviceProviderList = ref([]),
    serviceProviderInfo = reactive({
      id: null,
      user: null,
      name: {
        bn: null,
        en: null
      },
      description: {
        bn: null,
        en: null
      },
      serviceImage: null,
      serviceCategory: null,
      service: null,
      image: null,
      rankCount: 0,
      serviceProviderLocation: {
        division: {
          bn: null,
          en: null
        },
        district: {
          bn: null,
          en: null
        },
        subDistrict: {
          bn: null,
          en: null
        },
        union: {
          bn: null,
          en: null
        },
        ward: {
          bn: null,
          en: null
        },
      },
      degree: {
        bn: null,
        en: null,
      },
      extraCources: {
        bn: null,
        en: null,
      },
      serviceTitle: {
        bn: null,
        en: null,
      },
      serviceList: {
        bn: null,
        en: null,
      },
      specialties: {
        bn: null,
        en: null,
      },
      phoneNumber: [{
        bn: null,
        en: null,
      }],
      keywords: null,
    })
  const emptyServiceProviderInfo = () => {
    imageIcon.value = null
    imageCover.value = null
    serviceProviderInfo.user = null
    serviceProviderInfo.name = {
      bn: null,
      en: null,
    }
    serviceProviderInfo.description = {
      bn: null,
      en: null,
    }
    serviceProviderInfo.serviceImage = null
    serviceProviderInfo.image = null
    serviceProviderInfo.serviceCategory = null
    serviceProviderInfo.rankCount = 0
    serviceProviderInfo.serviceProviderLocation = {
      division: {
        bn: null,
        en: null
      },
      district: {
        bn: null,
        en: null
      },
      subDistrict: {
        bn: null,
        en: null
      },
      union: {
        bn: null,
        en: null
      },
      ward: {
        bn: null,
        en: null
      },
    }
    serviceProviderInfo.degree = {
      bn: null,
      en: null,
    }
    serviceProviderInfo.extraCources = {
      bn: null,
      en: null,
    }
    serviceProviderInfo.serviceTitle = {
      bn: null,
      en: null,
    }
    serviceProviderInfo.serviceList = [{
      bn: null,
      en: null,
    }]
    serviceProviderInfo.specialties = {
      bn: null,
      en: null,
    }
    serviceProviderInfo.phoneNumber = [{
      bn: null,
      en: null,
    }]
    serviceProviderInfo.keywords = []
  }
  const openServiceProviderCreateDialogManager = () => {
    emptyServiceProviderInfo()
    openServiceProviderCreateDialog.value = true
  }
  const openServiceProviderEditDialogManager = (data) => {
    const serviceProviderInfoKeys = [
      "name",
    ]
    openServiceProviderEditDialog.value = true
    serviceProviderInfo.id = data?._id
    serviceProviderInfoKeys.forEach((keys, index) => {
      serviceProviderInfo[keys] = data[keys]
    })
    serviceProviderInfo.service = serviceStore.serviceList.services.filter(e => e._id == serviceProviderInfo.service)[0]
    imageCover.value = { name: serviceProviderInfo.coverImage }
    imageIcon.value = { name: serviceProviderInfo.icon }
  }
  const openServiceProviderPreviewDialogManager = (data) => {

    const serviceProviderInfoKeys = [
      "user",
      "name",
      "description",
      "serviceImage",
      "image",
      "serviceCategory",
      "rankCount",
      "serviceProviderLocation",
      "degree",
      "extraCources",
      "serviceTitle",
      "serviceList",
      "specialties",
      "phoneNumber",
      "keywords"
    ]
    openServiceProviderPreviewDialog.value = true
    serviceProviderInfo.id = data?._id
    serviceProviderInfoKeys.forEach((keys, index) => {
      serviceProviderInfo[keys] = data[keys]
    })
    serviceProviderInfo.service = serviceStore.serviceList.services.filter(e => e._id == serviceProviderInfo.service)[0]
  }
  const getServiceProviderList = async () => {
    const config = {
      method: "get",
      url: "api/service_providers/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      responseData.data.serviceProviders.sort((a, b) => a.order - b.order);
      serviceProviderList.value = responseData.data;
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const getFilteredServiceProviderByServiceCategory = async () => {
    const config = {
      method: "get",
      url: "api/service_providers/service_category/" + filteredByServiseCategoryId.value._id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      responseData.data.serviceProviders.sort((a, b) => a.order - b.order);
      serviceProviderList.value = responseData.data;
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const createServiceProvider = async () => {
    if (serviceProviderInfo.service instanceof Object) {
      serviceProviderInfo.service = serviceProviderInfo.service._id
    }
    if (serviceProviderInfo.serviceCategory instanceof Object) {
      serviceProviderInfo.serviceCategory = serviceProviderInfo.serviceCategory._id
    }
    serviceProviderInfo.serviceProviderLocation.division = serviceProviderLocationR.division.name
    serviceProviderInfo.serviceProviderLocation.district = serviceProviderLocationR.district.name
    serviceProviderInfo.serviceProviderLocation.subDistrict = serviceProviderLocationR.subDistrict.name
    serviceProviderInfo.serviceProviderLocation.union = serviceProviderLocationR.union.name
    serviceProviderInfo.serviceProviderLocation.ward = serviceProviderLocationR.ward.name
    const data = serviceProviderInfo
    const config = {
      method: "post",
      url: "api/service_providers",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openServiceProviderCreateDialog.value = false
      getServiceProviderList()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const uploadIcon = async () => {
    if (!imageIcon.value || typeof imageIcon.value == 'string') {
      return
    }
    const data = serviceProviderInfo.icon
    const config = {
      method: "post",
      url: "api/upload",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }, data: {
        image: imageIcon.value
      }
    };
    try {
      const responseData = await api.request(config);
      serviceProviderInfo.image = responseData.data
    } catch (error) {
      console.log(error);
    }
  }
  const uploadCoverImage = async () => {
    if (!imageCover.value || typeof imageCover.value == 'string') {
      return
    }
    const config = {
      method: "post",
      url: "api/upload",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }, data: {
        image: imageCover.value
      }
    };
    try {
      const responseData = await api.request(config);
      serviceProviderInfo.serviceImage = responseData.data
    } catch (error) {
      console.log(error);
    }
  }
  const updateServiceProvider = async () => {
    const serviceProviderInfoKeys = [
      "name",
      "service",
      "coverImage",
      "icon",
      "order"
    ]
    const data = {}
    serviceProviderInfoKeys.forEach((value, index) => {
      if (serviceProviderInfo[value] instanceof Object) {
        if (serviceProviderInfo[value].bn && serviceProviderInfo[value].bn) {
          data[value] = serviceProviderInfo[value]
        }
      } else if (serviceProviderInfo[value]) {
        data[value] = serviceProviderInfo[value]
      }
    })
    const config = {
      method: "put",
      url: "api/service_Providers/" + serviceProviderInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openServiceProviderEditDialog.value = false
      getServiceProviderList()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const deleteServiceProvider = async () => {
    const config = {
      method: "delete",
      url: "api/service_Providers/" + serviceProviderInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getServiceProviderList()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  return {
    openServiceProviderEditDialog,
    openServiceProviderEditDialogManager,
    openServiceProviderPreviewDialog,
    openServiceProviderPreviewDialogManager,
    openServiceProviderCreateDialog,
    openServiceProviderCreateDialogManager,
    serviceProviderList,
    serviceProviderInfo,
    getServiceProviderList,
    createServiceProvider,
    updateServiceProvider,
    deleteServiceProvider,
    serviceProviderLocationR,
    imageIcon,
    imageCover,
    uploadIcon,
    selectedServiceCategory,
    uploadCoverImage,
    filteredByServiseId,
    filteredByServiseCategoryId,
    getFilteredServiceProviderByServiceCategory
  }
});
