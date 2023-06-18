<template lang="">
  <div class="container-section-py-xs">
    <div class="inner-section">
      <div class="full-width">
        <q-card class="q-pa-sm bg-primary text-white">
          <q-card-section
            class="q-pa-none profile-image-section relative-position"
          >
            <q-img
              height="280px"
              width="100%"
fit="contain"
              :src="
                web_root_url +
                serviceProviderStore.serviceProvider?.serviceImage
              "
            >
            </q-img>
          </q-card-section>
        </q-card>
        <q-card
          class="full-width hover-serviceprovider-card cursor-pointer"
        >
          <div class="listcard-cont">
            <q-badge
              v-if="serviceProviderStore.serviceProvider?.viewCount"
              class="view-badge-top-right"
              color="pink"
            >
              <q-icon name="visibility" />
              {{ serviceProviderStore.serviceProvider.viewCount }}</q-badge
            >
            <q-card-section class="image-section q-pa-sm">
              <q-img :src="web_root_url + serviceProviderStore.serviceProvider?.image" />
            </q-card-section>
            <q-card-section class="description-section q-pa-sm">
              <div class="text-bold">
                {{ serviceProviderStore.serviceProvider?.name[languageStore.language] }}
              </div>
              <q-separator />
              <div>
                <span>{{
                  serviceProviderStore.serviceProvider?.serviceTitle[languageStore.language]
                }}</span>
              </div>
              <q-separator />
              <div class="fs-12 text-bold">
                <q-icon class="bg-primary text-white" name="location_on" />
                <span
                  v-if="
                    serviceProviderStore.serviceProvider?.serviceProviderLocation?.division?.name[
                      languageStore.language
                    ]
                  "
                  >
                  {{
                    " "+serviceProviderStore.serviceProvider?.serviceProviderLocation?.division?.name[
                      languageStore.language
                    ]
                  }}
                </span>
                <span
                  v-if="
                    serviceProviderStore.serviceProvider?.serviceProviderLocation?.district?.name[
                      languageStore.language
                    ]
                  "
                  >,
                  {{
                    serviceProviderStore.serviceProvider?.serviceProviderLocation?.district?.name[
                      languageStore.language
                    ]
                  }}
                </span>
                <span
                  v-if="
                    serviceProviderStore.serviceProvider?.serviceProviderLocation?.subDistrict?.name[
                      languageStore.language
                    ]
                  "
                  >,
                  {{
                    serviceProviderStore.serviceProvider?.serviceProviderLocation?.subDistrict?.name[
                      languageStore.language
                    ]
                  }}
                </span>
                <span
                  v-if="
                    serviceProviderStore.serviceProvider?.serviceProviderLocation?.union?.name[
                      languageStore.language
                    ]
                  "
                  >,
                  {{
                    serviceProviderStore.serviceProvider?.serviceProviderLocation?.union?.name[
                      languageStore.language
                    ]
                  }}</span
                >
                <span v-if="serviceProviderStore.serviceProvider?.serviceProviderLocation?.exact"
                  >,
                  {{
                    serviceProviderStore.serviceProvider?.serviceProviderLocation?.exact[
                      languageStore.language
                    ]
                  }}</span
                >
              </div>
            </q-card-section>
          </div>
        </q-card>
        <div class="row q-col-gutter-md q-mt-xs">
          <div class="col-lg-8 col-sm-8 col-xs-12">
            <q-card class="q-pa-md">
              <div class="fs-16">
                <div class="q-mt-sm q-pa-sm bg-accent text-yellow text-center">
                  <span class="fs-18"> বিস্তারিত: </span>
                </div>
                <div
                  class="q-mt-md"
                  v-html="
                    serviceProviderStore.serviceProvider?.description[
                      languageStore.language
                    ]
                  "
                ></div>
              </div>
            </q-card>
          </div>
          <div class="col-lg-4 col-sm-4 col-xs-12">
            <q-card class="q-pa-md">
              <div class="q-mt-sm q-pa-sm bg-accent text-yellow text-center">
                <span class="fs-18"> যোগাযোগ করুন </span>
              </div>
              <div
                class="col-lg-6 col-sm-6 col-xs-12 col-12 text-center cursor-pointer"
              >
                <q-separator />
                <div class="q-py-sm">
                  <span class="fs-18">
                    <q-icon class="bg-yellow-14 text-white" name="call" />
                    <a
                      :href="
                        'tel:' +
                        serviceProviderStore.serviceProvider?.phoneNumber1
                      "
                    >
                      {{ serviceProviderStore.serviceProvider?.phoneNumber1 }}
                    </a>
                  </span>
                </div>
              </div>
              <div
                class="col-lg-6 col-sm-6 col-xs-12 col-12 text-center cursor-pointer"
                v-if="serviceProviderStore.serviceProvider?.phoneNumber2"
              >
                <q-separator />
                <div class="q-py-sm">
                  <span class="fs-18">
                    <q-icon class="bg-yellow-14 text-white" name="call" />
                    <a
                      :href="
                        'tel:' +
                        serviceProviderStore.serviceProvider?.phoneNumber2
                      "
                    >
                      {{ serviceProviderStore.serviceProvider?.phoneNumber2 }}
                    </a>
                  </span>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useQuasar, useMeta } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useI18n } from "vue-i18n";
import { usePublicServiceStore } from "src/stores/service/publicServiceStore.js";
import { useServiceCategoryStore } from "src/stores/service/serviceCategoryStore";
import { useRoute, useRouter } from "vue-router";
import { useServiceProviderStore } from "src/stores/service/serviceProviderStore";
import { web_root_url } from "src/global_constant/root_url";
const { t } = useI18n();
const languageStore = useLanguageStore();
const router = useRouter();
const route = useRoute();
const serviceCategoryStore = useServiceCategoryStore();
const serviceProviderStore = useServiceProviderStore();
if (route.params.id) {
  serviceProviderStore.getServiceProviderById(route.params.id);
} else {
  router.push("/allservices");
}

setTimeout(() => {
  serviceProviderStore.increaseServiceProviderView(route.params.id);
}, 5000);

const metaData = {
  // sets document title
  title: "Service Provider",
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
.profile-image {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid white !important;
  border-radius: 100px;
}
</style>
