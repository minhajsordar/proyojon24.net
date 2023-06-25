<template>
  <q-dialog
    v-model="serviceProviderStore.openServiceProviderPreviewDialog"
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
        {{ $t("preview") }}
      </q-card-section>
      <q-card-section>
        <q-card class="border-primary q-pa-md">
          <div class="row q-col-gutter-sm">
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("services.services") }}</div>
                <div class="col-12">
                  {{serviceProviderStore.serviceProviderInfo.service?.name[languageStore.language]}}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("services.service_category") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.serviceCategory?.name[languageStore.language] }}
                </div>
              </div>
            </div>
            <!-- start service provider location -->
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold"> {{ $t("location.division") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderLocationR.division?.name[languageStore.language] }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("location.district") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderLocationR.district?.name[languageStore.language] }}
                </div>
              </div>
            </div>
            <div class="col-sm-4 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("location.subdistrict") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderLocationR.subDistrict?.name[languageStore.language] }}
                </div>
              </div>
            </div>
            <div class="col-sm-4 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("location.union") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderLocationR.union?.name[languageStore.language] }}
                </div>
              </div>
            </div>
            <div class="col-sm-4 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("location.pinlocation") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderLocationR?.pinlocation?.name[languageStore.language] }}
                </div>
              </div>
            </div>
            <div class="col-sm-4 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("location.exact") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderLocationR.exact[languageStore.language] }}
                </div>
              </div>
            </div>
            <!-- end service provider location -->
            <!-- name start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("nameinen") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.name.en }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("nameinbn") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.name.bn }}
                </div>
              </div>
            </div>
            <!-- name end -->
            <!-- phoneNumber start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("phone") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.phoneNumber1 }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("phone") }}</div>
                <div class="col-12">
                  {{  serviceProviderStore.serviceProviderInfo.phoneNumber2 }}
                </div>
              </div>
            </div>
            <!-- phoneNumber end -->
            <!-- serviceTitle start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("serviceTitleinen") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.serviceTitle.en }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("serviceTitleinbn") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.serviceTitle.bn }}
                </div>
              </div>
            </div>
            <!-- serviceTitle end -->
            <!-- description start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 fs-16 text-bold">{{ $t("descriptioninEn") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.description.en }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 fs-16 text-bold">{{ $t("descriptioninBn") }}</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.description.bn }}
                </div>
              </div>
            </div>
            <!-- description end -->
            <!-- rank start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("rank") }}
                </div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.rankCount }}
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
            <!-- add image end -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("addProfileImage") }}
                </div>
                <div class="col-12">
                  <q-img :src="web_root_url+serviceProviderStore.serviceProviderInfo.image"/>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("coverimage") }}
                </div>
                <div class="col-12">
                  <q-img :src="web_root_url+serviceProviderStore.serviceProviderInfo.serviceImage" style="width:200px;"/>
                </div>
              </div>
            </div>
            <!-- add image end -->
            <div class="col-12">
              <div class="row">
                <q-btn label="closse" glossy color="primary" icon="arrow_back" @click="serviceProviderStore.openServiceProviderPreviewDialog = false"/>
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
import { useServiceProviderStore } from "src/stores/service/serviceProviderStore";
import { web_root_url } from "src/global_constant/root_url";
const languageStore = useLanguageStore();
const serviceProviderStore = useServiceProviderStore();
const maximizedToggle = ref(true);

</script>
