import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { Notify } from 'quasar';
import { usePinlocationStore } from '../locations/pinlocationStore';
import { useUnionStore } from '../locations/unionStore';
import { useSubDistrictStore } from '../locations/subDistrictStore';
import { useDistrictStore } from '../locations/districtStore';
import { useServiceProviderStore } from './serviceProviderStore';
import { useSearchServiceStore } from './searchService';
import { useServiceStore } from './serviceStore';
import { useServiceCategoryStore } from './serviceCategoryStore';
import { isObjEmpty } from 'src/global_js/utils';
import { useAuthStore } from '../auth/authStore';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useUserServiceProviderStore = defineStore('user service provider store', () => {
  const authStore = useAuthStore();
  const searchServiceStore = useSearchServiceStore();
  const serviceCategoryStore = useServiceCategoryStore()
  const serviceStore = useServiceStore();
  const userServiceProvider = ref(null)
  const userServiceProviderLoading = ref(false)
  const serviceProviderStore = useServiceProviderStore()
  const districtStore = useDistrictStore();
  const subDistrictStore = useSubDistrictStore();
  const unionStore = useUnionStore();
  const pinlocationStore = usePinlocationStore();
  const getUserServiceProvider = async () => {
    serviceCategoryStore.getServiceCategoryList()
    serviceStore.getAllServices()
    const config = {
      method: "get",
      url: "api/service_providers/user_service_provider",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser.value.token}`

      }, params: {
        user: loginUser.value._id
      }
    };
    loader.showLoader()
    userServiceProviderLoading.value = true
    try {
      const responseData = await api.request(config);
      userServiceProvider.value = responseData.data
      if (!isObjEmpty(responseData.data)) {
        fillUpUserServiceProviderInfo(responseData.data)
      } else {
        fillUpBasicInfo()
      }
      userServiceProviderLoading.value = false
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      userServiceProviderLoading.value = false
      loader.hideLoader()
    }
  }
  const fillUpUserServiceProviderInfo = (data) => {
    console.log(data)
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
      "twitter",
      "keywords"
    ]
    serviceProviderInfoKeys.forEach((keys, index) => {
      serviceProviderStore.serviceProviderInfo[keys] = data[keys]
    })
    serviceProviderStore.imageIcon = { src: data["image"] }
    serviceProviderStore.imageCover.imageCover1 = { src: data["serviceImage1"] }
    serviceProviderStore.imageCover.imageCover2 = { src: data["serviceImage2"] }
    serviceProviderStore.imageCover.imageCover3 = { src: data["serviceImage3"] }


    serviceProviderStore.serviceProviderInfo.id = data?._id
    serviceProviderStore.imageCover.imageCover1 = { name: serviceProviderStore.serviceProviderInfo.serviceImage1 }
    serviceProviderStore.imageCover.imageCover2 = { name: serviceProviderStore.serviceProviderInfo.serviceImage2 }
    serviceProviderStore.imageCover.imageCover3 = { name: serviceProviderStore.serviceProviderInfo.serviceImage3 }
    serviceProviderStore.imageIcon.value = { name: serviceProviderStore.serviceProviderInfo.image }
    serviceProviderStore.serviceProviderLocationR.division = data.serviceProviderLocation.division
    serviceProviderStore.serviceProviderLocationR.district = data.serviceProviderLocation.district
    serviceProviderStore.serviceProviderLocationR.subDistrict = data.serviceProviderLocation.subDistrict
    serviceProviderStore.serviceProviderLocationR.union = data.serviceProviderLocation.union
    serviceProviderStore.serviceProviderLocationR.pinlocation = data.serviceProviderLocation.pinlocation
    searchServiceStore.updateServiceCategory()
    if (serviceProviderStore.serviceProviderLocationR.division) {
      districtStore.getAllDistricts(serviceProviderStore.serviceProviderLocationR.division._id);
    }
    if (serviceProviderStore.serviceProviderLocationR.district) {
      subDistrictStore.getAllSubDistricts(serviceProviderStore.serviceProviderLocationR.district._id);
    }
    if (serviceProviderStore.serviceProviderLocationR.subDistrict) {
      unionStore.getAllUnions(serviceProviderStore.serviceProviderLocationR.subDistrict._id);
    }
    if (serviceProviderStore.serviceProviderLocationR.union) {
      pinlocationStore.getAllPinlocations(serviceProviderStore.serviceProviderLocationR.union._id);
    }
  }
  const fillUpBasicInfo = () => {
    serviceProviderStore.serviceProviderInfo['name'] = authStore.loginUserInfo.name
    serviceProviderStore.serviceProviderInfo['phoneNumber1'] = authStore.loginUserInfo.phone
    serviceProviderStore.serviceProviderInfo['email'] = authStore.loginUserInfo.email
  }
  return {
    userServiceProvider,
    userServiceProviderLoading,
    getUserServiceProvider
  }
});
