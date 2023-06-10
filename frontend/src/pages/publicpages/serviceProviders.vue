<template>
  <div class="container-section-py-xs">
    <div class="inner-section">
      <div class="full-width">
        <div class="">
          <div class="q-mb-md">
            <div class="row q-col-gutter-sm">
              <div class="col-lg-3 col-sm-6 col-xs-6 col-6">
                <q-btn
                  v-if="selectedServiceAndCategory.serviceCategoryName"
                  class="bg-blue-grey-10 text-yellow-13 full-width"
                  :label="
                    selectedServiceAndCategory.serviceCategoryName[
                      languageStore.language
                    ]
                  "
                  @click="
                    publicUserStore.openFilterByServiceCategoryDialog = true
                  "
                />
                <q-btn
                  v-else
                  class="bg-blue-grey-10 text-yellow-13 full-width"
                  :label="$t('services.category')"
                  @click="
                    publicUserStore.openFilterByServiceCategoryDialog = true
                  "
                />
              </div>
              <div class="col-lg-3 col-sm-6 col-xs-6 col-6">
                <q-btn
                  class="bg-blue-grey-10 text-yellow-13 full-width"
                  :label="$t('searchInfoByLocation')"
                  @click="publicUserStore.openBrowsingLocationDialog = true"
                />
              </div>
              <div class="col-lg-6 col-sm-12 col-xs-12 col-12">
                <div class="flex full-width relative-position">
                  <q-input class="searchbar" outlined dense />
                  <q-btn
                    class="bg-blue-grey-10 text-yellow-13 search-btn"
                    icon="search"
                  />
                </div>
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
                    backgroundColor: '#263238',
                    width: '8px',
                    opacity: 0.75,
                  }"
                  :bar-style="{
                    right: '2px',
                    borderRadius: '14px',
                    backgroundColor: '#263238',
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
                    @click="
                      getServiceProviders(serviceCategory._id);
                      selectedServiceAndCategory.serviceCategoryId =
                        serviceCategory._id;
                      selectedServiceAndCategory.serviceCategoryName =
                        serviceCategory.name;
                    "
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
                <div
                  v-if="
                    serviceProviderStore?.suggestedServiceProvidersList.length >
                    0
                  "
                >
                  <div class="fs-18 text-bold">
                    {{ $t("services.suggestions") }}
                  </div>
                  <q-separator class="q-mb-sm"></q-separator>
                  <div class="row q-col-gutter-sm">
                    <div
                      class="col-12"
                      v-for="(
                        serviceProvider, index
                      ) in serviceProviderStore.suggestedServiceProvidersList"
                      :key="index"
                    >
                      <serviceProviderListCard
                        :serviceProvider="serviceProvider"
                      />
                    </div>
                  </div>

                  <q-separator class="q-mb-sm"></q-separator>
                </div>
                <div class="fs-18 text-bold">
                  {{ $t("services.service_provider") }}
                </div>
                <q-separator class="q-mb-sm"></q-separator>
                <div
                  v-if="
                    serviceProviderStore?.allServiceProvidersList &&
                    serviceProviderStore?.allServiceProvidersList.length == 0 &&
                    serviceProviderStore?.suggestedServiceProvidersList &&
                    serviceProviderStore?.suggestedServiceProvidersList.length == 0
                  "
                  class="text-center"
                >
                  {{ $t("noInfo") }}
                  <q-separator class="q-mb-sm"></q-separator>
                </div>
                <div class="row q-col-gutter-sm">

                  <div class="col-12">
                    <serviceProviderListCard
                      register
                      class="bg-green-1"
                      :serviceProvider="{
                        name: {
                          bn: 'আপনি কি সার্ভিস প্রদান করতে চান? আপনার তথ্য প্রদান করুন',
                          en: 'Do you want to provide service? Fill up your informations.',
                        },
                        serviceProviderLocation: {
                          division: {
                            name: {
                              bn: 'বিভাগ',
                              en: 'Division',
                            },
                          },
                          district: {
                            name: {
                              bn: 'জেলা',
                              en: 'District',
                            },
                          },
                          subDistrict: {
                            name: {
                              bn: 'উপজেলা',
                              en: 'Uazela',
                            },
                          },
                          union: {
                            name: {
                              bn: 'স্থান',
                              en: 'Location',
                            },
                          },
                          pinlocation: {
                            name: {
                              bn: null,
                              en: null,
                            },
                            _id: null,
                          },
                        },
                        specialties: {
                          bn: null,
                          en: null,
                        },
                        serviceTitle: {
                          bn: 'সেবার শিরোনাম',
                          en: 'Service Title',
                        },
                        suggested: false,
                        _id: '647436a153654e270485a5b7',
                        service: '646ddf32944253664c042aa9',
                        serviceCategory: '646de0ea944253664c042afa',
                        image: '/uploads/image-1685337335436.jpg',
                        serviceImage: '/uploads/image-1685337338620.jpg',
                        rankCount: 1.5,
                        keywords: null,
                        rating: 0,
                        numReviews: 0,
                        reviews: [],
                        createdAt: '2023-05-29T05:22:41.902Z',
                        updatedAt: '2023-05-29T05:34:23.007Z',
                        __v: 1,
                      }"
                    />
                  </div>
                  <div
                    class="col-12"
                    v-for="(
                      serviceProvider, index
                    ) in serviceProviderStore.allServiceProvidersList"
                    :key="index"
                  >
                    <serviceProviderListCard
                      :serviceProvider="serviceProvider"
                    />
                  </div>
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
import { ref, onMounted } from "vue";
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
import { useLocalStorage } from "@vueuse/core";
import { useSearchLocationStore } from "src/stores/service/searchLocation";

const searchLocationStore = useSearchLocationStore();
const selectedServiceAndCategory = useLocalStorage(
  "selected-service-and-category",
  {}
);
const publicUserStore = usePublicUserStore();
const { t } = useI18n();
const languageStore = useLanguageStore();
const router = useRouter();
const route = useRoute();
const serviceCategoryStore = useServiceCategoryStore();
// serviceCategoryStore.getAllServiceCategorys();
const serviceProviderStore = useServiceProviderStore();
onMounted(() => {
  if (route.params.id) {
    serviceProviderStore.getAllServiceProviders(route.params.id);
  } else {
    router.push("/allservices");
  }
  searchLocationStore.updateAllLocationByBrowsingLocation();
});
const getServiceProviders = (id) => {
  serviceProviderStore.getAllServiceProviders(id);
  router.push("/service_providers_list/" + id);
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

.searchbar {
  height: 40px !important;
  width: calc(100% - 50px) !important;
}

.search-btn {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 40px;
}
</style>
