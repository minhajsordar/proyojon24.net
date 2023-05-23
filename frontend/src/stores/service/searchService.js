import { defineStore } from 'pinia';
import { useServiceProviderStore } from './serviceProviderStore';
import { useServiceStore } from './serviceStore';
import { useServiceCategoryStore } from './serviceCategoryStore';
export const useSearchServiceStore = defineStore('search service store', () => {
  const serviceProviderStore = useServiceProviderStore()
  const serviceStore = useServiceStore()
  const serviceCategoryStore = useServiceCategoryStore()
  const updateServiceCategory =()=>{
    serviceCategoryStore.getAllServiceCategorys(serviceProviderStore.serviceProviderInfo.serviceCategory._id)
  }
  const updateServiceCategoryOnServiceProviderTable =()=>{
    serviceCategoryStore.getAllServiceCategorys(serviceProviderStore.filteredByServiseId._id)
  }
  return {
    updateServiceCategory,
    updateServiceCategoryOnServiceProviderTable
  }
});
