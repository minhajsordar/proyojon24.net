<template>
  <q-dialog
    v-model="ourBusinessPartners.openBusinessPartnersAddDialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="text-primary">
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
        {{ $t("partners.add_new_partners") }}
      </q-card-section>
      <q-card-section>
        <q-card class="border-primary q-pa-md">
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  Name
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-input
                    ref="nameEnEl"
                    v-model="ourBusinessPartners.ourBusinessPartnersInfo.name"
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
                  sub Title
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-input
                    ref="nameBnEl"
                    v-model="ourBusinessPartners.ourBusinessPartnersInfo.subTitle"
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
                  Image
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-file
                    ref="imageEl"
                    v-model="ourBusinessPartners.ourBusinessPartnerImage"
                    outlined
                    dense
                    :rules="[fileValidate]"
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <q-btn :label="$t('addnew')" color="light-green-8"
              glossy @click="createBusinessPartnerManager"/>
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
import { required, fileValidate } from "src/global_js/utils";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useOurBusinessPartnersStore } from "src/stores/dashboard/ourBusinessPartnersStore";
import { web_root_url } from "src/global_constant/root_url";
const ourBusinessPartners = useOurBusinessPartnersStore()
ourBusinessPartners.getourBusinessPartnersList();
const languageStore = useLanguageStore();
const dialog = ref(false);
const maximizedToggle = ref(true);
const imageEl = ref(null);
const nameEnEl = ref(null);
const nameBnEl = ref(null);

const createBusinessPartnerManager = () => {
  imageEl.value.validate();
  nameEnEl.value.validate();
  nameBnEl.value.validate();
  if (
    imageEl.value.hasError ||
    nameEnEl.value.hasError ||
    nameBnEl.value.hasError
  ) {
    return;
  }
  ourBusinessPartners.createOurBusinessPartners()
};
</script>
