import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useMenuControllerStore = defineStore('menu controller store', () => {
  const headerMenuMobileScreen = ref(false)
  const userMobileMenusRightOpen = ref(false)
  const leftDashboardOpen = ref(false);
  const toggleDashboardDrawer = () => {
    leftDashboardOpen.value = !leftDashboardOpen.value;
  };
  const headerMenuMobileScreenClose = () => {
    headerMenuMobileScreen.value = false
  }
  const userMobileMenusRightOpenClose = () => {
    userMobileMenusRightOpen.value = false
  }
  return {
    headerMenuMobileScreen,
    headerMenuMobileScreenClose,
    leftDashboardOpen,
    toggleDashboardDrawer,
    userMobileMenusRightOpenClose,
    userMobileMenusRightOpen
  }
});
