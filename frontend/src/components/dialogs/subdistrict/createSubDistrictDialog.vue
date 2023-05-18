<template>
  <q-dialog
    v-model="subDistrictStore.openSubDistrictCreateDialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
     <q-card class="text-primary">
      <q-bar class="bg-primary text-white">
        <q-space />
        <q-btn
          dense
          flat
          icon="minimize"
          @click="maximizedToggle = false"
          :disable="!maximizedToggle"
        >
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
            >Minimize</q-tooltip
          >
        </q-btn>
        <q-btn
          dense
          flat
          icon="crop_square"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
            >Maximize</q-tooltip
          >
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="fs-18 text-bold">
        {{ $t("location.addnew_subdistrict") }}
      </q-card-section>
      <q-card-section>
        <q-card class="border-primary q-pa-md">
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  Select District
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-select
                    ref="parentEl"
                    v-model="subDistrictStore.subDistrictInfo.parent"
                    :options="districtStore.districtList.districts"
                    :option-label="opt=>Object(opt) === opt && 'name' in opt ? opt.name[languageStore.language] : null"
                    options-dense
                    outlined
                    dense
                    :rules="[requiredSelector]"
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  In English
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-input
                    ref="nameEnEl"
                    v-model="subDistrictStore.subDistrictInfo.name.en"
                    outlined
                    dense
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  বাংলায়
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-input
                    ref="nameBnEl"
                    v-model="subDistrictStore.subDistrictInfo.name.bn"
                    outlined
                    dense
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <q-btn :label="$t('addnew')" @click="createDistrictManager"/>
              </div>
            </div>
          </div>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";
import { useSubDistrictStore } from "src/stores/locations/subDistrictStore";
import { required, requiredSelector } from "src/global_js/utils";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
const languageStore = useLanguageStore();
const districtStore = useDistrictStore();
const subDistrictStore = useSubDistrictStore();
const maximizedToggle = ref(true);
const parentEl = ref(null);
const nameEnEl = ref(null);
const nameBnEl = ref(null);

const createDistrictManager = () => {
  parentEl.value.validate();
  nameEnEl.value.validate();
  nameBnEl.value.validate();
  if (
    parentEl.value.hasError ||
    nameEnEl.value.hasError ||
    nameBnEl.value.hasError
  ) {
    return;
  }
  subDistrictStore.createNewSubDistrict()
};
</script>
