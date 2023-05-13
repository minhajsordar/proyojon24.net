<template >
  <div>
    <q-btn label="Logout" color="red" @click="authStore.logoutFunc()"/>
    {{ loginUser?.email }}
    {{ authStore?.loginUserInfo }}
  </div>
</template>
<script setup>
import { useAuthStore, loginUser } from "src/stores/auth/authStore";
import { onMounted } from "vue";
const authStore = useAuthStore()
console.log("page sw")
onMounted(()=>{
  authStore.checkLogin()
})
</script>
<style>

</style>
