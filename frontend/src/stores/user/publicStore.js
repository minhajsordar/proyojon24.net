import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue';
import { useLocalStorage } from "@vueuse/core";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { isObjEmpty } from "src/global_js/utils";
import { useSubDistrictStore } from '../locations/subDistrictStore';
import { useUnionStore } from '../locations/unionStore';
import { useWardStore } from '../locations/wardStore';
const userBrowsingLocationLocalStore = useLocalStorage("browsing-location", {});
const locationListGlobal = useLocalStorage("global-location-list", {});

export const usePublicUserStore = defineStore('Public user store', () => {
  const router = useRouter()
  const openBrowsingLocationDialog = ref(false)
  const openFilterByServiceCategoryDialog = ref(false)
  const browsingLocation = reactive({
    division: null,
    district: null,
    subDistrict: null,
    union: null,
    ward: null
  })
  const languageStore = useLanguageStore();
  const wardStore = useWardStore();
  const unionStore = useUnionStore();
  const subDistrictStore = useSubDistrictStore();
  const districtStore = useDistrictStore();
  districtStore.getAllDistricts();

  const updateBrowsingDistrict = () => {
    userBrowsingLocationLocalStore.value.district =
      browsingLocation.district;
      subDistrictStore.getAllSubDistricts(browsingLocation.district._id)
      userBrowsingLocationLocalStore.value.subDistrict = browsingLocation.subDistrict = null
      userBrowsingLocationLocalStore.value.union = browsingLocation.union = null
      userBrowsingLocationLocalStore.value.ward = browsingLocation.ward = null

      userBrowsingLocationLocalStore.value.division = browsingLocation.division = locationListGlobal.value.divisions.filter(e=>{
        return e._id == browsingLocation.district.parent._id
      })[0]
  };
  const updateBrowsingSubDistrict = () => {
    userBrowsingLocationLocalStore.value.subDistrict =
      browsingLocation.subDistrict;
      unionStore.getAllUnions(browsingLocation.subDistrict._id)
      userBrowsingLocationLocalStore.value.union = browsingLocation.union = null
      userBrowsingLocationLocalStore.value.ward = browsingLocation.ward = null
  };
  const updateBrowsingUnion = () => {
    userBrowsingLocationLocalStore.value.union =
      browsingLocation.union;
      wardStore.getAllWards(browsingLocation.union._id)
      userBrowsingLocationLocalStore.value.ward = browsingLocation.ward = null
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
    openBrowsingLocationDialog,
    openFilterByServiceCategoryDialog,
    browsingLocation,
    updateBrowsingDistrict,
    updateBrowsingSubDistrict,
    updateBrowsingUnion,
    updateBrowsingWard,
    updateBrowsingLocationOnMounted,
  }
});
