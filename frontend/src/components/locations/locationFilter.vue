<template>
  <div class="row q-col-gutter-sm">
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 col-6">
      <q-select
        :label="$t('location.district')"
        stack-label
        v-model="publicUserStore.browsingLocation.district"
        :options="districtOptions"
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
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 col-6">
      <q-select
        :label="$t('location.subdistrict')"
        stack-label
        v-model="publicUserStore.browsingLocation.subDistrict"
        :options="subDistrictOptions"
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
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 col-6">
      <q-select
        :label="$t('location.union')"
        stack-label
        v-model="publicUserStore.browsingLocation.union"
        :options="unionOptions"
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

const pinlocationStore = usePinlocationStore();
pinlocationStore.getAllPinlocations();

const districtOptions = ref(districtStore.allDistricts)
const districtFilterFn =(val, update)=>{
        if (val === '') {
          update(() => {
            districtOptions.value = districtStore.allDistricts

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          districtOptions.value = districtStore.allDistricts.filter(v => {
            console.log(v)
            return v.name[languageStore.language].toLowerCase().indexOf(needle) > -1
          })
        })

}

const subDistrictOptions = ref(subDistrictStore.subDistrictList?.subDistricts)
const subDistrictFilterFn =(val, update)=>{
        if (val === '') {
          update(() => {
            subDistrictOptions.value = subDistrictStore.subDistrictList?.subDistricts

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          subDistrictOptions.value = subDistrictStore.subDistrictList?.subDistricts.filter(v => {
            console.log(v)
            return v.name[languageStore.language].toLowerCase().indexOf(needle) > -1
          })
        })

}

const unionOptions = ref(unionStore.unionList?.unions)
const unionFilterFn =(val, update)=>{
        if (val === '') {
          update(() => {
            unionOptions.value = unionStore.unionList?.unions

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          unionOptions.value = unionStore.unionList?.unions.filter(v => {
            console.log(v)
            return v.name[languageStore.language].toLowerCase().indexOf(needle) > -1
          })
        })

}

onBeforeMount(() => {
  publicUserStore.updateBrowsingLocationOnMounted();
});
</script>
<style lang="scss"></style>
