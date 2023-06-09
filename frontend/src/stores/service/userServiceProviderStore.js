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
import { Notify } from 'quasar';
export const suggestUserData = useLocalStorage('proyojonuserkey', {})
export const loginUser = useLocalStorage('proyojonloginuser', {})
loader.title = 'Requesting To Server...'
export const useUserServiceProviderStore = defineStore('user service provider store', () => {
  const userServiceProvider = ref(null)
  const userServiceProviderLoading = ref(false)
  const getUserServiceProvider = async () => {
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
      userServiceProviderLoading.value = false
      loader.hideLoader()
    } catch (error) {
      console.log(error);
      userServiceProviderLoading.value = false
      Notify.create({
        position: "center",
        type: "negative",
        message: error.response.data.message,
      });
      loader.hideLoader()
    }
  }
  return {
    userServiceProvider,
userServiceProviderLoading,
getUserServiceProvider
  }
});
