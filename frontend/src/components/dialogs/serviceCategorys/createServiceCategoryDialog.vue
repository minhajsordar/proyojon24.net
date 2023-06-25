<template>
  <q-dialog
    v-model="serviceCategoryStore.openServiceCategoryCreateDialog"
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
        {{ $t("services.addnew_service_category") }}
      </q-card-section>
      <q-card-section>
        <q-card class="border-primary q-pa-md">
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  Service
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-select
                    ref="parentEl"
                    v-model="serviceCategoryStore.serviceCategoryInfo.service"
                    :options="serviceStore.serviceList.services"
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
                  {{ $t('inenglish') }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-input
                    ref="nameEnEl"
                    v-model="serviceCategoryStore.serviceCategoryInfo.name.en"
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
                  {{ $t('inbangla') }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-input
                    ref="nameBnEl"
                    v-model="serviceCategoryStore.serviceCategoryInfo.name.bn"
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
                  {{ $t("addicon") }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-file
                    outlined
                    dense
                    v-model="serviceCategoryStore.imageIcon"
                    :rules="[fileValidate]"
                    label="Add png image"
                    accept=".png,"
                    max-total-size="20480"
                    use-chips
                    @update:model-value="serviceCategoryStore.uploadIcon"
                    @rejected="onRejected"
                    ref="iconEl"
                  >
                    <template v-slot:prepend>
                      <q-icon name="cloud_upload" /> </template
                  ></q-file>
                  <!-- <span >{{ $t("or") }}</span>
                  <q-input
                  class="q-mt-sm"
                    outlined
                    dense
                    v-model="serviceCategoryStore.serviceCategoryInfo.icon"
                    :rules="[required]"
                    label="Add image Url"
                  /> -->
                </div>
              </div>
            </div>
            <!-- <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  {{ $t("addcoverimage") }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-file
                    outlined
                    dense
                    v-model="serviceCategoryStore.imageCover"
                    :rules="[fileValidate]"
                    label="Add image"
                    accept=".jpg, .png, .jpeg"
                    max-total-size="8000000"
                    use-chips
                    @update:model-value="serviceCategoryStore.uploadCoverImage"
                    @rejected="onRejected"
                  >
                    <template v-slot:prepend>
                      <q-icon name="cloud_upload" /> </template
                  ></q-file>
                  <span >{{ $t("or") }}</span>
                  <q-input
                  class="q-mt-sm"
                    ref="coverImageEl"
                    outlined
                    dense
                    v-model="serviceCategoryStore.serviceCategoryInfo.coverImage"
                    :rules="[required]"
                    label="Add image Url"
                  />
                </div>
              </div>
            </div> -->
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  {{ $t("serial") }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-input
                    ref="serialEl"
                    outlined
                    dense
                    type="number"
                    :min="0"
                    v-model="serviceCategoryStore.serviceCategoryInfo.order"
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <q-btn :label="$t('addnew')" @click="createServiceManager" color="light-green-8"
              glossy />
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
import { Notify } from "quasar";
import { requiredSelector, required, fileValidate } from "src/global_js/utils";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useUserStore } from "src/stores/user/userStore";
import { useServiceCategoryStore } from "src/stores/service/serviceCategoryStore";
import { useServiceStore } from "src/stores/service/serviceStore";

const languageStore = useLanguageStore();
const serviceCategoryStore = useServiceCategoryStore();
const serviceStore = useServiceStore();
const maximizedToggle = ref(true);
const parentEl = ref(null);
const nameEnEl = ref(null);
const nameBnEl = ref(null);
const iconEl = ref(null);
const serialEl = ref(null);
const coverImageEl = ref(null);

const createServiceManager = () => {
  parentEl.value.validate();
  nameEnEl.value.validate();
  nameBnEl.value.validate();
  iconEl.value.validate();
  coverImageEl.value.validate();
  serialEl.value.validate();
  if (
    parentEl.value.hasError ||
    nameEnEl.value.hasError ||
    nameBnEl.value.hasError ||
    iconEl.value.hasError ||
    coverImageEl.value.hasError ||
    serialEl.value.hasError
  ) {
    return;
  }
  serviceCategoryStore.createServiceCategory();
};
const onRejected = (rejectedEntries) => {
  // Notify plugin needs to be installed
  // https://quasar.dev/quasar-plugins/notify#Installation
  Notify.create({
    position: "center",
    type: "negative",
    message: `Choosen file size too big`,
  });
};
</script>
