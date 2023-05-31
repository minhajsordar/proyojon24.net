<template>
  <div class="container-section-py-xs">
    <div class="inner-section">
      <div class="full-width">
        <div class="">
          <div class="q-mb-md">
            <div class="row q-col-gutter-sm">
              <div class="col-lg-3 col-sm-6 col-xs-12 col-12">
                <q-btn class=" bg-blue-grey-10 text-yellow-13 full-width" :label="$t('searchInfoByLocation')" @click="publicUserStore.openBrowsingLocationDialog = true"/>
              </div>
              <div class="col-lg-3 col-sm-6 col-xs-12 col-12">
                <q-btn class=" bg-blue-grey-10 text-yellow-13 full-width" :label="$t('services.category')" @click="publicUserStore.openFilterByServiceCategoryDialog = true"/>
              </div>
              <div class="col-lg-6 col-sm-12 col-xs-12 col-12">
                <q-btn
                class="full-width bg-blue-grey-10 text-yellow-13"
                 :label="$t('search')"
                 />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-lg-3 col-md-4 col-4" v-if="$q.screen.gt.xs">
              <q-card class="bg-white border-radius-xs q-pa-md">
                <div
                  class="bg-blue-grey-10 text-center text-yellow-13 fs-19 q-pa-xs"
                >
                  {{ $t("services.service_category") }}
                </div>

                <q-scroll-area
                  :thumb-style="{
                    right: '5px',
                    borderRadius: '8px',
                    backgroundColor: '#027be3',
                    width: '8px',
                    opacity: 0.75,
                  }"
                  :bar-style="{
                    right: '2px',
                    borderRadius: '14px',
                    backgroundColor: '#027be3',
                    width: '14px',
                    opacity: 0.2,
                    marginTop: '-3px',
                    marginBottom: '-3px',
                    paddingTop: '3px',
                    paddingBottom: '3px',
                  }"
                  style="height: 220px"
                  id="scroll-area-with-virtual-scroll-1"
                >
                  <q-btn
                    flat
                    class="sidebar-links full-width bg-blue-grey-1"
                    :class="{
                      'bg-blue-grey-3': route.params.id == serviceCategory._id,
                    }"
                    v-for="(
                      serviceCategory, index
                    ) in serviceCategoryStore.allServiceCategoryList"
                    :key="index"
                    @click="getServiceProviders(serviceCategory._id)"
                  >
                    {{ serviceCategory.name[languageStore.language] }}
                  </q-btn>
                </q-scroll-area>

                <!-- <q-btn
                  flat
                  class="sidebar-links full-width bg-blue-grey-1"
                  :class="{
                    'bg-blue-grey-3': route.params.id == serviceCategory._id,
                  }"
                  v-for="(
                    serviceCategory, index
                  ) in serviceCategoryStore.allServiceCategoryList"
                  :key="index"
                  @click="getServiceProviders(serviceCategory._id)"
                >
                  {{ serviceCategory.name[languageStore.language] }}
                </q-btn> -->
              </q-card>
            </div>
            <div class="col-lg-9 col-sm-8 col-xs-12 col-12">
              <q-card class="q-pa-md">
                <div class="fs-18 text-bold">
                  {{ $t("services.service_provider") }}
                </div>
                <q-separator class="q-mb-sm"></q-separator>
                <div class="row q-col-gutter-sm">

                  <div
                    class="col-12"
                    v-for="(
                      serviceProvider, index
                    ) in serviceProviderStore.allServiceProvidersList"
                    :key="index"
                  >
                    <serviceProviderListCard :serviceProvider="serviceProvider" />
                  </div>
                </div>
                <div
                  v-if="
                    serviceProviderStore?.allServiceProvidersList &&
                    serviceProviderStore?.allServiceProvidersList.length == 0
                  "
                  class="text-center"
                >
                  এখনও তথ্য যুক্ত করা হয়নি।
                </div>
              </q-card>
            </div>
            <!-- <div class="col-lg-2 col-md-4 col-4" v-if="$q.screen.gt.md">service providers3</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar, useMeta } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useI18n } from "vue-i18n";
import { usePublicServiceStore } from "src/stores/service/publicServiceStore.js";
import { useServiceCategoryStore } from "src/stores/service/serviceCategoryStore";
import { useRoute, useRouter } from "vue-router";
import { useServiceProviderStore } from "src/stores/service/serviceProviderStore";
import serviceProviderListCard from "src/components/cards/serviceProviderListCard.vue";
import { usePublicUserStore } from "src/stores/user/publicStore";

const publicUserStore = usePublicUserStore()
const { t } = useI18n();
const languageStore = useLanguageStore();
const router = useRouter();
const route = useRoute();
const serviceCategoryStore = useServiceCategoryStore();
// serviceCategoryStore.getAllServiceCategorys();
const serviceProviderStore = useServiceProviderStore();
if (route.params.id) {
  serviceProviderStore.getAllServiceProviders(route.params.id);
} else {
  router.push("/allservices");
}
const getServiceProviders = (id) => {
  serviceProviderStore.getAllServiceProviders(id);
  router.push("/service_category/" + id);
};

const metaData = {
  // sets document title
  title: "Services List",
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
<style lang="scss">
a.sidebar-links .q-item {
  background-color: white !important;
  color: black;
  text-decoration: none !important;
}
a.sidebar-links:hover .q-item {
  background-color: $blue-grey-2 !important;
}
</style>
