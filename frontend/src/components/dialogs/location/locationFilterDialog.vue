<template>
  <q-dialog v-model="publicUserStore.openBrowsingLocationDialog"
  persistent
  full-height
  >
    <q-card class="q-pa-md">
      <div class="flex justify-between q">
        <div>{{ $t('selectPlace') }}</div>
        <q-icon name="close" v-close-popup
        @click=" publicUserStore.openBrowsingLocationDialog = false"
        />
      </div>
      <q-separator class="q-my-md"/>
      <div class="row q-col-gutter-sm">
        <div class="col-12">
          <div class=" q-py-sm q-px-md bg-blue-grey-10 text-yellow-13" >{{ $t("location.district") }}</div>
        </div>
        <div class="col-12">
          <q-select
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
        <div class="col-12">
          <div class=" q-py-sm q-px-md bg-blue-grey-10 text-yellow-13" >{{ $t("location.subdistrict") }}</div>
        </div>
        <div class="col-12">
          <q-select
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
        <div class="col-12">
          <div class=" q-py-sm q-px-md bg-blue-grey-10 text-yellow-13" >{{ $t("location.union") }}</div>
        </div>
        <div class="col-12">
          <q-select
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
        <div class="col-12">
          <div class=" q-py-sm q-px-md bg-blue-grey-10 text-yellow-13" >{{ $t("location.ward") }}</div>
        </div>
        <div class="col-12">
          <q-select
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
        <div class="col-12">
          <q-btn class="full-width bg-blue-grey-10 text-yellow-13" :label="$t('search')" @click="serviceProviderStore.getAllServiceProvidersByLocation($route.params.id)" v-close-popup />
        </div>
      </div>
    </q-card>
  </q-dialog>
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
import { useServiceProviderStore } from "src/stores/service/serviceProviderStore";
import { useRoute } from "vue-router";
import { usePinlocationStore } from "src/stores/locations/pinlocationStore";
// const route = useRoute()
const userBrowsingLocationLocalStore = useLocalStorage("browsing-location", {});
const serviceProviderStore = useServiceProviderStore();
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

</script>
<style lang="scss"></style>
