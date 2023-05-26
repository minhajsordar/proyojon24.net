import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue';
export const usePublicUserStore = defineStore('Public user store', () => {
  const router = useRouter()
  const selectedLocation = ref(null)
  return {
    selectedLocation,
  }
});
