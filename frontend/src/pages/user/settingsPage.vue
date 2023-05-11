<template >
  <div>
    Setting page
  </div>
</template>
<script setup>
import { useAuthStore, loginUser } from "src/stores/auth/authStore";
import { onMounted } from "vue";
const authStore = useAuthStore()
onMounted(()=>{
  authStore.checkLogin()
})
</script>
<style>

</style>
