import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { useServiceProviderStore } from 'src/stores/service/serviceProviderStore';
import { usePublicUserStore } from 'src/stores/user/publicStore';
import { Notify, Dialog } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
import { useI18n } from "vue-i18n";
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Loading Service Providers...'
export const useServiceProviderFilterStore = defineStore('service provider filter store', () => {

  const { t } = useI18n();

  const serviceProviderStore = useServiceProviderStore();
  const router = useRouter(),
    publicUserStore = usePublicUserStore(),
    searchKeyWords = ref(null)

  const getPublicServiceProvidersBySearchKeyword = async (id) => {
    serviceProviderStore.allServiceProvidersListLoading = true;
    const params = {}
    if (id) {
      params.serviceCategoryId = id
    }
    if (!keyword) {
      params.keywords = searchKeyWords.value
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
      serviceProviderStore.allServiceProvidersList = responseData.data;
      CustomLoading('get-service-providers-all').hideLoading()
      serviceProviderStore.allServiceProvidersListLoading = false;
    } catch (error) {
      console.log(error);
      CustomLoading('get-service-providers-all').hideLoading()
      serviceProviderStore.allServiceProvidersListLoading = false;
    }
  }

  const getPublicServiceProvidersByLocation = async (id) => {
    serviceProviderStore.allServiceProvidersListLoading = true
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
    CustomLoading('get-service-providers-allc').showLoading()
    try {
      const responseData = await api.request(config);
      serviceProviderStore.allServiceProvidersList = responseData.data;
      CustomLoading('get-service-providers-allc').hideLoading()
      serviceProviderStore.allServiceProvidersListLoading = false
    } catch (error) {
      console.log(error);
      CustomLoading('get-service-providers-allc').hideLoading()
      serviceProviderStore.allServiceProvidersListLoading = false
    }
  }
  return {
    searchKeyWords,
    getPublicServiceProvidersBySearchKeyword,
    getPublicServiceProvidersByLocation,
  }
});
