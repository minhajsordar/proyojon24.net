import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useMenuControllerStore = defineStore('menu controller store', ()=>{
  const headerMenuMobileScreen = ref(false)
  const headerMenuMobileScreenClose = ()=>{
    headerMenuMobileScreen.value = false
  }
     return{
      headerMenuMobileScreen,
      headerMenuMobileScreenClose
     }
});
