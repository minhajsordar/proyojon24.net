<template>
  <q-dialog
    v-model="notificationStore.openCreateNotificationDialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="text-black">
      <q-bar class="bg-accent text-white">
        <q-space />
        <q-btn
          dense
              glossy
          flat
          icon="minimize"
          @click="maximizedToggle = false"
          :disable="!maximizedToggle"
        >
          <q-tooltip v-if="maximizedToggle" class="bg-white text-accent"
            >Minimize</q-tooltip
          >
        </q-btn>
        <q-btn
          dense
              glossy
          flat
          icon="crop_square"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
            >Maximize</q-tooltip
          >
        </q-btn>
        <q-btn dense
              glossy flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="fs-18 text-bold">
        {{ $t("notification.add") }}
      </q-card-section>
      <q-card-section>
        <q-card class="border-primary q-pa-md">
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  {{ $t("notification.title") }} (বাংলা)*
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-input
                    ref="titleBnEl"
                    v-model="notificationStore.notificationInfo.title.bn"
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
                  {{ $t("notification.title") }}  (In English)*
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-input
                    ref="titleEnEl"
                    v-model="notificationStore.notificationInfo.title.en"
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
                  {{ $t("notification.description") }} (বাংলা)*
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-editor
                    ref="descriptionBnEl"
                    v-model="notificationStore.notificationInfo.description.bn"
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
                  {{ $t("notification.description") }} (In English)*
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-editor
                    ref="descriptionEnEl"
                    v-model="notificationStore.notificationInfo.description.en"
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
                  Link
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-input
                    ref="linkEl"
                    v-model="notificationStore.notificationInfo.link"
                    outlined
                    dense
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  Publish?
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-checkbox
                    ref="linkEl"
                    style="margin-left:-8px"
                    v-model="notificationStore.notificationInfo.published"
                    size="md"
                  />
                  Publish now
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <q-btn :label="$t('addnew')" color="light-green-8"
              glossy @click="createNotificationManager"/>
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
import { useDistrictStore } from "src/stores/locations/districtStore";
import { requiredSelector, required } from "src/global_js/utils";
import { useDivisionStore } from "src/stores/locations/divisionStore";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useNotificationStore } from "src/stores/notifications/notificationStore";
const languageStore = useLanguageStore();
const notificationStore = useNotificationStore();
const maximizedToggle = ref(true);
const titleBnEl = ref(null);
const titleEnEl = ref(null);
const descriptionBnEl = ref(null);
const descriptionEnEl = ref(null);

const createNotificationManager = () => {
  titleBnEl.value.validate();
  titleEnEl.value.validate();
  if (
    titleBnEl.value.hasError ||
    titleEnEl.value.hasError
  ) {
    return;
  }
  notificationStore.createNotification()
};
</script>
