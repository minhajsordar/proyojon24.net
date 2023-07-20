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
import { usePinlocationStore } from '../locations/pinlocationStore';
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
    pinlocation: null
  })
  const languageStore = useLanguageStore();
  const pinlocationStore = usePinlocationStore();
  const unionStore = useUnionStore();
  const subDistrictStore = useSubDistrictStore();
  const districtStore = useDistrictStore();
  districtStore.getAllDistricts();

  const openBrowsingLocationManager = () => {
    openBrowsingLocationDialog.value = true
    updateBrowsingSubDistrict()
    updateBrowsingUnion()
    updateBrowsingPinlocation()
  }

  const updateBrowsingDistrict = () => {
    userBrowsingLocationLocalStore.value.district =
      browsingLocation.district;
    subDistrictStore.getAllSubDistricts(browsingLocation.district?._id)
    userBrowsingLocationLocalStore.value.subDistrict = browsingLocation.subDistrict = null
    userBrowsingLocationLocalStore.value.union = browsingLocation.union = null
    userBrowsingLocationLocalStore.value.pinlocation = browsingLocation.pinlocation = null

    if (browsingLocation.division) {
      userBrowsingLocationLocalStore.value.division = browsingLocation.division = locationListGlobal.value.divisions.filter(e => {
        return e._id == browsingLocation.district.parent._id
      })[0]
    } else {
      userBrowsingLocationLocalStore.value.division = browsingLocation.division = locationListGlobal.value.divisions.filter(e => {
        return true
      })
    }
  };
  const updateBrowsingSubDistrict = () => {
    userBrowsingLocationLocalStore.value.subDistrict =
      browsingLocation.subDistrict;
      console.log(userBrowsingLocationLocalStore.value.subDistrict?._id);
    unionStore.getAllUnions(userBrowsingLocationLocalStore.value.subDistrict?._id)
    userBrowsingLocationLocalStore.value.union = browsingLocation.union = null
    userBrowsingLocationLocalStore.value.pinlocation = browsingLocation.pinlocation = null
  };
  const updateBrowsingUnion = () => {
    userBrowsingLocationLocalStore.value.union =
      browsingLocation.union;
    pinlocationStore.getAllPinlocations(userBrowsingLocationLocalStore.value.union?._id)
    userBrowsingLocationLocalStore.value.pinlocation = browsingLocation.pinlocation = null
  };
  const updateBrowsingPinlocation = () => {
    userBrowsingLocationLocalStore.value.pinlocation =
      browsingLocation.pinlocation;
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
      browsingLocation.pinlocation =
        userBrowsingLocationLocalStore.value.pinlocation;
    }

  }

  return {
    openBrowsingLocationDialog,
    openBrowsingLocationManager,
    openFilterByServiceCategoryDialog,
    browsingLocation,
    updateBrowsingDistrict,
    updateBrowsingSubDistrict,
    updateBrowsingUnion,
    updateBrowsingPinlocation,
    updateBrowsingLocationOnMounted,
  }
});
