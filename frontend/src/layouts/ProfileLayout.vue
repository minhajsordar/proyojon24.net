<template>
  <q-layout class="bg-grey-1">
    <q-header elevated class="text-white" height-hint="61.59">
      <userProfileHeader />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <profileLayoutAllDialogs />
    <q-footer class="q-py-sm text-center bg-blue-grey-10">
      <div class="fs-12">
        <span class="text-yellow">Proyojon24.net</span> © 2023 All Rights
        Reserved
      </div>
      <div class="fs-10">
        Developed & Powered By:
        <span class="text-yellow">Service Zone Ltd</span>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import userProfileHeader from "src/components/headers/userProfileHeader.vue";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import profileLayoutAllDialogs from "src/components/dialogs/profileLayoutAllDialogs.vue";
import { useAuthStore } from "src/stores/auth/authStore";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
const languageStore = useLanguageStore();
languageStore.switchToBn();
const router = useRouter();
const authStore = useAuthStore();
onMounted(() => {
  if (!authStore.checkLogin()) {
    router.push("/login");
  }
});
</script>

<style lang="sass"></style>
