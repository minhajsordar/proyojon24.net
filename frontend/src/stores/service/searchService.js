import { defineStore } from 'pinia';
import { useServiceProviderStore } from './serviceProviderStore';
import { useServiceStore } from './serviceStore';
import { useServiceCategoryStore } from './serviceCategoryStore';
export const useSearchServiceStore = defineStore('search service store', () => {
  const serviceProviderStore = useServiceProviderStore()
  const serviceStore = useServiceStore()
  const serviceCategoryStore = useServiceCategoryStore()
  const updateServiceCategoryForService =()=>{
    serviceCategoryStore.getAllServiceCategorys(serviceCategoryStore?.filteredByServiseId?._id)
  }
  const updateServiceCategory =()=>{
    serviceCategoryStore.getAllServiceCategorys(serviceProviderStore.serviceProviderInfo.service._id)
    serviceCategoryStore.getServiceCategoryList()
  }
  const updateServiceCategoryOnServiceProviderTable =()=>{
    serviceCategoryStore.getAllServiceCategorys(serviceCategoryStore.filteredByServiseId._id)
  }
  return {
    updateServiceCategory,
    updateServiceCategoryForService,
    updateServiceCategoryOnServiceProviderTable
  }
});
