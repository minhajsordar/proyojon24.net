import { defineStore } from 'pinia';
import { useDistrictStore } from 'src/stores/locations/districtStore';
import { useSubDistrictStore } from 'src/stores/locations/subDistrictStore';
import { useUnionStore } from 'src/stores/locations/unionStore';
import { useServiceProviderStore } from 'src/stores/service/serviceProviderStore';
import { usePinlocationStore } from '../locations/pinlocationStore';
import { useLocalStorage } from '@vueuse/core';
const browsingLocation = useLocalStorage('browsing-location', {})

export const useSearchLocationStore = defineStore('search location store', () => {
  const serviceProviderStore = useServiceProviderStore()
  const districtStore = useDistrictStore()
  const subDistrictStore = useSubDistrictStore()
  const unionStore = useUnionStore()
  const pinLocationStore = usePinlocationStore()

  const updateAllLocation =()=>{
    districtStore.getAllDistricts()
    subDistrictStore.getAllSubDistricts()
    unionStore.getAllUnions()
    pinLocationStore.getAllPinlocations()
  }
  const updateDistrict =()=>{
    districtStore.getAllDistricts(serviceProviderStore.serviceProviderLocationR.division._id)
  }
  const updateSubDistrict =()=>{
    subDistrictStore.getAllSubDistricts(serviceProviderStore.serviceProviderLocationR.district._id)
  }
  const updateUnion =()=>{
    unionStore.getAllUnions(serviceProviderStore.serviceProviderLocationR.subDistrict._id)
  }
  const updatePinLocation =()=>{
    pinLocationStore.getAllPinlocations(serviceProviderStore.serviceProviderLocationR.union._id)
  }
  const updateAllLocationByBrowsingLocation =()=>{
    // if (browsingLocation.value.division) {
    //   districtStore.getAllDistricts(browsingLocation.value.division._id);
    // }
    if (browsingLocation.value.district) {
      subDistrictStore.getAllSubDistricts(browsingLocation.value.district._id);
    }
    if (browsingLocation.value.subDistrict) {
      unionStore.getAllUnions(browsingLocation.value.subDistrict._id);
    }
    if (browsingLocation.value.union) {
      pinLocationStore.getAllPinlocations(browsingLocation.value.union._id);
    }
  }
  return {
    updateAllLocation,
    updateDistrict,
    updateSubDistrict,
    updateUnion,
    updatePinLocation,
    updateAllLocationByBrowsingLocation
  }
});
