<template>
  <div class="row q-col-gutter-sm">
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 col-6">
      <q-select
        :label="$t('location.district')"
        stack-label
        v-model="publicUserStore.browsingLocation.district"
        :options="districtStore.allDistricts"
        options-dense
        :option-label="
          (opt) =>
            Object(opt) === opt && 'name' in opt
              ? opt.name[languageStore.language]
              : null
        "
        @update:model-value="publicUserStore.updateBrowsingDistrict"
        bg-color="white"
        color="black"
        outlined
        dense
      />
    </div>
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 col-6">
      <q-select
        :label="$t('location.subdistrict')"
        stack-label
        v-model="publicUserStore.browsingLocation.subDistrict"
        :options="subDistrictStore.allSubDistricts"
        options-dense
        :option-label="
          (opt) =>
            Object(opt) === opt && 'name' in opt
              ? opt.name[languageStore.language]
              : null
        "
        @update:model-value="publicUserStore.updateBrowsingSubDistrict"
        bg-color="white"
        color="black"
        outlined
        dense
      />
    </div>
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 col-6">
      <q-select
        :label="$t('location.union')"
        stack-label
        v-model="publicUserStore.browsingLocation.union"
        :options="unionStore.allUnions"
        options-dense
        :option-label="
          (opt) =>
            Object(opt) === opt && 'name' in opt
              ? opt.name[languageStore.language]
              : null
        "
        @update:model-value="publicUserStore.updateBrowsingUnion"
        bg-color="white"
        color="black"
        outlined
        dense
      />
    </div>
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 col-6">
      <q-select
        :label="$t('location.ward')"
        stack-label
        v-model="publicUserStore.browsingLocation.ward"
        :options="wardStore.allWards"
        options-dense
        :option-label="
          (opt) =>
            Object(opt) === opt && 'name' in opt
              ? opt.name[languageStore.language]
              : null
        "
        @update:model-value="publicUserStore.updateBrowsingWard"
        bg-color="white"
        color="black"
        outlined
        dense
      />
    </div>
  </div>
</template>
<script setup>
import { useLocalStorage } from "@vueuse/core";
import { useMeta } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { usePublicUserStore } from "src/stores/user/publicStore";
import { ref, onBeforeMount } from "vue";
import { isObjEmpty } from "src/global_js/utils";
import { useSubDistrictStore } from "src/stores/locations/subDistrictStore";
import { useUnionStore } from "src/stores/locations/unionStore";
import { useWardStore } from "src/stores/locations/wardStore";
import { usePinlocationStore } from "src/stores/locations/pinlocationStore";
const userBrowsingLocationLocalStore = useLocalStorage("browsing-location", {});
const publicUserStore = usePublicUserStore();
const languageStore = useLanguageStore();
const districtStore = useDistrictStore();
districtStore.getAllDistricts();
const subDistrictStore = useSubDistrictStore();
subDistrictStore.getAllSubDistricts();
const unionStore = useUnionStore();
unionStore.getAllUnions();
const wardStore = useWardStore();
wardStore.getAllWards();

const pinlocationStore = usePinlocationStore();
pinlocationStore.getAllPinlocations();

onBeforeMount(() => {
  publicUserStore.updateBrowsingLocationOnMounted();
});
</script>
<style lang="scss"></style>
