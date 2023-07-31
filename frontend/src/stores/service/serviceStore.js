import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
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
    CustomLoading('get-services').showLoading()
    try {
      const responseData = await api.request(config);
      serviceList.value = responseData.data;
      CustomLoading('get-services').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-services').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
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
    CustomLoading('get-services-all').showLoading()
    try {
      const responseData = await api.request(config);
      serviceList.value.services = responseData.data;
      CustomLoading('get-services-all').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('get-services-all').hideLoading()
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
    CustomLoading('post-services').showLoading()
    try {
      const responseData = await api.request(config);
      openServiceCreateDialog.value = false
      getServiceList()
      CustomLoading('post-services').hideLoading()
      Notify.create({
        position: "center",
        type: "positive",
        message: "Service Created Successfully",
      });
    } catch (error) {
      console.log(error);
      CustomLoading('post-services').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
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
    CustomLoading('service-image-upload').showLoading()
    try {
      const responseData = await api.request(config);
      serviceInfo.icon = responseData.data
      CustomLoading('service-image-upload').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('service-image-upload').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
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
    CustomLoading('put-services-by-id').showLoading()
    try {
      const responseData = await api.request(config);
      openServiceEditDialog.value = false
      getServiceList()
      CustomLoading('put-services-by-id').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('put-services-by-id').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
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
    CustomLoading('delete-service').showLoading()
    try {
      const responseData = await api.request(config);
      getServiceList()
      CustomLoading('delete-service').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('delete-service').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
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
    uploadIcon
  }
});
