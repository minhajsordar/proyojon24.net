<template>
  <q-layout class="background-pattern" view="hHh lpR fFf">
    <!-- !$q.screen.gt.sm -->
    <q-header  class="text-white bg-accent-public" height-hint="61.59">
      <!-- <publicUserHeader v-if="Object.keys(loginUser).length == 0" /> -->
      <userProfileHeader/>
    </q-header>

    <q-page-container class="q-page-cont">
      <router-view />
      <div
        class="q-py-sm text-center bg-primary-public text-white full-width footer-area"
      >
        <div class="fs-12">
          <span class="text-secondary-public">Proyojon24.net</span> © 2023 All Rights
          Reserved
        </div>
        <div class="fs-10">
          Developed & Powered By:
          <span class="text-secondary-public">Service Zone Ltd</span>
        </div>
      </div>
    </q-page-container>
    <publicLayoutAllDialogs />
    <profileLayoutAllDialogs />
    <q-footer
      class="q-py-sm bg-accent-public flex justify-around"
      v-if="!$q.screen.gt.sm"
    >
      <q-btn
        icon="home"
        round
        dense
        glossy
        flat
        size="md"
        color="white"
        class="q-mr-sm"
        no-caps
        @click="$router.push('/')"
      />
      <q-btn
        v-if="!$q.screen.gt.sm"
        icon="menu"
        round
        dense
        glossy
        flat
        size="md"
        color="white"
        class="q-mr-sm"
        no-caps
        @click="menuControllerStore.headerMenuMobileScreen = true"
      />
      <q-btn
        icon="arrow_back"
        round
        dense
        glossy
        flat
        size="md"
        color="white"
        class="q-mr-sm"
        no-caps
        @click="$router.back()"
      />
    </q-footer>
  </q-layout>
</template>

<script setup>
import publicUserHeader from "src/components/headers/publicUserHeader.vue";
import userProfileHeader from "src/components/headers/userProfileHeader.vue";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import publicLayoutAllDialogs from "src/components/dialogs/publicLayoutAllDialogs.vue";
import profileLayoutAllDialogs from "src/components/dialogs/profileLayoutAllDialogs.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePinlocationStore } from "src/stores/locations/pinlocationStore";
import { useSearchLocationStore } from "src/stores/service/searchLocation";
import { useLocalStorage } from "@vueuse/core";
import { useMenuControllerStore } from "src/stores/menucontroller/menuControllerStore";
import { useAuthStore } from "src/stores/auth/authStore";
import { isObjEmpty } from "src/global_js/utils";
const languageStore = useLanguageStore();
const pinlocationStore = usePinlocationStore();
pinlocationStore.getGlobalPinlocations();
languageStore.switchToBn();
const router = useRouter();
const menuControllerStore = useMenuControllerStore();
const authStore = useAuthStore();
const loginUser = useLocalStorage("proyojonloginuser", {});
onMounted(()=>{
  if(!isObjEmpty(loginUser.value)){
authStore.loginUserInfo = loginUser.value
  }
})
</script>

<style lang="scss" scoped>
.q-page-cont {
  min-height: 100vh;
  position: relative;
  padding-bottom: 48px !important;
}
@media screen and (max-width: 1024px) {
  .q-page-cont {
    padding-bottom: 100px !important;
  }
}
.footer-area {
  position: absolute;
  bottom: 0px;
}
@media screen and (max-width: 1024px) {
  .footer-area {
    position: absolute;
    bottom: 48px;
  }
}
</style>
