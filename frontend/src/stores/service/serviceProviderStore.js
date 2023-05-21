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
export const useServiceCategoryStore = defineStore('service category store', () => {
  const router = useRouter(),
  authStore = useAuthStore(),
   serviceStore = useServiceStore(),
    openServiceCategoryCreateDialog = ref(false),
    openServiceCategoryEditDialog = ref(false),
    openServiceCategoryPreviewDialog = ref(false),
    imageIcon = ref(null),
    imageCover = ref(null),
    selectedService = ref(null),
    filteredByServiseId = ref(null),
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
      icon: null,
      order: 0
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
    serviceCategoryInfo.order = 0
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
      "order"
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
      "order"
    ]
    openServiceCategoryPreviewDialog.value = true
    serviceCategoryInfo.id = data?._id
    serviceCategoryInfoKeys.forEach((keys, index) => {
      serviceCategoryInfo[keys] = data[keys]
    })
    serviceCategoryInfo.service = serviceStore.serviceList.services.filter(e=>e._id == serviceCategoryInfo.service)[0]
  }
  const getServiceCategoryList = async () => {
    const config = {
      method: "get",
      url: "api/service_categorys/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      responseData.data.serviceCategorys.sort((a,b)=>a.order - b.order);
      serviceCategoryList.value = responseData.data;
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const getFilteredServiceCategoryByService = async () => {
    const config = {
      method: "get",
      url: "api/service_categorys/service/"+filteredByServiseId.value._id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      responseData.data.serviceCategorys.sort((a,b)=>a.order - b.order);
      serviceCategoryList.value = responseData.data;
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
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
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openServiceCategoryCreateDialog.value = false
      getServiceCategoryList()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
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
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }, data:{
        image:imageIcon.value
      }
    };
    try {
      const responseData = await api.request(config);
      serviceCategoryInfo.icon = responseData.data
    } catch (error) {
      console.log(error);
    }
  }
  const uploadCoverImage = async () => {
    if(!imageCover.value || typeof imageIcon.value == 'string'){
      return
    }
    const data = {}
    const config = {
      method: "post",
      url: "api/upload",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }, data:{
        image:imageCover.value
      }
    };
    try {
      const responseData = await api.request(config);
      serviceCategoryInfo.coverImage = responseData.data
    } catch (error) {
      console.log(error);
    }
  }
  const updateServiceCategory = async () => {
    const serviceCategoryInfoKeys = [
      "name",
      "service",
      "coverImage",
      "icon",
      "order"
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
    const config = {
      method: "put",
      url: "api/service_categorys/" + serviceCategoryInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      },data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openServiceCategoryEditDialog.value = false
      getServiceCategoryList()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const deleteServiceCategory = async () => {
    const config = {
      method: "delete",
      url: "api/service_categorys/" + serviceCategoryInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getServiceCategoryList()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  return {
    openServiceCategoryEditDialog,
    openServiceCategoryEditDialogManager,
    openServiceCategoryPreviewDialog,
    openServiceCategoryPreviewDialogManager,
    openServiceCategoryCreateDialog,
    openServiceCategoryCreateDialogManager,
    serviceCategoryList,
    serviceCategoryInfo,
    getServiceCategoryList,
    createServiceCategory,
    updateServiceCategory,
    deleteServiceCategory,
    imageIcon,
    imageCover,
    uploadIcon,
    selectedService,
    uploadCoverImage,
    filteredByServiseId,
    getFilteredServiceCategoryByService
  }
});
