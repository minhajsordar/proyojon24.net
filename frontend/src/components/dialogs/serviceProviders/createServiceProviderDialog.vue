<template>
  <q-dialog
    v-model="serviceProviderStore.openServiceProviderCreateDialog"
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
          glossy
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
        <q-btn dense glossy flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="fs-18 text-bold">
        {{ $t("services.addnew_service_provider") }}
      </q-card-section>
      <q-card-section>
        <q-card class="border-primary q-pa-md">
          <div class="row q-col-gutter-sm">
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("services.services") }}*
                </div>
                <div class="col-12">
                  <q-select
                    ref="grandParentEl"
                    v-model="serviceProviderStore.serviceProviderInfo.service"
                    :options="serviceStore.serviceList.services"
                    :option-label="
                      (opt) =>
                        Object(opt) === opt && 'name' in opt
                          ? opt.name[languageStore.language]
                          : null
                    "
                    options-dense
                    outlined
                    dense
                    :rules="[requiredSelector]"
                    @update:model-value="
                      searchServiceStore.updateServiceCategory
                    "
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("services.service_category") }}*
                </div>
                <div class="col-12">
                  <q-select
                    ref="parentEl"
                    v-model="
                      serviceProviderStore.serviceProviderInfo.serviceCategory
                    "
                    :options="serviceCategoryStore.allServiceCategoryList"
                    :option-label="
                      (opt) =>
                        Object(opt) === opt && 'name' in opt
                          ? opt.name[languageStore.language]
                          : null
                    "
                    options-dense
                    outlined
                    dense
                    :rules="[requiredSelector]"
                  />
                </div>
              </div>
            </div>
            <!-- start service provider location -->
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("location.division") }}*
                </div>
                <div class="col-12">
                  <q-select
                    ref="divisionEl"
                    v-model="
                      serviceProviderStore.serviceProviderLocationR.division
                    "
                    :options="divisionOptions"
                    :option-label="
                      (opt) =>
                        Object(opt) === opt && 'name' in opt
                          ? opt.name[languageStore.language]
                          : null
                    "
                    outlined
                    dense
                    :rules="[requiredSelector]"
                    @update:model-value="
                      serviceProviderStore.serviceProviderLocationR.district =
                        null;
                      serviceProviderStore.serviceProviderLocationR.subDistrict =
                        null;
                      serviceProviderStore.serviceProviderLocationR.union =
                        null;
                      serviceProviderStore.serviceProviderLocationR.ward = null;
                      serviceProviderStore.serviceProviderLocationR.pinlocation =
                        null;
                      searchLocationStore.updateDistrict();
                    "
                    clearable
                    use-input
                    input-debounce="0"
                    @filter="divisionFilterFn"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("location.district") }}*
                </div>
                <div class="col-12">
                  <q-select
                    ref="districtEl"
                    v-model="
                      serviceProviderStore.serviceProviderLocationR.district
                    "
                    :options="districtOptions"
                    :option-label="
                      (opt) =>
                        Object(opt) === opt && 'name' in opt
                          ? opt.name[languageStore.language]
                          : null
                    "
                    :rules="[requiredSelector]"
                    outlined
                    dense
                    @update:model-value="
                      serviceProviderStore.serviceProviderLocationR.subDistrict =
                        null;
                      serviceProviderStore.serviceProviderLocationR.union =
                        null;
                      serviceProviderStore.serviceProviderLocationR.ward = null;
                      serviceProviderStore.serviceProviderLocationR.pinlocation =
                        null;
                      searchLocationStore.updateSubDistrict();
                    "
                    clearable
                    use-input
                    input-debounce="0"
                    @filter="districtFilterFn"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("location.subdistrict") }}*
                </div>
                <div class="col-12">
                  <q-select
                    ref="subDistrictEl"
                    v-model="
                      serviceProviderStore.serviceProviderLocationR.subDistrict
                    "
                    :options="subDistrictOptions"
                    :option-label="
                      (opt) =>
                        Object(opt) === opt && 'name' in opt
                          ? opt.name[languageStore.language]
                          : null
                    "
                    outlined
                    dense
                    :rules="[requiredSelector]"
                    @update:model-value="
                      serviceProviderStore.serviceProviderLocationR.union =
                        null;
                      serviceProviderStore.serviceProviderLocationR.ward = null;
                      serviceProviderStore.serviceProviderLocationR.pinlocation =
                        null;
                      searchLocationStore.updateUnion();
                    "
                    clearable
                    use-input
                    input-debounce="0"
                    @filter="subDistrictFilterFn"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("location.union") }}</div>
                <div class="col-12">
                  <q-select
                    ref="unionEl"
                    v-model="
                      serviceProviderStore.serviceProviderLocationR.union
                    "
                    :options="unionOptions"
                    :option-label="
                      (opt) =>
                        Object(opt) === opt && 'name' in opt
                          ? opt.name[languageStore.language]
                          : null
                    "
                    options-dense
                    outlined
                    dense
                    @update:model-value="
                      serviceProviderStore.serviceProviderLocationR.pinlocation =
                        null;
                      searchLocationStore.updatePinLocation();
                    "
                    clearable
                    use-input
                    input-debounce="0"
                    @filter="unionFilterFn"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("location.pinlocation") }}
                </div>
                <div class="col-12">
                  <q-select
                    ref="pinlocationEl"
                    v-model="
                      serviceProviderStore.serviceProviderLocationR.pinlocation
                    "
                    :options="pinlocationOptions"
                    :option-label="
                      (opt) =>
                        Object(opt) === opt && 'name' in opt
                          ? opt.name[languageStore.language]
                          : null
                    "
                    options-dense
                    outlined
                    dense
                    clearable
                    use-input
                    input-debounce="0"
                    @filter="pinlocationFilterFn"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("location.exactbn") }}</div>
                <div class="col-12">
                  <q-input
                    v-model="
                      serviceProviderStore.serviceProviderLocationR.exact.bn
                    "
                    outlined
                    dense
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("location.exacten") }}</div>
                <div class="col-12">
                  <q-input
                    v-model="
                      serviceProviderStore.serviceProviderLocationR.exact.en
                    "
                    outlined
                    dense
                  />
                </div>
              </div>
            </div> -->
            <!-- end service provider location -->
            <!-- name start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("nameinen") }}*</div>
                <div class="col-12">
                  <q-input
                    ref="nameEnEl"
                    v-model="serviceProviderStore.serviceProviderInfo.name.en"
                    outlined
                    dense
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("nameinbn") }}*</div>
                <div class="col-12">
                  <q-input
                    ref="nameBnEl"
                    v-model="serviceProviderStore.serviceProviderInfo.name.bn"
                    outlined
                    dense
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <!-- name end -->
            <!-- phoneNumber start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("phone") }}*</div>
                <div class="col-12">
                  <q-input
                    ref="phoneNumberEnEl"
                    v-model="
                      serviceProviderStore.serviceProviderInfo.phoneNumber1
                    "
                    outlined
                    dense
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("phone") }}</div>
                <div class="col-12">
                  <q-input
                    v-model="
                      serviceProviderStore.serviceProviderInfo.phoneNumber2
                    "
                    outlined
                    dense
                  />
                </div>
              </div>
            </div>
            <!-- phoneNumber end -->
            <!-- social start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("facebook") }}
                </div>
                <div class="col-12">
                  <q-input
                    v-model="serviceProviderStore.serviceProviderInfo.facebook"
                    outlined
                    dense
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("whatsapp") }}
                </div>
                <div class="col-12">
                  <q-input
                    v-model="serviceProviderStore.serviceProviderInfo.whatsapp"
                    outlined
                    dense
                  />
                </div>
              </div>
            </div>
            <!-- social end -->
            <!-- degree start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("degreeinen") }}</div>
                <div class="col-12">
                  <q-input
                    ref="degreeEnEl"
                    v-model="serviceProviderStore.serviceProviderInfo.degree.en"
                    outlined
                    dense
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("degreeinbn") }}</div>
                <div class="col-12">
                  <q-input
                    ref="degreeBnEl"
                    v-model="serviceProviderStore.serviceProviderInfo.degree.bn"
                    outlined
                    dense
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <!-- degree end -->
            <!-- extraCources start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("extraCourcesinen") }}</div>
                <div class="col-12">
                  <q-input
                    ref="extraCourcesEnEl"
                    v-model="
                      serviceProviderStore.serviceProviderInfo.extraCources.en
                    "
                    outlined
                    dense
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("extraCourcesinbn") }}</div>
                <div class="col-12">
                  <q-input
                    ref="extraCourcesBnEl"
                    v-model="
                      serviceProviderStore.serviceProviderInfo.extraCources.bn
                    "
                    outlined
                    dense
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <!-- extraCources end -->
            <!-- serviceTitle start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("serviceTitleinen") }}</div>
                <div class="col-12">
                  <q-input
                    ref="serviceTitleEnEl"
                    v-model="
                      serviceProviderStore.serviceProviderInfo.serviceTitle.en
                    "
                    outlined
                    dense
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("serviceTitleinbn") }}</div>
                <div class="col-12">
                  <q-input
                    ref="serviceTitleBnEl"
                    v-model="
                      serviceProviderStore.serviceProviderInfo.serviceTitle.bn
                    "
                    outlined
                    dense
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <!-- serviceTitle end -->
            <!-- serviceList start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("serviceListinen") }}
                  <div class="fs-12">{{ $t("seperator") }}</div>
                </div>
                <div class="col-12">
                  <q-input
                    ref="serviceListEnEl"
                    v-model="
                      serviceProviderStore.serviceProviderInfo.serviceList.en
                    "
                    outlined
                    dense
                    :rules="[required]"
                    type="textarea"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("serviceListinbn") }}

                  <div class="fs-12">{{ $t("seperator") }}</div>
                </div>
                <div class="col-12">
                  <q-input
                    ref="serviceListinBn"
                    v-model="
                      serviceProviderStore.serviceProviderInfo.serviceList.bn
                    "
                    outlined
                    dense
                    :rules="[required]"
                    type="textarea"
                  />
                </div>
              </div>
            </div>
            <!-- serviceList end -->
            <!-- specialties start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("specialtiesinEn") }}</div>
                <div class="col-12">
                  <q-input
                    ref="specialtiesEnEl"
                    v-model="
                      serviceProviderStore.serviceProviderInfo.specialties.en
                    "
                    outlined
                    dense
                    type="textarea"
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("specialtiesinBn") }}</div>
                <div class="col-12">
                  <q-input
                    ref="specialtiesBnEl"
                    v-model="
                      serviceProviderStore.serviceProviderInfo.specialties.bn
                    "
                    outlined
                    dense
                    type="textarea"
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <!-- specialties end -->
            <!-- description start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 fs-16 text-bold">
                  {{ $t("descriptioninEn") }}
                </div>
                <div class="col-12">
                  <q-input
                    ref="descriptionEnEl"
                    v-model="
                      serviceProviderStore.serviceProviderInfo.description.en
                    "
                    outlined
                    dense
                    type="textarea"
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 fs-16 text-bold">
                  {{ $t("descriptioninBn") }}
                </div>
                <div class="col-12">
                  <q-input
                    ref="descriptionBnEl"
                    v-model="
                      serviceProviderStore.serviceProviderInfo.description.bn
                    "
                    outlined
                    dense
                    type="textarea"
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <!-- description end -->
            <!-- add image end -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("addicon") }}*
                  <span class="fs-10">Max 200kb</span>
                </div>
                <div class="col-12">
                  <q-file
                    ref="iconEl"
                    outlined
                    dense
                    v-model="serviceProviderStore.imageIcon"
                    :rules="[fileValidate]"
                    label="Add png image"
                    accept=".png,"
                    max-total-size="20480"
                    use-chips
                    @update:model-value="serviceProviderStore.uploadIcon"
                    @rejected="onRejected"
                  >
                    <template v-slot:prepend>
                      <q-icon name="cloud_upload" /> </template
                  ></q-file>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("addcoverimage") }}*
                  <span class="fs-10">Max 8MB</span>
                </div>
                <div class="col-12">
                  <q-file
                    outlined
                    ref="coverImageEl"
                    dense
                    v-model="serviceProviderStore.imageCover"
                    :rules="[fileValidate]"
                    label="Add image"
                    accept=".jpg, .png, .jpeg"
                    max-total-size="8000000"
                    use-chips
                    @update:model-value="serviceProviderStore.uploadCoverImage"
                    @rejected="onRejected"
                  >
                    <template v-slot:prepend>
                      <q-icon name="cloud_upload" /> </template
                  ></q-file>
                </div>
              </div>
            </div>
            <!-- add image end -->
            <!-- rank start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("serial") }}
                </div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.rankCount }}
                  <q-slider
                    v-model="serviceProviderStore.serviceProviderInfo.rankCount"
                    color="green"
                    :min="0"
                    :step="0.5"
                    :max="10"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  Keywords
                  <div>Separate by comma (,)</div>
                </div>
                <div class="col-12">
                  <q-input
                    ref="keywordsEl"
                    outlined
                    dense
                    v-model="serviceProviderStore.serviceProviderInfo.keywords"
                    :rules="[required]"
                  />
                </div>
              </div>
            </div> -->
            <!-- rank end -->
            <div class="col-12">
              <div class="row">
                <q-btn
                  :label="$t('addnew')"
                  color="light-green-8"
                  glossy
                  @click="createServiceManager"
                />
              </div>
            </div>
          </div>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Notify } from "quasar";
import { requiredSelector, required, fileValidate } from "src/global_js/utils";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useUserStore } from "src/stores/user/userStore";
import { useServiceCategoryStore } from "src/stores/service/serviceCategoryStore";
import { useServiceStore } from "src/stores/service/serviceStore";
import { useServiceProviderStore } from "src/stores/service/serviceProviderStore";
import { useSearchLocationStore } from "src/stores/service/searchLocation";
import { useDivisionStore } from "src/stores/locations/divisionStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { useSubDistrictStore } from "src/stores/locations/subDistrictStore";
import { useUnionStore } from "src/stores/locations/unionStore";
import { useWardStore } from "src/stores/locations/wardStore";
import { usePinlocationStore } from "src/stores/locations/pinlocationStore";
import { useSearchServiceStore } from "src/stores/service/searchService";

const languageStore = useLanguageStore();
const serviceProviderStore = useServiceProviderStore();
const serviceCategoryStore = useServiceCategoryStore();
const serviceStore = useServiceStore();
const divisionStore = useDivisionStore();
divisionStore.getAllDivisions();
const districtStore = useDistrictStore();
const subDistrictStore = useSubDistrictStore();
const unionStore = useUnionStore();
const pinlocationStore = usePinlocationStore();

const searchLocationStore = useSearchLocationStore();
searchLocationStore.updateAllLocation();
const searchServiceStore = useSearchServiceStore();

const maximizedToggle = ref(true);
const grandParentEl = ref(null);
const parentEl = ref(null);
const divisionEl = ref(null);
const districtEl = ref(null);
const subDistrictEl = ref(null);
const unionEl = ref(null);
const pinlocationEl = ref(null);
const nameEnEl = ref(null);
const nameBnEl = ref(null);
const iconEl = ref(null);
const coverImageEl = ref(null);
const phoneNumberEnEl = ref(null);
const serviceTitleEnEl = ref(null);
const serviceTitleBnEl = ref(null);
const serviceListEnEl = ref(null);
const serviceListinBn = ref(null);

const createServiceManager = () => {
  grandParentEl.value.validate();
  parentEl.value.validate();
  divisionEl.value.validate();
  districtEl.value.validate();
  subDistrictEl.value.validate();
  nameEnEl.value.validate();
  nameBnEl.value.validate();
  iconEl.value.validate();
  coverImageEl.value.validate();
  serviceTitleEnEl.value.validate();
  serviceTitleBnEl.value.validate();
  serviceListEnEl.value.validate();
  serviceListinBn.value.validate();
  if (
    grandParentEl.value.hasError ||
    parentEl.value.hasError ||
    divisionEl.value.hasError ||
    districtEl.value.hasError ||
    subDistrictEl.value.hasError ||
    nameEnEl.value.hasError ||
    nameBnEl.value.hasError ||
    iconEl.value.hasError ||
    phoneNumberEnEl.value.hasError ||
    serviceTitleEnEl.value.hasError ||
    serviceTitleBnEl.value.hasError ||
    serviceListEnEl.value.hasError ||
    serviceListinBn.value.hasError ||
    coverImageEl.value.hasError
  ) {
    return;
  }
  serviceProviderStore.createServiceProvider();
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
