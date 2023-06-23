<template>
  <q-dialog
    v-model="publicUserStore.openBrowsingLocationDialog"
    persistent
    full-height
  >
    <q-card class="q-pa-md">
      <div class="flex justify-between q">
        <div>{{ $t("selectPlace") }}</div>
        <q-icon
          name="close"
          v-close-popup
          @click="publicUserStore.openBrowsingLocationDialog = false"
        />
      </div>
      <q-separator class="q-my-md" />
      <div class="row q-col-gutter-sm">
        <div class="col-12">
          <div class="q-py-sm q-px-md bg-accent text-white">
            {{ $t("location.district") }}
          </div>
        </div>
        <div class="col-12">
          <q-select
            v-model="publicUserStore.browsingLocation.district"
            :options="districtOptions"
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
            clearable
            use-input
            input-debounce="0"
            @filter="districtFilterFn"
          />
        </div>
        <div class="col-12">
          <div class="q-py-sm q-px-md bg-accent text-white">
            {{ $t("location.subdistrict") }}
          </div>
        </div>
        <div class="col-12">
          <q-select
            v-model="publicUserStore.browsingLocation.subDistrict"
            :options="subDistrictOptions"
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
            clearable
            use-input
            input-debounce="0"
            @filter="subDistrictFilterFn"
          />
        </div>
        <div class="col-12">
          <div class="q-py-sm q-px-md bg-accent text-white">
            {{ $t("location.union") }}
          </div>
        </div>
        <div class="col-12">
          <q-select
            v-model="publicUserStore.browsingLocation.union"
            :options="unionOptions"
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
            clearable
            use-input
            input-debounce="0"
            @filter="unionFilterFn"
          />
        </div>
        <div class="col-12">
          <div class="q-py-sm q-px-md bg-accent text-white">
            {{ $t("location.pinlocation") }}
          </div>
        </div>
        <div class="col-12">
          <q-select
            v-model="publicUserStore.browsingLocation.pinlocation"
            :options="pinlocationOptions"
            options-dense
            :option-label="
              (opt) =>
                Object(opt) === opt && 'name' in opt
                  ? opt.name[languageStore.language]
                  : null
            "
            @update:model-value="publicUserStore.updateBrowsingPinlocation"
            bg-color="white"
            color="black"
            outlined
            dense
            clearable
            use-input
            input-debounce="0"
            @filter="pinlocationFilterFn"
          />
        </div>
        <div class="col-12">
          <q-btn
            class="full-width bg-accent text-white"
            :label="$t('search')"
            @click="
              serviceProviderFilterStore.getPublicServiceProvidersByLocation(
                $route.params.id
              )
            "
            v-close-popup
          />
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
import { useRoute } from "vue-router";
import { usePinlocationStore } from "src/stores/locations/pinlocationStore";
import { useDivisionStore } from "src/stores/locations/divisionStore";
import { useServiceProviderFilterStore } from "src/stores/service/serviceProviderFilterStore";
const userBrowsingLocationLocalStore = useLocalStorage("browsing-location", {});
const serviceProviderFilterStore = useServiceProviderFilterStore()
const publicUserStore = usePublicUserStore();
const languageStore = useLanguageStore();
const divisionStore = useDivisionStore();
divisionStore.getAllDivisions();
const districtStore = useDistrictStore();
districtStore.getAllDistricts();
const subDistrictStore = useSubDistrictStore();
subDistrictStore.getAllSubDistricts();
const unionStore = useUnionStore();
unionStore.getAllUnions();
const pinlocationStore = usePinlocationStore();
pinlocationStore.getAllPinlocations();

const divisionOptions = ref(divisionStore.allDivisions);
const divisionFilterFn = (val, update) => {
  if (val === "") {
    update(() => {
      divisionOptions.value = divisionStore.allDivisions;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    divisionOptions.value = divisionStore.allDivisions.filter((v) => {
      console.log(v);
      return v.name[languageStore.language].toLowerCase().indexOf(needle) > -1;
    });
  });
};

const districtOptions = ref(districtStore.allDistricts);
const districtFilterFn = (val, update) => {
  if (val === "") {
    update(() => {
      districtOptions.value = districtStore.allDistricts;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    districtOptions.value = districtStore.allDistricts.filter((v) => {
      console.log(v);
      return v.name[languageStore.language].toLowerCase().indexOf(needle) > -1;
    });
  });
};

const subDistrictOptions = ref(subDistrictStore.allSubDistricts);
const subDistrictFilterFn = (val, update) => {
  if (val === "") {
    update(() => {
      subDistrictOptions.value = subDistrictStore.allSubDistricts;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    subDistrictOptions.value = subDistrictStore.allSubDistricts.filter((v) => {
      console.log(v);
      return v.name[languageStore.language].toLowerCase().indexOf(needle) > -1;
    });
  });
};

const unionOptions = ref(unionStore.allUnions);
const unionFilterFn = (val, update) => {
  if (val === "") {
    update(() => {
      unionOptions.value = unionStore.allUnions;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    unionOptions.value = unionStore.allUnions.filter((v) => {
      console.log(v);
      return v.name[languageStore.language].toLowerCase().indexOf(needle) > -1;
    });
  });
};

const pinlocationOptions = ref(pinlocationStore.allPinlocations);
const pinlocationFilterFn = (val, update) => {
  if (val === "") {
    update(() => {
      pinlocationOptions.value = pinlocationStore.allPinlocations;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    pinlocationOptions.value = pinlocationStore.allPinlocations.filter((v) => {
      console.log(v);
      return v.name[languageStore.language].toLowerCase().indexOf(needle) > -1;
    });
  });
};
</script>
<style lang="scss"></style>
