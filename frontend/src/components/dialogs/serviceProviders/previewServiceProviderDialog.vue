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
          <div class="row q-col-gutter-sm">
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">Service</div>
                <div class="col-12">
                  {{serviceProviderStore.serviceProviderInfo.service.name[languageStore.language]}}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">Service Category</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.serviceCategory.name[languageStore.language] }}
                </div>
              </div>
            </div>
            <!-- start service provider location -->
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">Division</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderLocationR.division.name[languageStore.language] }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">District</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderLocationR.district.name[languageStore.language] }}
                </div>
              </div>
            </div>
            <div class="col-sm-4 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">Sub District</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderLocationR.subDistrict.name[languageStore.language] }}
                </div>
              </div>
            </div>
            <div class="col-sm-4 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">Union</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderLocationR.union.name[languageStore.language] }}
                </div>
              </div>
            </div>
            <div class="col-sm-4 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">Ward</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderLocationR.ward.name[languageStore.language] }}
                </div>
              </div>
            </div>
            <!-- end service provider location -->
            <!-- name start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">name In English</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.name.en }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">name বাংলায়</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.name.bn }}
                </div>
              </div>
            </div>
            <!-- name end -->
            <!-- phoneNumber start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">phone In English</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.phoneNumber.en }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">phone বাংলায়</div>
                <div class="col-12">
                  {{  serviceProviderStore.serviceProviderInfo.phoneNumber.bn }}
                </div>
              </div>
            </div>
            <!-- phoneNumber end -->
            <!-- degree start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">degree In English</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.degree.en }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">degree বাংলায়</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.degree.bn }}
                </div>
              </div>
            </div>
            <!-- degree end -->
            <!-- extraCources start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">extra cources In English</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.extraCources.en }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">extra cources বাংলায়</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.extraCources.bn }}
                </div>
              </div>
            </div>
            <!-- extraCources end -->
            <!-- serviceTitle start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">service title In English</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.serviceTitle.en }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">service title বাংলায়</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.serviceTitle.bn }}
                </div>
              </div>
            </div>
            <!-- serviceTitle end -->
            <!-- serviceList start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  service list In English
                </div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.serviceList.en }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  service list বাংলায়

                </div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.serviceList.bn }}
                </div>
              </div>
            </div>
            <!-- serviceList end -->
            <!-- specialties start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">specialties In English</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.specialties.en }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">specialties বাংলায়</div>
                <div class="col-12">
                 {{ serviceProviderStore.serviceProviderInfo.specialties.bn }}
                </div>
              </div>
            </div>
            <!-- specialties end -->
            <!-- description start -->
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 fs-16 text-bold">description In English</div>
                <div class="col-12">
                  {{ serviceProviderStore.serviceProviderInfo.description.en }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 fs-16 text-bold">description বাংলায়</div>
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
                  {{ $t("serial") }}
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
                  {{ $t("addicon") }}
                </div>
                <div class="col-12">
                  <q-img :src="serviceProviderStore.serviceProviderInfo.image"/>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-12 col-12">
              <div class="row">
                <div class="col-12 text-bold">
                  {{ $t("addcoverimage") }}
                </div>
                <div class="col-12">
                  <q-img :src="serviceProviderStore.serviceProviderInfo.serviceImage" style="width:200px;"/>
                </div>
              </div>
            </div>
            <!-- add image end -->
            <div class="col-12">
              <div class="row">
                <q-btn label="closse" color="primary" icon="arrow_back" @click="serviceProviderStore.openServiceProviderPreviewDialog = false"/>
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
const languageStore = useLanguageStore();
const serviceProviderStore = useServiceProviderStore();
const maximizedToggle = ref(true);

</script>
