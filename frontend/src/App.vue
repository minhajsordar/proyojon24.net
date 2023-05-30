<template>
  <router-view />
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core";
import { useDistrictStore } from "./stores/locations/districtStore";
import { useDivisionStore } from "./stores/locations/divisionStore";
import { useSubDistrictStore } from "./stores/locations/subDistrictStore";
import { useUnionStore } from "./stores/locations/unionStore";
import { useWardStore } from "./stores/locations/wardStore";

const locationListGlobal = useLocalStorage("global-location-list", {});
const divisionStore = useDivisionStore();
const districtStore = useDistrictStore();
const subDistrictStore = useSubDistrictStore();
const unionStore = useUnionStore();
const wardStore = useWardStore();
const isEmptyArray = (e) => {
  if (Array.isArray(e) && e.length > 0) {
    return false;
  }
  return true;
};
if (isEmptyArray(locationListGlobal.divisions)) {
  divisionStore.getGlobalDivisions();
}
if (isEmptyArray(locationListGlobal.districts)) {
  districtStore.getGlobalDistricts();
}
if (isEmptyArray(locationListGlobal.subDistricts)) {
  subDistrictStore.getGlobalSubDistricts();
}
if (isEmptyArray(locationListGlobal.unions)) {
  unionStore.getGlobalUnions();
}
if (isEmptyArray(locationListGlobal.wards)) {
  wardStore.getGlobalWards();
}
</script>
