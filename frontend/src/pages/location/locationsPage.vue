<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <q-card class="border-primary">
          <div class="q-mb-md">
            <div
              class="q-pa-sm q-mb-sm bg-primary text-white text-center fs-18"
            >
              {{ $t("infoByLocation") }}
            </div>
            <div class="row q-col-gutter-sm">
              <div class="col-lg-10 col-md-10 col-sm-12 col-12">
                <locationFilter />
              </div>
              <div class="col-lg-2 col-md-2 col-sm-12 col-12">
                <q-btn
                  class="full-width bg-primary text-white"
                  :label="$t('search')"
                  @click="applyFilter"
                />
              </div>
            </div>
          </div>
          <q-separator />
          <q-separator class="q-mt-md" />
          <q-tabs
            v-model="tab"
            dense
            class="text-grey-10"
            indicator-color="blue-grey-10"
            active-bg-color="blue-grey-2"
            align="justify"
            narrow-indicator
          >
            <q-tab name="division" :label="$t('location.division')" />
            <q-tab name="district" :label="$t('location.district')" />
            <q-tab name="subdistrict" :label="$t('location.subdistrict')" />
            <q-tab name="union" :label="$t('location.union')" />
            <!-- <q-tab name="ward" :label="$t('location.ward')" /> -->
            <q-tab name="pinlocation" :label="$t('location.pinlocation')" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="division">
              <divisionTable />
            </q-tab-panel>
            <q-tab-panel name="district">
              <districtTable />
            </q-tab-panel>
            <q-tab-panel name="subdistrict">
              <subDistrictTable />
            </q-tab-panel>
            <q-tab-panel name="union">
              <unionTable />
            </q-tab-panel>
            <!-- <q-tab-panel name="ward">
              <wardTable/>
            </q-tab-panel> -->
            <q-tab-panel name="pinlocation">
              <pinlocationTable />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMeta } from "quasar";
import { useAuthStore } from "src/stores/auth/authStore";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { onBeforeMount, onMounted, ref } from "vue";
import divisionTable from "src/components/locations/divisionTable.vue";
import districtTable from "src/components/locations/districtTable.vue";
import subDistrictTable from "src/components/locations/subDistrictTable.vue";
import unionTable from "src/components/locations/unionTable.vue";
import wardTable from "src/components/locations/wardTable.vue";
import pinlocationTable from "src/components/locations/pinLocationTable.vue";
import locationFilter from "src/components/locations/locationFilter.vue";

import { useUnionStore } from "src/stores/locations/unionStore";
import { useWardStore } from "src/stores/locations/wardStore";
import { useSubDistrictStore } from "src/stores/locations/subDistrictStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { useDivisionStore } from "src/stores/locations/divisionStore";
import { useRouter } from "vue-router";
import { usePublicUserStore } from "src/stores/user/publicStore";
import { usePinlocationStore } from "src/stores/locations/pinlocationStore";

const router = useRouter();
const authStore = useAuthStore();
onMounted(() => {
  if (!authStore.checkLogin()) {
    router.push("/login");
  }
  if(!authStore.loginUserInfo.isSuperAdmin || !authStore.loginUserInfo.isAdmin){
    router.push("/profile")
  }
});
const languageStore = useLanguageStore();
const tab = ref("division");
const divisionStore = useDivisionStore();
const districtStore = useDistrictStore();
const subDistrictStore = useSubDistrictStore();
const unionStore = useUnionStore();
const pinlocationStore = usePinlocationStore();

divisionStore.getDivisionList();
districtStore.getDistrictList();
subDistrictStore.getSubDistrictListByBrowsingDistrictId();
unionStore.getUnionListByBrowsingSubDistrictId();
pinlocationStore.getPinlocationListByBrowsingUnionId();
const publicUserStore = usePublicUserStore();
const applyFilter = () => {
  subDistrictStore.getSubDistrictListByBrowsingDistrictId();
  unionStore.getUnionListByBrowsingSubDistrictId();
  pinlocationStore.getPinlocationListByBrowsingUnionId();
};

const metaData = {
  // sets document title
  title: "Locations",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - Proyojon24.net`,

  // meta tags
  meta: {
    description: { name: "description", content: "Page 1" },
    keywords: {
      name: "keywords",
      content: "proyojon24 services service-provider",
    },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle} - Proyojon24.net`;
      },
    },
  },
};

useMeta(metaData);
</script>
<style scoped></style>
