<template>
  <q-dialog
    v-model="serviceCategoryStore.openServiceCategoryPreviewDialog"
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
        {{ $t("preview") }}
      </q-card-section>
      <q-card-section>
        <q-card class="border-primary q-pa-md">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  {{ $t('inenglish') }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                 {{ serviceCategoryStore.serviceCategoryInfo.name.en }}
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  {{ $t('inbangla') }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                 {{ serviceCategoryStore.serviceCategoryInfo.name.bn }}
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  {{ $t("icon") }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-img :src="web_root_url+serviceCategoryStore.serviceCategoryInfo.icon" style="width:200px;"/>
                </div>
              </div>
            </div>
            <!-- <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  {{ $t("coverimage") }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-img :src="web_root_url + serviceCategoryStore.serviceCategoryInfo.coverImage"/>
                </div>
              </div>
            </div> -->
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  {{ $t("premiumRegistrationFee") }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  {{ serviceCategoryStore.serviceCategoryInfo?.premiumRegistrationFee }}
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <q-btn label="closse" color="primary"
              glossy icon="arrow_back" @click="serviceCategoryStore.openServiceCategoryPreviewDialog = false"/>
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
import { useUserStore } from "src/stores/user/userStore";
import { useServiceCategoryStore } from "src/stores/service/serviceCategoryStore";
import { web_root_url } from 'src/global_constant/root_url';
const languageStore = useLanguageStore();
const serviceCategoryStore = useServiceCategoryStore();
const maximizedToggle = ref(true);

</script>
