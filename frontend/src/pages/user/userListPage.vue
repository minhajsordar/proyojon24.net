<template >
  <div class="container-section-py-sm">
    <div class="inner-section">
    User Lists
    </div>
    </div>
</template>
<script setup>
import { useAuthStore } from "src/stores/auth/authStore";
import { onMounted } from "vue";
const authStore = useAuthStore()
onMounted(()=>{
  authStore.checkLogin()
})
</script>
<style>

</style>
