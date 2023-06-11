<template>
  <q-dialog
    v-model="pinlocationStore.openPinlocationCreateDialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="text-black">
      <q-bar class="bg-primary text-white">
        <q-space />
        <q-btn
          dense glossy
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
          dense glossy
          flat
          icon="crop_square"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
            >Maximize</q-tooltip
          >
        </q-btn>
        <q-btn dense glossy flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="fs-18 text-bold">
        {{ $t("location.addnew_pinlocation") }}
      </q-card-section>
      <q-card-section>
        <q-card class="border-primary q-pa-md">
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  {{ $t('location.selectUnion') }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-select
                    ref="parentEl"
                    v-model="pinlocationStore.pinlocationInfo.parent"
                    :options="unionStore.unionList?.unions"
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
                    v-model="pinlocationStore.pinlocationInfo.name.en"
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
                    v-model="pinlocationStore.pinlocationInfo.name.bn"
                    outlined
                    dense
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <q-btn :label="$t('addnew')" color="light-green-8"
              glossy @click="createPinlocationManager"/>
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
import { required, requiredSelector } from "src/global_js/utils";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { usePinlocationStore } from "src/stores/locations/pinlocationStore";
import { useUnionStore } from "src/stores/locations/unionStore";
const languageStore = useLanguageStore();
const pinlocationStore = usePinlocationStore();
const unionStore = useUnionStore();
const dialog = ref(false);
const maximizedToggle = ref(true);
const parentEl = ref(null);
const nameEnEl = ref(null);
const nameBnEl = ref(null);

const createPinlocationManager = () => {
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
  pinlocationStore.createNewPinlocation()
};
</script>
