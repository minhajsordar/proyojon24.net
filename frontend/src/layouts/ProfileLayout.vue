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
import { onMounted, onBeforeMount } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { useDivisionStore } from "src/stores/locations/divisionStore";
import { useSubDistrictStore } from "src/stores/locations/subDistrictStore";
import { useUnionStore } from "src/stores/locations/unionStore";
import { useWardStore } from "src/stores/locations/wardStore";
import { usePublicUserStore } from "src/stores/user/publicStore";
import { socket, state } from "src/socket/socket";
import { usePinlocationStore } from "src/stores/locations/pinlocationStore";
// separator
import userProfileHeader from "src/components/headers/userProfileHeader.vue";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import profileLayoutAllDialogs from "src/components/dialogs/profileLayoutAllDialogs.vue";
import { useAuthStore } from "src/stores/auth/authStore";
import { useRouter } from "vue-router";
// import { onMounted } from "vue";
const languageStore = useLanguageStore();
languageStore.switchToBn();
const router = useRouter();
const authStore = useAuthStore();
onMounted(() => {
  if (!authStore.checkLogin()) {
    router.push("/login");
  }
});

// another
// import { onMounted, onBeforeMount } from "vue";
// import { useLocalStorage } from "@vueuse/core";
// import { useDistrictStore } from "./stores/locations/districtStore";
// import { useDivisionStore } from "./stores/locations/divisionStore";
// import { useSubDistrictStore } from "./stores/locations/subDistrictStore";
// import { useUnionStore } from "./stores/locations/unionStore";
// import { useWardStore } from "./stores/locations/wardStore";
// import { usePublicUserStore } from "./stores/user/publicStore";
// import { socket, state } from "src/socket/socket";
// import { usePinlocationStore } from "./stores/locations/pinlocationStore";
const locationListGlobal = useLocalStorage("global-location-list", {});
const divisionStore = useDivisionStore();
const districtStore = useDistrictStore();
const subDistrictStore = useSubDistrictStore();
const unionStore = useUnionStore();
const wardStore = useWardStore();
const pinlocationStore = usePinlocationStore();
const isEmptyArray = (e) => {
  if (Array.isArray(e) && e.length > 0) {
    return false;
  }
  return true;
};
// if (isEmptyArray(locationListGlobal.value.divisions)) {
//   divisionStore.getGlobalDivisions();
// }
// if (isEmptyArray(locationListGlobal.value.districts)) {
//   districtStore.getGlobalDistricts();
// }
// if (isEmptyArray(locationListGlobal.value.subDistricts)) {
//   subDistrictStore.getGlobalSubDistricts();
// }
// if (isEmptyArray(locationListGlobal.value.unions)) {
//   unionStore.getGlobalUnions();
// }
// if (isEmptyArray(locationListGlobal.value.wards)) {
//   wardStore.getGlobalWards();
// }
onMounted(() => {
  divisionStore.getGlobalDivisions();
  districtStore.getGlobalDistricts();
  subDistrictStore.getGlobalSubDistricts();
  unionStore.getGlobalUnions();
  pinlocationStore.getGlobalPinlocations();
})
</script>

<style lang="sass"></style>
