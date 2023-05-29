import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue';
import { useLocalStorage } from "@vueuse/core";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { isObjEmpty } from "src/global_js/utils";
const userBrowsingLocationLocalStore = useLocalStorage("browsing-location", {});

export const usePublicUserStore = defineStore('Public user store', () => {
  const router = useRouter()
  const browsingLocation = reactive({
    division: null,
    district: null,
    subDistrict: null,
    union: null,
    ward: null
  })
  const languageStore = useLanguageStore();
  const districtStore = useDistrictStore();
  districtStore.getAllDistricts();

  const updateBrowsingDistrict = () => {
    userBrowsingLocationLocalStore.value.district =
      browsingLocation.district;
  };
  const updateBrowsingSubDistrict = () => {
    userBrowsingLocationLocalStore.value.subDistrict =
      browsingLocation.subDistrict;
  };
  const updateBrowsingUnion = () => {
    userBrowsingLocationLocalStore.value.union =
      browsingLocation.union;
  };
  const updateBrowsingWard = () => {
    userBrowsingLocationLocalStore.value.ward =
      browsingLocation.ward;
  };

  const updateBrowsingLocationOnMounted = () => {
    if (
      userBrowsingLocationLocalStore.value.district instanceof Object &&
      !isObjEmpty(userBrowsingLocationLocalStore.value.district)
    ) {
      browsingLocation.division =
        userBrowsingLocationLocalStore.value.division;
      browsingLocation.district =
        userBrowsingLocationLocalStore.value.district;
      browsingLocation.subDistrict =
        userBrowsingLocationLocalStore.value.subDistrict;
      browsingLocation.union =
        userBrowsingLocationLocalStore.value.union;
      browsingLocation.ward =
        userBrowsingLocationLocalStore.value.ward;
    }

  }

  return {
    browsingLocation,
    updateBrowsingDistrict,
    updateBrowsingSubDistrict,
    updateBrowsingUnion,
    updateBrowsingWard,
    updateBrowsingLocationOnMounted,
  }
});
