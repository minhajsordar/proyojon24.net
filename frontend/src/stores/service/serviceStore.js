import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
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
     paginationCurrent = ref(1),
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
      order: 1
    })
  const emptyServiceInfo = () => {
    imageIcon.value = null
    imageCover.value = null
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
    serviceInfo.order = 1
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
      "order"
    ]
    openServiceEditDialog.value = true
    serviceInfo.id = data?._id
    serviceInfoKeys.forEach((keys, index) => {
      serviceInfo[keys] = data[keys]
    })
    imageCover.value = { name: serviceInfo.coverImage }
    imageIcon.value = { name: serviceInfo.icon }
  }
  const openServicePreviewDialogManager = (data) => {
    const serviceInfoKeys = [
      "name",
      "description",
      "coverImage",
      "icon",
      "order"
    ]
    openServicePreviewDialog.value = true
    serviceInfo.id = data?._id
    serviceInfoKeys.forEach((keys, index) => {
      serviceInfo[keys] = data[keys]
    })
  }
  const servicePage = ref(1)
  const getServiceList = async () => {
    const params = {
      pageNumber: servicePage.value
    }
    const config = {
      method: "get",
      url: "api/services/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      },params
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      responseData.data.services.sort((a, b) => a.order - b.order);
      serviceList.value = responseData.data;
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
  const getAllServices = async () => {
    const config = {
      method: "get",
      url: "api/services/all",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      responseData.data.sort((a, b) => a.order - b.order);
      serviceList.value.services = responseData.data;
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
        "Authorization": `Bearer ${loginUser.value.token}`

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
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
      loader.hideLoader()
    }
  }
  const uploadIcon = async () => {
    if (!imageIcon.value || typeof imageIcon.value == 'string') {
      return
    }
    const data = serviceInfo.icon
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
      serviceInfo.icon = responseData.data
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
    }
  }
  const uploadCoverImage = async () => {
    if (!imageCover.value || typeof imageIcon.value == 'string') {
      return
    }
    const data = {}
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
      serviceInfo.coverImage = responseData.data
    } catch (error) {
      console.log(error);
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
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
        "Authorization": `Bearer ${loginUser.value.token}`

      }, data
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      openServiceEditDialog.value = false
      getServiceList()
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
  const deleteService = async () => {
    const config = {
      method: "delete",
      url: "api/services/" + serviceInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }
    };
    loader.showLoader()
    try {
      const responseData = await api.request(config);
      getServiceList()
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
    openServiceEditDialog,
    openServiceCreateDialog,
    openServiceEditDialogManager,
    openServicePreviewDialog,
    openServicePreviewDialogManager,
    openServiceCreateDialogManager,
    paginationCurrent,
    servicePage,
    serviceList,
    serviceInfo,
    getServiceList,
    getAllServices,
    createService,
    updateService,
    deleteService,
    imageIcon,
    imageCover,
    uploadIcon,
    uploadCoverImage
  }
});
