<template>
  <router-view />
</template>

<script setup>
import { onMounted, onBeforeMount } from "vue";
// import { useLocalStorage } from "@vueuse/core";
// import { useDistrictStore } from "./stores/locations/districtStore";
// import { useDivisionStore } from "./stores/locations/divisionStore";
// import { useSubDistrictStore } from "./stores/locations/subDistrictStore";
// import { useUnionStore } from "./stores/locations/unionStore";
// import { useWardStore } from "./stores/locations/wardStore";
import { usePublicUserStore } from "./stores/user/publicStore";
// import { usePinlocationStore } from "./stores/locations/pinlocationStore";
// const locationListGlobal = useLocalStorage("global-location-list", {});
// const divisionStore = useDivisionStore();
// const districtStore = useDistrictStore();
// const subDistrictStore = useSubDistrictStore();
// const unionStore = useUnionStore();
// const wardStore = useWardStore();
// const pinlocationStore = usePinlocationStore();
// const isEmptyArray = (e) => {
//   if (Array.isArray(e) && e.length > 0) {
//     return false;
//   }
//   return true;
// };
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
// const refresh = (done) => {
//   divisionStore.getGlobalDivisions();
//   districtStore.getGlobalDistricts();
//   subDistrictStore.getGlobalSubDistricts();
//   unionStore.getGlobalUnions();
//   wardStore.getGlobalWards();
//   setTimeout(() => {
//     done();
//   }, 2000);
// };
// onMounted(() => {
//   divisionStore.getGlobalDivisions();
//   districtStore.getGlobalDistricts();
//   subDistrictStore.getGlobalSubDistricts();
//   unionStore.getGlobalUnions();
//   pinlocationStore.getGlobalPinlocations();
// })
const publicUserStore = usePublicUserStore()
onBeforeMount(() => {
  publicUserStore.updateBrowsingLocationOnMounted();
});
</script>
