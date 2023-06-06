import { defineStore } from 'pinia';
import { useDistrictStore } from 'src/stores/locations/districtStore';
import { useSubDistrictStore } from 'src/stores/locations/subDistrictStore';
import { useUnionStore } from 'src/stores/locations/unionStore';
import { useServiceProviderStore } from 'src/stores/service/serviceProviderStore';
import { usePinlocationStore } from '../locations/pinlocationStore';
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
  return {
    updateAllLocation,
    updateDistrict,
    updateSubDistrict,
    updateUnion,
    updatePinLocation
  }
});
