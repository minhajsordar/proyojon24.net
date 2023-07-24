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
import { Notify, Dialog } from 'quasar';
import { useI18n } from "vue-i18n";
import { CustomLoading } from 'src/global_js/loadiingApi';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useServiceProviderStore = defineStore('service provider store', () => {

  const { t } = useI18n();
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
    imageCover = reactive({
      imageCover1: null,
      imageCover2: null,
      imageCover3: null,
    }),
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
    serviceProviderRegisterInfo = reactive({
      name: {
        bn: null,
        en: null
      },
      username: null,
      phone: null,
      email: null,
      password: null,
      password2: null,
    }),
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
      serviceImage1: null,
      serviceImage2: null,
      serviceImage3: null,
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
      serviceTitle: {
        bn: null,
        en: null,
      },
      phoneNumber1: null,
      phoneNumber2: null,
      facebook: null,
      whatsapp: null,
      imo: null,
      twitter: null,
      email: null,
      experience: null,
      keywords: null,
      registrationNo: null,
      bankAccountName: "",
      phoneNumber: "",
      transactionId: "",
      amount: 0,
      reference: null,
    })
  const emptyServiceProviderInfo = () => {
    imageIcon.value = null
    imageCover.imageCover1 = null
    imageCover.imageCover2 = null
    imageCover.imageCover3 = null
    serviceProviderInfo.user = null
    serviceProviderInfo.name = {
      bn: null,
      en: null,
    }
    serviceProviderInfo.description = {
      bn: null,
      en: null,
    }
    serviceProviderInfo.serviceImage1 = null
    serviceProviderInfo.serviceImage2 = null
    serviceProviderInfo.serviceImage3 = null
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
    serviceProviderInfo.phoneNumber1 = null
    serviceProviderInfo.phoneNumber2 = null
    serviceProviderInfo.facebook = null
    serviceProviderInfo.whatsapp = null
    serviceProviderInfo.imo = null
    serviceProviderInfo.email = null
    serviceProviderInfo.experience = null
    serviceProviderInfo.twitter = null
    serviceProviderInfo.keywords = []
    serviceProviderInfo.bankAccountName = ""
    serviceProviderInfo.phoneNumber = ""
    serviceProviderInfo.transactionId = ""
    serviceProviderInfo.amount = 0
    serviceProviderInfo.reference = null
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
      "serviceImage1",
      "serviceImage2",
      "serviceImage3",
      "serviceCategory",
      "service",
      "image",
      "rankCount",
      "serviceProviderLocation",
      "serviceTitle",
      "phoneNumber1",
      "phoneNumber2",
      "facebook",
      "whatsapp",
      "imo",
      "email",
      "experience",
      "twitter",
      "keywords",
      "bankAccountName",
      "phoneNumber",
      "transactionId",
      "amount",
      "reference",
    ]
    serviceProviderInfoKeys.forEach((keys, index) => {
      serviceProviderInfo[keys] = data[keys]
    })
    serviceProviderInfo.id = data?._id
    serviceProviderInfo.service = serviceStore.serviceList.services.filter(e => e._id == serviceProviderInfo.service)[0]
    serviceProviderInfo.serviceCategory = serviceCategoryStore.serviceCategoryList.serviceCategorys.filter(e => e._id == serviceProviderInfo.serviceCategory)[0]
    imageCover.imageCover1 = { name: serviceProviderInfo.serviceImage1 }
    imageCover.imageCover2 = { name: serviceProviderInfo.serviceImage2 }
    imageCover.imageCover2 = { name: serviceProviderInfo.serviceImage3 }
    imageIcon.value = { name: serviceProviderInfo.icon }
    serviceProviderLocationR.division = data.serviceProviderLocation.division
    serviceProviderLocationR.district = data.serviceProviderLocation.district
    serviceProviderLocationR.subDistrict = data.serviceProviderLocation.subDistrict
    serviceProviderLocationR.union = data.serviceProviderLocation.union
    serviceProviderLocationR.pinlocation = data.serviceProviderLocation.pinlocation
    searchServiceStore.updateServiceCategory()
    openServiceProviderEditDialog.value = true
    if (serviceProviderLocationR.division) {
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
      "serviceImage1",
      "serviceImage2",
      "serviceImage3",
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
      "phoneNumber1",
      "phoneNumber2",
      "facebook",
      "whatsapp",
      "imo",
      "email",
      "experience",
      "twitter",
      "keywords",
      "bankAccountName",
      "phoneNumber",
      "transactionId",
      "amount",
      "reference",
    ]
    openServiceProviderPreviewDialog.value = true
    serviceProviderInfoKeys.forEach((keys, index) => {
      serviceProviderInfo[keys] = data[keys]
    })
    serviceProviderInfo.id = data?._id
    serviceProviderInfo.service = serviceStore.serviceList.services.filter(e => e._id == serviceProviderInfo.service)[0]
    serviceProviderInfo.serviceCategory = serviceCategoryStore.serviceCategoryList.serviceCategorys.filter(e => e._id == serviceProviderInfo.serviceCategory)[0]
    imageCover.imageCover1 = { name: serviceProviderInfo.serviceImage1 }
    imageCover.imageCover2 = { name: serviceProviderInfo.serviceImage2 }
    imageCover.imageCover2 = { name: serviceProviderInfo.serviceImage3 }
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
  const currentServiceProvidersListCount = ref(0)
  const serviceProviderPageNumber = ref(1)
  const searchKeyword = ref('')
  const getPublicServiceProviders = async (id) => {
    allServiceProvidersListLoading.value = true
    const params = {}
    if (id) {
      params.serviceCategoryId = id
    }
    if (searchKeyword.value !== '') {
      params.keywords = searchKeyword.value
    }
    params.pageNumber = 1
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
    CustomLoading('get-service-providers-all').showLoading()
    try {
      const responseData = await api.request(config);
      allServiceProvidersList.value = responseData.data
      CustomLoading('get-service-providers-all').hideLoading()
      allServiceProvidersListLoading.value = false
    } catch (error) {
      console.log(error);
      CustomLoading('get-service-providers-all').hideLoading()
      allServiceProvidersListLoading.value = false
    }
  }
  const getPublicServiceProvidersNextPages = async (id) => {
    allServiceProvidersListLoading.value = true
    const params = {}
    if (id) {
      params.serviceCategoryId = id
    }
    if (searchKeyword.value !== '') {
      params.keywords = searchKeyword.value
    }
    if (serviceProviderPageNumber.value) {
      params.pageNumber = serviceProviderPageNumber.value
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
      allServiceProvidersList.value.page = responseData.data.page
      allServiceProvidersList.value.pages = responseData.data.pages
      allServiceProvidersList.value.serviceProviders.push(...responseData.data.serviceProviders)
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
      serviceProviderList.value = responseData.data;
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const createUserAndServiceProvider = async () => {
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
    if (serviceProviderLocationR.union?._id) {
      serviceProviderInfo.serviceProviderLocation.union.name = serviceProviderLocationR.union.name
      serviceProviderInfo.serviceProviderLocation.union._id = serviceProviderLocationR.union._id
    }
    if (serviceProviderLocationR.pinlocation?._id) {
      serviceProviderInfo.serviceProviderLocation.pinlocation.name = serviceProviderLocationR.pinlocation.name
      serviceProviderInfo.serviceProviderLocation.pinlocation._id = serviceProviderLocationR.pinlocation._id
    }
    serviceProviderInfo.serviceProviderLocation.exact = serviceProviderLocationR.exact

    if (!(loginUser.value.permission == 'admin' || loginUser.value.permission == 'superAdmin' || loginUser.value.permission !== 'self')) {
      serviceProviderInfo.user = loginUser.value._id
    }
    const data = { ...serviceProviderInfo, ...serviceProviderRegisterInfo }
    if (
      serviceProviderInfo.bankAccountName &&
      serviceProviderInfo.phoneNumber &&
      serviceProviderInfo.transactionId &&
      serviceProviderInfo.amount
    ) {
      data.bankAccountName = serviceProviderInfo.bankAccountName
      data.phoneNumber = serviceProviderInfo.phoneNumber
      data.transactionId = serviceProviderInfo.transactionId
      data.amount = serviceProviderInfo.amount
    }
    const config = {
      method: "post",
      url: "api/service_providers/user_and_provider",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data
    };
    console.log(data)
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openServiceProviderCreateDialog.value = false
      if (loginUser.value.permission == 'admin') {
        getServiceProviderList()
      }

      Dialog.create({
        title: t("create_service_provider_success"),
        message: t("wait_for_confirmation"),
        ok: {
          push: true
        },
        persistent: true
      }).onOk(() => {
        router.push('/profile')
      })
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
    if (serviceProviderLocationR.union?._id) {
      serviceProviderInfo.serviceProviderLocation.union.name = serviceProviderLocationR.union.name
      serviceProviderInfo.serviceProviderLocation.union._id = serviceProviderLocationR.union._id
    }
    if (serviceProviderLocationR.pinlocation?._id) {
      serviceProviderInfo.serviceProviderLocation.pinlocation.name = serviceProviderLocationR.pinlocation.name
      serviceProviderInfo.serviceProviderLocation.pinlocation._id = serviceProviderLocationR.pinlocation._id
    }
    serviceProviderInfo.serviceProviderLocation.exact = serviceProviderLocationR.exact

    if (!(loginUser.value.permission == 'admin' || loginUser.value.permission == 'superAdmin' || loginUser.value.permission !== 'self')) {
      serviceProviderInfo.user = loginUser.value._id
    }
    if (
      serviceProviderInfo.bankAccountName &&
      serviceProviderInfo.phoneNumber &&
      serviceProviderInfo.transactionId &&
      serviceProviderInfo.amount
    ) {
      data.bankAccountName = serviceProviderInfo.bankAccountName
      data.phoneNumber = serviceProviderInfo.phoneNumber
      data.transactionId = serviceProviderInfo.transactionId
      data.amount = serviceProviderInfo.amount
    }
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
      if (loginUser.value.permission == 'admin') {
        getServiceProviderList()
      }

      Dialog.create({
        title: t("create_service_provider_success"),
        message: t("wait_for_confirmation"),
        ok: {
          push: true
        },
        persistent: true
      }).onOk(() => {
        router.push('/profile')
      })
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
  const uploadIcon = async () => {
    if (!imageIcon.value || typeof imageIcon.value == 'string' || typeof imageIcon.value == 'Object') {
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
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
    }
  }
  const uploadCoverImage = async (imagekey, serviceImageKey) => {
    if (!imageCover[imagekey] || typeof imageCover[imagekey] == 'string') {
      return
    }
    const config = {
      method: "post",
      url: "api/upload",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data: {
        image: imageCover[imagekey]
      }
    };
    try {
      const responseData = await api.request(config);
      serviceProviderInfo[serviceImageKey] = responseData.data
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
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
      loader.hideLoader()

      Dialog.create({
        title: t("success"),
        message: t("wait_for_confirmation"),
        ok: {
          push: true
        },
        persistent: true
      }).onOk(() => {
        router.push('/profile')
      })
    } catch (error) {
      console.log(error);
      loader.hideLoader()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
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
      Notify.create({
        position: "center",
        type: "negative",
        message: JSON.stringify(error),
      });
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

      }, data: {
        _id: id
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
      Notify.create({
        position: "center",
        type: "negative",
        message: JSON.stringify(error),
      });
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
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
      loader.hideLoader()
    }
  }
  const addToTopSuggestionServiceProvider = async (id) => {
    const config = {
      method: "put",
      url: "api/service_providers/suggest/" + id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data: {
        topSuggested: true
      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getServiceProviderList()
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
  const removeFromTopSuggestionServiceProvider = async (id) => {
    const config = {
      method: "put",
      url: "api/service_providers/suggest/" + id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`
      }, data: {
        topSuggested: false
      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getServiceProviderList()
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
    searchKeyword,
    serviceProviderPageNumber,
    getPublicServiceProviders,
    getPublicServiceProvidersNextPages,
    addToSuggestionServiceProvider,
    removeFromSuggestionServiceProvider,

    //  service provider
    paginationCurrent,
    serviceProvider,
    serviceProviderLoading,
    getServiceProviderById,
    increaseServiceProviderView,
    //  service provider list
    serviceProviderPage,
    serviceProviderList,
    serviceProviderInfo,
    serviceProviderRegisterInfo,
    getServiceProviderList,
    createServiceProvider,
    createUserAndServiceProvider,
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
    getFilteredServiceProviderByServiceCategory,
    addToTopSuggestionServiceProvider,
    removeFromTopSuggestionServiceProvider,
  }
});
