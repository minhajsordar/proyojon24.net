import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { useServiceStore } from './serviceStore';
import { useServiceCategoryStore } from './serviceCategoryStore';
import { usePublicUserStore } from '../user/publicStore';
import { usePinlocationStore } from '../locations/pinlocationStore';
import { useUnionStore } from '../locations/unionStore';
import { useSubDistrictStore } from '../locations/subDistrictStore';
import { useDistrictStore } from '../locations/districtStore';
import { useDivisionStore } from '../locations/divisionStore';
import { useSearchServiceStore } from './searchService';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useServiceProviderStore = defineStore('service provider store', () => {

  const searchServiceStore = useSearchServiceStore();
  const divisionEl = ref(null);
  const divisionStore = useDivisionStore();
  const districtStore = useDistrictStore();
  const subDistrictStore = useSubDistrictStore();
  const unionStore = useUnionStore();
  const pinlocationStore = usePinlocationStore();
  const router = useRouter(),
    authStore = useAuthStore(),
    serviceStore = useServiceStore(),
    publicUserStore = usePublicUserStore(),
    serviceCategoryStore = useServiceCategoryStore(),
    openServiceProviderCreateDialog = ref(false),
    openServiceProviderEditDialog = ref(false),
    openServiceProviderPreviewDialog = ref(false),
    paginationCurrent = ref(1),
    imageIcon = ref(null),
    imageCover = ref(null),
    selectedServiceCategory = ref(null),
    filteredByServiseCategoryId = ref(null),
    serviceProviderPage = ref(1),
    serviceProviderLocationR = reactive({
      division: null,
      district: null,
      subDistrict: null,
      union: null,
      pinlocation: null,
      exact: {
        bn: null,
        en: null
      }
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
          _id: null,
          name: {
            bn: null,
            en: null
          }
        },
        district: {
          _id: null,
          name: {
            bn: null,
            en: null
          }
        },
        subDistrict: {
          _id: null,
          name: {
            bn: null,
            en: null
          }
        },
        union: {
          _id: null,
          name: {
            bn: null,
            en: null
          }
        },
        pinlocation: {
          _id: null,
          name: {
            bn: null,
            en: null
          }
        },
        exact: {
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
    serviceProviderInfo.service = null
    serviceProviderInfo.serviceCategory = null
    serviceProviderInfo.rankCount = 1
    serviceProviderLocationR.division = null
    serviceProviderLocationR.district = null
    serviceProviderLocationR.subDistrict = null
    serviceProviderLocationR.union = null
    serviceProviderLocationR.pinlocation = null
    serviceProviderLocationR.exact = {
      bn: null,
      en: null
    }
    serviceProviderInfo.serviceProviderLocation = {
      division: {
        _id: null,
        name: {
          bn: null,
          en: null
        }
      },
      district: {
        _id: null,
        name: {
          bn: null,
          en: null
        }
      },
      subDistrict: {
        _id: null,
        name: {
          bn: null,
          en: null
        }
      },
      union: {
        _id: null,
        name: {
          bn: null,
          en: null
        }
      },
      pinlocation: {
        _id: null,
        name: {
          bn: null,
          en: null
        }
      },
      exact: {
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
    serviceProviderInfo.phoneNumber = {
      bn: null,
      en: null,
    }
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
    serviceProviderInfo.id = data?._id
    serviceProviderInfo.service = serviceStore.serviceList.services.filter(e => e._id == serviceProviderInfo.service)[0]
    serviceProviderInfo.serviceList = data.serviceList
    serviceProviderInfo.serviceCategory = serviceCategoryStore.serviceCategoryList.serviceCategorys.filter(e => e._id == serviceProviderInfo.serviceCategory)[0]
    imageCover.value = { name: serviceProviderInfo.coverImage }
    imageIcon.value = { name: serviceProviderInfo.icon }
    serviceProviderLocationR.division = data.serviceProviderLocation.division
    serviceProviderLocationR.district = data.serviceProviderLocation.district
    serviceProviderLocationR.subDistrict = data.serviceProviderLocation.subDistrict
    serviceProviderLocationR.union = data.serviceProviderLocation.union
    serviceProviderLocationR.pinlocation = data.serviceProviderLocation.pinlocation
    searchServiceStore.updateServiceCategory()
    openServiceProviderEditDialog.value = true
    if (serviceProviderLocationR.division) {
      console.log(serviceProviderLocationR.division._id)
      districtStore.getAllDistricts(serviceProviderLocationR.division._id);
    }
    if (serviceProviderLocationR.district) {
      subDistrictStore.getAllSubDistricts(serviceProviderLocationR.district._id);
    }
    if (serviceProviderLocationR.subDistrict) {
      unionStore.getAllUnions(serviceProviderLocationR.subDistrict._id);
    }
    if (serviceProviderLocationR.union) {
      pinlocationStore.getAllPinlocations(serviceProviderLocationR.union._id);
    }
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
    serviceProviderLocationR.pinlocation = data.serviceProviderLocation.pinlocation
  }
  const allServiceProvidersList = ref(null)
  const suggestedServiceProvidersList = ref([])
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
      responseData.data.sort((b, a) => a.viewCount - b.viewCount);
      responseData.data.sort((b, a) => a.rankCount - b.rankCount);
      allServiceProvidersList.value = responseData.data.filter(e=>e.suggested == false);
      suggestedServiceProvidersList.value =  responseData.data.filter(e=>e.suggested == true)

      loader.hideLoader()
      allServiceProvidersListLoading.value = false
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      allServiceProvidersListLoading.value = false
    }
  }
  const getAllServiceProvidersByLocation = async (id) => {
    allServiceProvidersListLoading.value = true
    const params = {}
    if (id) {
      params.serviceCategoryId = id
    }
    if (publicUserStore.browsingLocation.pinlocation) {
      params.pinlocationId = publicUserStore.browsingLocation.pinlocation._id
    }
    else if (publicUserStore.browsingLocation.union) {
      params.unionId = publicUserStore.browsingLocation.union._id
    }
    else if (publicUserStore.browsingLocation.subDistrict) {
      params.subDistrictId = publicUserStore.browsingLocation.subDistrict._id
    }
    else if (publicUserStore.browsingLocation.district) {
      params.districtId = publicUserStore.browsingLocation.district._id
    }
    else if (publicUserStore.browsingLocation.division) {
      params.divisionId = publicUserStore.browsingLocation.division._id
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
      pageNumber: serviceProviderPage.value
    }
    if (filteredByServiseCategoryId.value) {
      params.serviceCategoryId = filteredByServiseCategoryId.value._id
    } else if (serviceCategoryStore.filteredByServiseId) {
      params.serviceId = serviceCategoryStore.filteredByServiseId._id
    }
    const config = {
      method: "get",
      url: "api/service_providers/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, params
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

      }, params
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
    if(serviceProviderLocationR.union?._id){
      serviceProviderInfo.serviceProviderLocation.union.name = serviceProviderLocationR.union.name
      serviceProviderInfo.serviceProviderLocation.union._id = serviceProviderLocationR.union._id
    }
    if(serviceProviderLocationR.pinlocation?._id){
      serviceProviderInfo.serviceProviderLocation.pinlocation.name = serviceProviderLocationR.pinlocation.name
      serviceProviderInfo.serviceProviderLocation.pinlocation._id = serviceProviderLocationR.pinlocation._id
    }
    serviceProviderInfo.serviceProviderLocation.exact = serviceProviderLocationR.exact

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
    serviceProviderInfo.serviceProviderLocation.pinlocation = serviceProviderLocationR.pinlocation
    serviceProviderInfo.serviceProviderLocation.pinlocation._id = serviceProviderLocationR.pinlocation._id
    serviceProviderInfo.serviceProviderLocation.exact = serviceProviderLocationR.exact
    const data = serviceProviderInfo
    const config = {
      method: "put",
      url: "api/service_providers/" + serviceProviderInfo.id,
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
      url: "api/service_providers/" + serviceProviderInfo.id,
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
  const increaseServiceProviderView = async (id) => {
    const config = {
      method: "put",
      url: "api/service_providers/service_provider_view/" + id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      },data:{
        _id : id
      }
    };
    try {
      const responseData = await api.request(config);
    } catch (error) {
      console.log(error);
    }
  }
  const addToSuggestionServiceProvider = async (id) => {
    const config = {
      method: "put",
      url: "api/service_providers/suggest/" + id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data: {
        suggested: true
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
  const removeFromSuggestionServiceProvider = async (id) => {
    const config = {
      method: "put",
      url: "api/service_providers/suggest/" + id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`
      }, data: {
        suggested: false
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
    suggestedServiceProvidersList,
    getAllServiceProviders,
    addToSuggestionServiceProvider,
    removeFromSuggestionServiceProvider,

    //  service provider
    paginationCurrent,
    serviceProvider,
    serviceProviderLoading,
    getServiceProviderById,
    getAllServiceProvidersByLocation,
    increaseServiceProviderView,
    //  service provider list
    serviceProviderPage,
    serviceProviderList,
    serviceProviderInfo,
    getServiceProviderList,
    createServiceProvider,
    updateServiceProvider,
    deleteServiceProvider,
    serviceProviderLocationR,
    emptyServiceProviderInfo,
    imageIcon,
    imageCover,
    uploadIcon,
    selectedServiceCategory,
    uploadCoverImage,
    filteredByServiseCategoryId,
    getFilteredServiceProviderByServiceCategory
  }
});
