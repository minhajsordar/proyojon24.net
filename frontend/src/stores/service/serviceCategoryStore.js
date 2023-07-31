import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { useServiceStore } from './serviceStore';
import { Notify } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useServiceCategoryStore = defineStore('service category store', () => {
  const router = useRouter(),
  authStore = useAuthStore(),
   serviceStore = useServiceStore(),
    openServiceCategoryCreateDialog = ref(false),
    openServiceCategoryEditDialog = ref(false),
    openServiceCategoryPreviewDialog = ref(false),
    paginationCurrent = ref(1),
    imageIcon = ref(null),
    imageCover = ref(null),
    selectedService = ref(null),
    selectedServiceCategory = reactive({
      name:{
        bn:null,
        en:null
      },
      _id:null
    }),
    filteredByServiseId = ref(null),
    allServiceCategoryList = ref(null),
    serviceCategoryList = ref([
      {
        id: "demo service id",
        user: "demo service user",
        name: {
          bn: "demo service bn name",
          en: "demo service en name",
        },
        description: {
          bn: "demo service bn description",
          en: "demo service en description",
        },
        coverImage: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cleaning-services-facebook-cover-design-template-11e0ad57b482437f05c97bce49fb2281_screen.jpg",
        icon: "https://banner2.cleanpng.com/20180823/wk/kisspng-computer-icons-service-user-travel-ims-an-amadeus-setting-svg-png-icon-free-download-1999-2-onl-5b7f0a40a5df71.0483892015350523526794.jpg",
        viewCount: 0
      }
    ]),
    serviceCategoryInfo = reactive({
      id: null,
      user: null,
      name: {
        bn: null,
        en: null,
      },
      description: {
        bn: null,
        en: null,
      },
      coverImage: null,
      service: null,
      icon: null,
      order: 1,
      premiumRegistrationFee: 1,
    })
  const emptyServiceCategoryInfo = () => {
    imageIcon.value = null
imageCover.value = null
    serviceCategoryInfo.id = null
    serviceCategoryInfo.user = null
    serviceCategoryInfo.service = null
    serviceCategoryInfo.name = {
      bn: null,
      en: null
    },
      serviceCategoryInfo.description = {
        bn: null,
        en: null
      }
    serviceCategoryInfo.coverImage = null
    serviceCategoryInfo.icon = null
    serviceCategoryInfo.premiumRegistrationFee = 1
  }
  const openServiceCategoryCreateDialogManager = () => {
    emptyServiceCategoryInfo()
    openServiceCategoryCreateDialog.value = true
  }
  const openServiceCategoryEditDialogManager = (data) => {
    const serviceCategoryInfoKeys = [
      "name",
      "service",
      "coverImage",
      "icon",
      "order",
      "premiumRegistrationFee",
    ]
    openServiceCategoryEditDialog.value = true
    serviceCategoryInfo.id = data?._id
    serviceCategoryInfoKeys.forEach((keys, index) => {
      serviceCategoryInfo[keys] = data[keys]
    })
    serviceCategoryInfo.service = serviceStore.serviceList.services.filter(e=>e._id == serviceCategoryInfo.service)[0]
    imageCover.value = { name: serviceCategoryInfo.coverImage}
    imageIcon.value = { name: serviceCategoryInfo.icon}
  }
  const openServiceCategoryPreviewDialogManager = (data) => {

    const serviceCategoryInfoKeys = [
      "name",
      "service",
      "coverImage",
      "icon",
      "order",
      "premiumRegistrationFee",
    ]
    openServiceCategoryPreviewDialog.value = true
    serviceCategoryInfo.id = data?._id
    serviceCategoryInfoKeys.forEach((keys, index) => {
      serviceCategoryInfo[keys] = data[keys]
    })
    serviceCategoryInfo.service = serviceStore.serviceList.services.filter(e=>e._id == serviceCategoryInfo.service)[0]
  }
  const serviceCategoryPage = ref(1)
  const getServiceCategoryList = async () => {
    const params = {
      pageNumber: serviceCategoryPage.value
    }
    if(filteredByServiseId.value){
      params.serviceId = filteredByServiseId.value._id
    }
    const config = {
      method: "get",
      url: "api/service_categorys/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      },params
    };
    CustomLoading('get-service-categorys').showLoading()
    try {
      const responseData = await api.request(config);
      serviceCategoryList.value = responseData.data;
      CustomLoading('get-service-categorys').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-service-categorys').hideLoading()
    }
  }
  const getAllServiceCategorys = async (id) => {
    const params = {}
    if(id){
      params.serviceId = id
    }
    const config = {
      method: "get",
      url: "api/service_categorys/all",
      headers: {
        "Content-Type": "application/json",

      },params
    };
    CustomLoading('get-service-categorys-all').showLoading()
    try {
      const responseData = await api.request(config);
      allServiceCategoryList.value = responseData.data;
      CustomLoading('get-service-categorys-all').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-service-categorys-all').hideLoading()
    }
  }
  const getServiceCategoryByServiceCategoryId = async (id) => {
    const config = {
      method: "get",
      url: "api/service_categorys/service_category_by_service_category/"+id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    CustomLoading('get-service-categorys-service').showLoading()
    try {
      const responseData = await api.request(config);
      allServiceCategoryList.value = responseData.data;
      CustomLoading('get-service-categorys-service').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-service-categorys-service').hideLoading()
    }
  }
  const getFilteredServiceCategoryByService = async () => {
    const config = {
      method: "get",
      url: "api/service_categorys/service/"+filteredByServiseId.value._id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    CustomLoading('get-service-categorys-service').showLoading()
    try {
      const responseData = await api.request(config);
      serviceCategoryList.value = responseData.data;
      CustomLoading('get-service-categorys-service').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-service-categorys-service').hideLoading()
    }
  }
  const createServiceCategory = async () => {
    if(serviceCategoryInfo.service instanceof Object){
      serviceCategoryInfo.service = serviceCategoryInfo.service._id
    }
    const data = serviceCategoryInfo
    const config = {
      method: "post",
      url: "api/service_categorys",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data
    };
    CustomLoading('post-service-categorys').showLoading()
    try {
      const responseData = await api.request(config);
      openServiceCategoryCreateDialog.value = false
      getServiceCategoryList()
      CustomLoading('post-service-categorys').hideLoading()
      Notify.create({
        position: "center",
        type: "positive",
        message: "Service Category Created Successfully",
      });
    } catch (error) {
      console.log(error);
      CustomLoading('post-service-categorys').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
    }
  }
  const uploadIcon = async () => {
    if(!imageIcon.value || typeof imageIcon.value == 'string'){
      return
    }
    const data = serviceCategoryInfo.icon
    const config = {
      method: "post",
      url: "api/upload",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data:{
        image:imageIcon.value
      }
    };
    CustomLoading('upload-icon-service-categroy').showLoading()
    try {
      const responseData = await api.request(config);
      serviceCategoryInfo.icon = responseData.data
      CustomLoading('upload-icon-service-categroy').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('upload-icon-service-categroy').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
    }
  }
  const updateServiceCategory = async () => {
    const serviceCategoryInfoKeys = [
      "name",
      "service",
      "coverImage",
      "icon",
      "order",
      "premiumRegistrationFee",
    ]
    const data = {}
    serviceCategoryInfoKeys.forEach((value, index) => {
      if (serviceCategoryInfo[value] instanceof Object) {
        if (serviceCategoryInfo[value].bn && serviceCategoryInfo[value].bn) {
          data[value] = serviceCategoryInfo[value]
        }
      } else if (serviceCategoryInfo[value]) {
        data[value] = serviceCategoryInfo[value]
      }
    })
    if(serviceCategoryInfo.service instanceof Object){
      data.service = serviceCategoryInfo.service._id
    }
    const config = {
      method: "put",
      url: "api/service_categorys/" + serviceCategoryInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      },data
    };
    CustomLoading('put-service-categorys').showLoading()
    try {
      const responseData = await api.request(config);
      openServiceCategoryEditDialog.value = false
      getServiceCategoryList()
      CustomLoading('put-service-categorys').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('put-service-categorys').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
    }
  }
  const deleteServiceCategory = async () => {
    const config = {
      method: "delete",
      url: "api/service_categorys/" + serviceCategoryInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    CustomLoading('delete-service-categorys').showLoading()
    try {
      const responseData = await api.request(config);
      getServiceCategoryList()
      CustomLoading('delete-service-categorys').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('delete-service-categorys').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
    }
  }
  return {
    openServiceCategoryEditDialog,
    openServiceCategoryEditDialogManager,
    openServiceCategoryPreviewDialog,
    openServiceCategoryPreviewDialogManager,
    openServiceCategoryCreateDialog,
    openServiceCategoryCreateDialogManager,
    paginationCurrent,
    selectedServiceCategory,
    allServiceCategoryList,
    getServiceCategoryByServiceCategoryId,
    serviceCategoryList,
    serviceCategoryInfo,
    serviceCategoryPage,
    getServiceCategoryList,
    getAllServiceCategorys,
    createServiceCategory,
    updateServiceCategory,
    deleteServiceCategory,
    imageIcon,
    imageCover,
    uploadIcon,
    selectedService,
    filteredByServiseId,
    getFilteredServiceCategoryByService
  }
});
