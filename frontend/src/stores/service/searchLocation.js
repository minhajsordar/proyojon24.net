import { defineStore } from 'pinia';
import { useDistrictStore } from 'src/stores/locations/districtStore';
import { useSubDistrictStore } from 'src/stores/locations/subDistrictStore';
import { useUnionStore } from 'src/stores/locations/unionStore';
import { useWardStore } from 'src/stores/locations/wardStore';
import { useServiceProviderStore } from 'src/stores/service/serviceProviderStore';
import { usePinlocationStore } from '../locations/pinlocationStore';
export const useSearchLocationStore = defineStore('search location store', () => {
  const serviceProviderStore = useServiceProviderStore()
  const districtStore = useDistrictStore()
  const subDistrictStore = useSubDistrictStore()
  const unionStore = useUnionStore()
  const wardStore = useWardStore()
  const pinlocationStore = usePinlocationStore();

  const updateAllLocation =()=>{
    districtStore.getAllDistricts()
    subDistrictStore.getAllSubDistricts()
    unionStore.getAllUnions()
    wardStore.getAllWards()
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
  const updateWard =()=>{
    wardStore.getAllWards(serviceProviderStore.serviceProviderLocationR.union._id)
  }
  const updatePinlocation =()=>{
    pinlocationStore.getAllPinlocations(serviceProviderStore.serviceProviderLocationR.ward._id)
  }
  return {
    updateAllLocation,
    updateDistrict,
    updateSubDistrict,
    updateUnion,
    updateWard,updatePinlocation
  }
});
