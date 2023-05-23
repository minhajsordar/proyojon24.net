import { defineStore } from 'pinia';
import { useDistrictStore } from '../locations/districtStore';
import { useSubDistrictStore } from '../locations/subDistrictStore';
import { useUnionStore } from '../locations/unionStore';
import { useWardStore } from '../locations/wardStore';
import { useServiceProviderStore } from './serviceProviderStore';
export const useSearchLocationStore = defineStore('search location store', () => {
  const serviceProviderStore = useServiceProviderStore()
  const districtStore = useDistrictStore()
  const subDistrictStore = useSubDistrictStore()
  const unionStore = useUnionStore()
  const wardStore = useWardStore()
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
  return {
    updateDistrict,
    updateSubDistrict,
    updateUnion,
    updateWard
  }
});
