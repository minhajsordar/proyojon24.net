<template>
  <q-dialog
    v-model="serviceStore.openServicePreviewDialog"
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
        {{ $t("preview") }}
      </q-card-section>
      <q-card-section>
        <q-card class="border-primary q-pa-md">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  Name In English
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                 {{ serviceStore.serviceInfo.name.en }}
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  নাম বাংলায়
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                 {{ serviceStore.serviceInfo.name.bn }}
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  {{ $t("icon") }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-img :src="serviceStore.serviceInfo.icon" style="width:200px;"/>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  {{ $t("coverimage") }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-img :src="serviceStore.serviceInfo.coverImage"/>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  {{ $t("serial") }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  {{ serviceStore.serviceInfo.order }}
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <q-btn label="closse" color="primary" glossy icon="arrow_back" @click="serviceStore.openServicePreviewDialog = false"/>
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
import { requiredSelector, required, fileValidate } from "src/global_js/utils";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useServiceStore } from "src/stores/service/serviceStore";
import { useUserStore } from "src/stores/user/userStore";
const languageStore = useLanguageStore();
const serviceStore = useServiceStore();
const maximizedToggle = ref(true);

</script>
