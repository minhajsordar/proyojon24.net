import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { useServiceStore } from './serviceStore';
import { useServiceCategoryStore } from './serviceCategoryStore';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useServiceProviderStore = defineStore('service provider store', () => {
  const router = useRouter(),
    authStore = useAuthStore(),
    serviceStore = useServiceStore(),
    serviceCategoryStore = useServiceCategoryStore(),
    openServiceProviderCreateDialog = ref(false),
    openServiceProviderEditDialog = ref(false),
    openServiceProviderPreviewDialog = ref(false),
    imageIcon = ref(null),
    imageCover = ref(null),
    selectedServiceCategory = ref(null),
    filteredByServiseId = ref(null),
    filteredByServiseCategoryId = ref(null),
    serviceProviderPage = ref(1),
    serviceProviderLocationR = reactive({
      division: null,
      district: null,
      subDistrict: null,
      union: null,
      ward: null,
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
      rankCount: 1,
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
      phoneNumber: {
        bn: null,
        en: null,
      },
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
    serviceProviderInfo.rankCount = 1
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
      "id",
      "user",
      "name",
      "description",
      "serviceImage",
      "serviceCategory",
      "service",
      "image",
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
    serviceProviderInfoKeys.forEach((keys, index) => {
      serviceProviderInfo[keys] = data[keys]
    })
    serviceProviderInfo.extraCources = {}
    serviceProviderInfo.extraCources = data.extraCources
    console.log(serviceProviderInfo, data)
    serviceProviderInfo.id = data?._id
    serviceProviderInfo.service = serviceStore.serviceList.services.filter(e => e._id == serviceProviderInfo.service)[0]
    serviceProviderInfo.serviceCategory = serviceCategoryStore.serviceCategoryList.serviceCategorys.filter(e => e._id == serviceProviderInfo.serviceCategory)[0]
    imageCover.value = { name: serviceProviderInfo.coverImage }
    imageIcon.value = { name: serviceProviderInfo.icon }
    serviceProviderLocationR.division = data.serviceProviderLocation.division
    serviceProviderLocationR.district = data.serviceProviderLocation.district
    serviceProviderLocationR.subDistrict = data.serviceProviderLocation.subDistrict
    serviceProviderLocationR.union = data.serviceProviderLocation.union
    serviceProviderLocationR.ward = data.serviceProviderLocation.ward
    openServiceProviderEditDialog.value = true
  }
  const openServiceProviderPreviewDialogManager = (data) => {
    const serviceProviderInfoKeys = [
      "id",
      "user",
      "name",
      "description",
      "serviceImage",
      "serviceCategory",
      "service",
      "image",
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
    serviceProviderInfoKeys.forEach((keys, index) => {
      serviceProviderInfo[keys] = data[keys]
    })
    serviceProviderInfo.id = data?._id
    serviceProviderInfo.service = serviceStore.serviceList.services.filter(e => e._id == serviceProviderInfo.service)[0]
    serviceProviderInfo.serviceCategory = serviceCategoryStore.serviceCategoryList.serviceCategorys.filter(e => e._id == serviceProviderInfo.serviceCategory)[0]
    imageCover.value = { name: serviceProviderInfo.coverImage }
    imageIcon.value = { name: serviceProviderInfo.icon }
    serviceProviderLocationR.division = data.serviceProviderLocation.division
    serviceProviderLocationR.district = data.serviceProviderLocation.district
    serviceProviderLocationR.subDistrict = data.serviceProviderLocation.subDistrict
    serviceProviderLocationR.union = data.serviceProviderLocation.union
    serviceProviderLocationR.ward = data.serviceProviderLocation.ward
  }
  const allServiceProvidersList = ref(null)
  const allServiceProvidersListLoading = ref(false)
  const getAllServiceProviders = async (id) => {
    allServiceProvidersListLoading.value = true
    const params = {}
    if (id) {
      params.serviceCategoryId = id
    }
    const config = {
      method: "get",
      url: "api/service_providers/all",
      headers: {
        "Content-Type": "application/json",

      }, params
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      responseData.data.sort((a, b) => a.viewCount - b.viewCount);
      responseData.data.sort((a, b) => a.rankCount - b.rankCount);
      allServiceProvidersList.value = responseData.data;
      loader.hideLoader()
      allServiceProvidersListLoading.value = false
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      allServiceProvidersListLoading.value = false
    }
  }
  const getServiceProviderList = async () => {
    const params = {
      page: serviceProviderPage.value
    }
    const config = {
      method: "get",
      url: "api/service_providers/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      },
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
  const serviceProvider = ref(null)
  const serviceProviderLoading = ref(false)
  const getServiceProviderById = async (id) => {
    serviceProviderLoading.value = true
    const config = {
      method: "get",
      url: "api/service_providers/" + id,
      headers: {
        "Content-Type": "application/json"

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      serviceProvider.value = responseData.data;
      loader.hideLoader()
      serviceProviderLoading.value = false
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      serviceProviderLoading.value = false
    }
  }
  const getFilteredServiceProviderByServiceCategory = async () => {
    const config = {
      method: "get",
      url: "api/service_providers/service_category/" + filteredByServiseCategoryId.value._id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

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


    serviceProviderInfo.serviceProviderLocation.division.name = serviceProviderLocationR.division.name
    serviceProviderInfo.serviceProviderLocation.division._id = serviceProviderLocationR.division._id
    serviceProviderInfo.serviceProviderLocation.district.name = serviceProviderLocationR.district.name
    serviceProviderInfo.serviceProviderLocation.district._id = serviceProviderLocationR.district._id
    serviceProviderInfo.serviceProviderLocation.subDistrict.name = serviceProviderLocationR.subDistrict.name
    serviceProviderInfo.serviceProviderLocation.subDistrict._id = serviceProviderLocationR.subDistrict._id
    serviceProviderInfo.serviceProviderLocation.union.name = serviceProviderLocationR.union.name
    serviceProviderInfo.serviceProviderLocation.union._id = serviceProviderLocationR.union._id
    serviceProviderInfo.serviceProviderLocation.ward.name = serviceProviderLocationR.ward.name
    serviceProviderInfo.serviceProviderLocation.ward._id = serviceProviderLocationR.ward._id
    const data = serviceProviderInfo
    const config = {
      method: "post",
      url: "api/service_providers",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

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
        "Authorization": `Bearer ${loginUser.value.token}`

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
        "Authorization": `Bearer ${loginUser.value.token}`

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
    if (serviceProviderInfo.service instanceof Object) {
      serviceProviderInfo.service = serviceProviderInfo.service._id
    }
    if (serviceProviderInfo.serviceCategory instanceof Object) {
      serviceProviderInfo.serviceCategory = serviceProviderInfo.serviceCategory._id
    }
    serviceProviderInfo.serviceProviderLocation.division.name = serviceProviderLocationR.division.name
    serviceProviderInfo.serviceProviderLocation.division._id = serviceProviderLocationR.division._id
    serviceProviderInfo.serviceProviderLocation.district.name = serviceProviderLocationR.district.name
    serviceProviderInfo.serviceProviderLocation.district._id = serviceProviderLocationR.district._id
    serviceProviderInfo.serviceProviderLocation.subDistrict.name = serviceProviderLocationR.subDistrict.name
    serviceProviderInfo.serviceProviderLocation.subDistrict._id = serviceProviderLocationR.subDistrict._id
    serviceProviderInfo.serviceProviderLocation.union.name = serviceProviderLocationR.union.name
    serviceProviderInfo.serviceProviderLocation.union._id = serviceProviderLocationR.union._id
    serviceProviderInfo.serviceProviderLocation.ward.name = serviceProviderLocationR.ward.name
    serviceProviderInfo.serviceProviderLocation.ward._id = serviceProviderLocationR.ward._id
    const data = serviceProviderInfo
    const config = {
      method: "put",
      url: "api/service_Providers/" + serviceProviderInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

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
        "Authorization": `Bearer ${loginUser.value.token}`

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
    // all service providers
    allServiceProvidersList,
    allServiceProvidersListLoading,
    getAllServiceProviders,

    //  service provider
    serviceProvider,
    serviceProviderLoading,
    getServiceProviderById,
    //  service provider list
    serviceProviderPage,
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
