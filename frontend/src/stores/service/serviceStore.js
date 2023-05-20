import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { encode64 } from 'src/global_js/utils'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useServiceStore = defineStore('service store', () => {
  const router = useRouter(),
    authStore = useAuthStore(),
    openServiceCreateDialog = ref(false),
    openServiceEditDialog = ref(false),
    openServicePreviewDialog = ref(false),
    imageIcon = ref(null),
    imageCover = ref(null),
    serviceList = ref([
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
    serviceInfo = reactive({
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
      viewCount: 0,
      order: 0
    })
  const emptyServiceInfo = () => {
    serviceInfo.id = null
    serviceInfo.user = null
    serviceInfo.name = {
      bn: null,
      en: null
    },
      serviceInfo.description = {
        bn: null,
        en: null
      }
    serviceInfo.coverImage = null
    serviceInfo.icon = null
    serviceInfo.viewCount = 0
    serviceInfo.order = 0
  }
  const openServiceCreateDialogManager = () => {
    emptyServiceInfo()
    openServiceCreateDialog.value = true
  }
  const openServiceEditDialogManager = (data) => {
    const serviceInfoKeys = [
      "name",
      "description",
      "coverImage",
      "icon",
      "viewCount",
      "order"
    ]
    openServiceEditDialog.value = true
    serviceInfo.id = data?._id
    serviceInfoKeys.forEach((keys, index) => {
      serviceInfo[keys] = data[keys]
    })
    imageCover.value = { name: serviceInfo.coverImage}
    imageIcon.value = { name: serviceInfo.icon}
  }
  const openServicePreviewDialogManager = (data) => {
    const serviceInfoKeys = [
      "name",
      "description",
      "coverImage",
      "icon",
      "viewCount",
      "order"
    ]
    openServicePreviewDialog.value = true
    serviceInfo.id = data?._id
    serviceInfoKeys.forEach((keys, index) => {
      serviceInfo[keys] = data[keys]
    })
  }
  const getServiceList = async () => {
    const config = {
      method: "get",
      url: "api/services/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      responseData.data.services.sort((a,b)=>a.order - b.order);
      serviceList.value = responseData.data;
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const createService = async () => {
    const data = serviceInfo
    const config = {
      method: "post",
      url: "api/services",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openServiceCreateDialog.value = false
      getServiceList()
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
    const data = serviceInfo.icon
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
      serviceInfo.icon = responseData.data
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
      serviceInfo.coverImage = responseData.data
    } catch (error) {
      console.log(error);
    }
  }
  const updateService = async () => {
    const serviceInfoKeys = [
      "name",
      "description",
      "coverImage",
      "icon",
      "viewCount",
      "order"
    ]
    const data = {}
    serviceInfoKeys.forEach((value, index) => {
      if (serviceInfo[value] instanceof Object) {
        if (serviceInfo[value].bn && serviceInfo[value].bn) {
          data[value] = serviceInfo[value]
        }
      } else if (serviceInfo[value]) {
        data[value] = serviceInfo[value]
      }
    })
    const config = {
      method: "put",
      url: "api/services/" + serviceInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      },data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openServiceEditDialog.value = false
      getServiceList()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  const deleteService = async () => {
    const config = {
      method: "delete",
      url: "api/services/" + serviceInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getServiceList()
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      loader.hideLoader()
    }
  }
  return {
    openServiceEditDialog,
    openServiceCreateDialog,
    openServiceEditDialogManager,
    openServicePreviewDialog,
    openServicePreviewDialogManager,
    openServiceCreateDialogManager,
    serviceList,
    serviceInfo,
    getServiceList,
    createService,
    updateService,
    deleteService,
    imageIcon,
    imageCover,
    uploadIcon,
    uploadCoverImage
  }
});
