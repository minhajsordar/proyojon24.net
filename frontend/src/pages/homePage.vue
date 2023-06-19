<template>
  <!-- TODO Later we will need this anal -->
  <!-- <div class="container-section-py-xs">
    <div class="inner-section">
      <div class="full-width">
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <q-card class="bg-cyan-6 text-white">
              <q-card-section>
                <div class="fs-16">Total User</div>
                <div  class="fs-32 text-bold">{{ dashboardStore.dashboardData?.totalUser }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-6">
            <q-card class="bg-teal-5 text-white">
              <q-card-section>
                <div class="fs-16">Total Profile View</div>
                <div  class="fs-32 text-bold">{{ dashboardStore.dashboardData?.totalView }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div
    v-if="
      servicePublicStore.allServices &&
      servicePublicStore.allServices.length >= 0
    "
  >
    <div
      class="container-section-py-xs"
      v-if="servicePublicStore?.allServices.length >= 1"
    >
      <div class="inner-section">
        <div class="full-width">
          <div class="q-py-md">
            <div class="row q-col-gutter-sm">
              <div
                class="col-lg-3 col-md-3 col-sm-2 col-3"
                v-for="(
                  service, index
                ) in servicePublicStore?.allServices?.slice(0, 12)"
                :key="index"
              >
                <div
                  class="text-center cursor-pointer service-item"
                  @click="
                    $router.push('/service_categorys_list/' + service._id);
                    selectedServiceAndCategory.serviceId = service._id;
                    selectedServiceAndCategory.serviceName = service.name;
                  "
                >
                  <!-- <q-badge class="provider-count-badge" color="orange">{{ service.serviceProviderCount }}</q-badge> -->
                  <div class="icon-relative-cont">
                    <!-- <q-img  src="/images/hexagonalshape.svg"
                    style="width: 56px; height: 48px;"
                    /> -->
                    <q-img src="/images/roundedsquareshape.svg" class="shape">
                      <template v-slot:loading> </template>
                    </q-img>
                    <q-img
                      class="absolute-top-center service-icon"
                      v-if="service.icon"
                      fit
                      :src="web_root_url + service.icon"
                    >
                      <template v-slot:loading> </template>
                    </q-img>
                    <q-img
                      v-else
                      class="absolute-top-center service-icon"
                      fit
                      src="/images/placeholder_image.png"
                    >
                      <template v-slot:loading> </template>
                    </q-img>
                    <div
                      class="absolute-top-center service-icon gradient-bg"
                    ></div>
                    <!-- <q-img fit
                    style="max-width: 50px; max-height: 50px;"
                    src="https://cdn.pixabay.com/photo/2019/11/06/05/47/stethoscope-4605241_1280.png"
                    /> -->
                  </div>
                  <div>
                    <div>
                      {{ service.name[languageStore.language] }}
                    </div>
                    <div>
                      {{ service.serviceProviderCount }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="q-py-xs"></div>
    <div
      class="container-section-py-xs-0"
      v-if="publicSliderStore?.sliderData?.slider1.length != 0"
    >
      <div class="inner-section-px-0">
        <div class="full-width">
          <topSlide slide="slider1" />
        </div>
      </div>
    </div>
    <div
      class="container-section-py-xs"
      v-if="servicePublicStore?.allServices.length >= 12"
    >
      <div class="inner-section">
        <div class="full-width">
          <div class="q-py-md">
            <div class="row q-col-gutter-sm">
              <div
                class="col-lg-3 col-md-3 col-sm-2 col-3"
                v-for="(
                  service, index
                ) in servicePublicStore?.allServices?.slice(12, 24)"
                :key="index"
              >
                <div
                  class="text-center cursor-pointer service-item"
                  @click="
                    $router.push('/service_categorys_list/' + service._id);
                    selectedServiceAndCategory.serviceId = service._id;
                    selectedServiceAndCategory.serviceName = service.name;
                  "
                >
                  <!-- <q-badge class="provider-count-badge" color="orange">{{ service.serviceProviderCount }}</q-badge> -->
                  <div class="icon-relative-cont">
                    <!-- <q-img  src="/images/hexagonalshape.svg"
                    style="width: 56px; height: 48px;"
                    /> -->
                    <q-img src="/images/roundedsquareshape.svg" class="shape">
                      <template v-slot:loading> </template>
                    </q-img>
                    <q-img
                      class="absolute-top-center service-icon"
                      v-if="service.icon"
                      fit
                      :src="web_root_url + service.icon"
                    >
                      <template v-slot:loading> </template>
                    </q-img>
                    <q-img
                      v-else
                      class="absolute-top-center service-icon"
                      fit
                      src="/images/placeholder_image.png"
                    >
                      <template v-slot:loading> </template>
                    </q-img>
                    <div
                      class="absolute-top-center service-icon gradient-bg"
                    ></div>
                    <!-- <q-img fit
                    style="max-width: 50px; max-height: 50px;"
                    src="https://cdn.pixabay.com/photo/2019/11/06/05/47/stethoscope-4605241_1280.png"
                    /> -->
                  </div>
                  <div>
                    <div>
                      {{ service.name[languageStore.language] }}
                    </div>
                    <div>
                      {{ service.serviceProviderCount }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="q-py-xs"></div>
    <div
      class="container-section-py-xs-0"
      v-if="publicSliderStore?.sliderData?.slider2.length != 0"
    >
      <div class="inner-section-px-0">
        <div class="full-width">
          <topSlide slide="slider2" />
        </div>
      </div>
    </div>
    <div
      class="container-section-py-xs"
      v-if="servicePublicStore?.allServices.length >= 24"
    >
      <div class="inner-section">
        <div class="full-width">
          <div class="q-py-md">
            <div class="row q-col-gutter-sm">
              <div
                class="col-lg-3 col-md-3 col-sm-2 col-3"
                v-for="(
                  service, index
                ) in servicePublicStore?.allServices?.slice(24, 36)"
                :key="index"
              >
                <div
                  class="text-center cursor-pointer service-item"
                  @click="
                    $router.push('/service_categorys_list/' + service._id);
                    selectedServiceAndCategory.serviceId = service._id;
                    selectedServiceAndCategory.serviceName = service.name;
                  "
                >
                  <!-- <q-badge class="provider-count-badge" color="orange">{{ service.serviceProviderCount }}</q-badge> -->
                  <div class="icon-relative-cont">
                    <!-- <q-img  src="/images/hexagonalshape.svg"
                    style="width: 56px; height: 48px;"
                    /> -->
                    <q-img src="/images/roundedsquareshape.svg" class="shape">
                      <template v-slot:loading> </template>
                    </q-img>
                    <q-img
                      class="absolute-top-center service-icon"
                      v-if="service.icon"
                      fit
                      :src="web_root_url + service.icon"
                    >
                      <template v-slot:loading> </template>
                    </q-img>
                    <q-img
                      v-else
                      class="absolute-top-center service-icon"
                      fit
                      src="/images/placeholder_image.png"
                    >
                      <template v-slot:loading> </template>
                    </q-img>
                    <div
                      class="absolute-top-center service-icon gradient-bg"
                    ></div>
                    <!-- <q-img fit
                    style="max-width: 50px; max-height: 50px;"
                    src="https://cdn.pixabay.com/photo/2019/11/06/05/47/stethoscope-4605241_1280.png"
                    /> -->
                  </div>
                  <div>
                    <div>
                      {{ service.name[languageStore.language] }}
                    </div>
                    <div>
                      {{ service.serviceProviderCount }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="q-py-xs"></div>
    <div
      class="container-section-py-xs-0"
      v-if="publicSliderStore?.sliderData?.slider3.length != 0"
    >
      <div class="inner-section-px-0">
        <div class="full-width">
          <topSlide slide="slider3" />
        </div>
      </div>
    </div>
    <div
      class="container-section-py-xs"
      v-if="servicePublicStore?.allServices.length >= 36"
    >
      <div class="inner-section">
        <div class="full-width">
          <div class="q-py-md">
            <div class="row q-col-gutter-sm">
              <div
                class="col-lg-3 col-md-3 col-sm-2 col-3"
                v-for="(
                  service, index
                ) in servicePublicStore?.allServices?.slice(36, 48)"
                :key="index"
              >
                <div
                  class="text-center cursor-pointer service-item"
                  @click="
                    $router.push('/service_categorys_list/' + service._id);
                    selectedServiceAndCategory.serviceId = service._id;
                    selectedServiceAndCategory.serviceName = service.name;
                  "
                >
                  <!-- <q-badge class="provider-count-badge" color="orange">{{ service.serviceProviderCount }}</q-badge> -->
                  <div class="icon-relative-cont">
                    <!-- <q-img  src="/images/hexagonalshape.svg"
                    style="width: 56px; height: 48px;"
                    /> -->
                    <q-img src="/images/roundedsquareshape.svg" class="shape">
                      <template v-slot:loading> </template>
                    </q-img>
                    <q-img
                      class="absolute-top-center service-icon"
                      v-if="service.icon"
                      fit
                      :src="web_root_url + service.icon"
                    >
                      <template v-slot:loading> </template>
                    </q-img>
                    <q-img
                      v-else
                      class="absolute-top-center service-icon"
                      fit
                      src="/images/placeholder_image.png"
                    >
                      <template v-slot:loading> </template>
                    </q-img>
                    <div
                      class="absolute-top-center service-icon gradient-bg"
                    ></div>
                    <!-- <q-img fit
                    style="max-width: 50px; max-height: 50px;"
                    src="https://cdn.pixabay.com/photo/2019/11/06/05/47/stethoscope-4605241_1280.png"
                    /> -->
                  </div>
                  <div>
                    <div>
                      {{ service.name[languageStore.language] }}
                    </div>
                    <div>
                      {{ service.serviceProviderCount }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="q-py-xs"></div>
    <div
      class="container-section-py-xs-0"
      v-if="publicSliderStore?.sliderData?.slider4.length != 0"
    >
      <div class="inner-section-px-0">
        <div class="full-width">
          <topSlide slide="slider4" />
        </div>
      </div>
    </div>
    <div
      class="container-section-py-xs"
      v-if="servicePublicStore?.allServices.length >= 48"
    >
      <div class="inner-section">
        <div class="full-width">
          <div class="q-py-md">
            <div class="row q-col-gutter-sm">
              <div
                class="col-lg-3 col-md-3 col-sm-2 col-3"
                v-for="(
                  service, index
                ) in servicePublicStore?.allServices?.slice(48, 60)"
                :key="index"
              >
                <div
                  class="text-center cursor-pointer service-item"
                  @click="
                    $router.push('/service_categorys_list/' + service._id);
                    selectedServiceAndCategory.serviceId = service._id;
                    selectedServiceAndCategory.serviceName = service.name;
                  "
                >
                  <!-- <q-badge class="provider-count-badge" color="orange">{{ service.serviceProviderCount }}</q-badge> -->
                  <div class="icon-relative-cont">
                    <!-- <q-img  src="/images/hexagonalshape.svg"
                    style="width: 56px; height: 48px;"
                    /> -->
                    <q-img src="/images/roundedsquareshape.svg" class="shape">
                      <template v-slot:loading> </template>
                    </q-img>
                    <q-img
                      class="absolute-top-center service-icon"
                      v-if="service.icon"
                      fit
                      :src="web_root_url + service.icon"
                    >
                      <template v-slot:loading> </template>
                    </q-img>
                    <q-img
                      v-else
                      class="absolute-top-center service-icon"
                      fit
                      src="/images/placeholder_image.png"
                    >
                      <template v-slot:loading> </template>
                    </q-img>
                    <div
                      class="absolute-top-center service-icon gradient-bg"
                    ></div>
                    <!-- <q-img fit
                    style="max-width: 50px; max-height: 50px;"
                    src="https://cdn.pixabay.com/photo/2019/11/06/05/47/stethoscope-4605241_1280.png"
                    /> -->
                  </div>
                  <div>
                    <div>
                      {{ service.name[languageStore.language] }}
                    </div>
                    <div>
                      {{ service.serviceProviderCount }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-section-py-xs">
      <div class="inner-section">
        <div class="full-width">
          <q-card>
            <div class="row q-col-gutter-sm">
              <div
                class="col-3"
                v-for="(topProvider, index) in topSuggestedStore?.topSuggested"
                :key="index"
              >
                <div class="q-pa-sm fs-12 text-center">
                  <q-img
                    v-if="topProvider.image"
                    width="55px"
                    :src="topProvider.image"
                  />
                  <q-img
                    v-else
                    width="55px"
                    src="/images/user-placeholder.jpg"
                  />
                  <div>
                    {{ topProvider.serviceTitle[languageStore.language] }}
                  </div>
                  <div>{{ topProvider.name[languageStore.language] }}</div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        {{ $t("noInfo") }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core";
import { useMeta } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { usePublicUserStore } from "src/stores/user/publicStore";
import { ref, onMounted } from "vue";
import { isObjEmpty } from "src/global_js/utils";
import topSlide from "src/components/slide/topSlide.vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { usePublicServiceStore } from "src/stores/service/publicServiceStore.js";
import { usePublicDashboardStore } from "src/stores/user/dashboardStore";
import { web_root_url } from "src/global_constant/root_url";
import { useTopSuggestedStore } from "src/stores/service/topSuggestedStore";
import { usePublicSliderStore } from "src/stores/slider/sliderGet";


const publicSliderStore = usePublicSliderStore();
publicSliderStore.getSliderData();

const topSuggestedStore = useTopSuggestedStore();
// get top suggested service providers
topSuggestedStore.getTopSuggestedProvider();

const dashboardStore = usePublicDashboardStore();
// get dashboard data
// dashboardStore.getDashboardData()
const selectedServiceAndCategory = useLocalStorage(
  "selected-service-and-category",
  {}
);
const servicePublicStore = usePublicServiceStore();
// get all services
servicePublicStore.getAllServices();

// import language changing function
const { t } = useI18n();
const languageStore = useLanguageStore();

const userBrowsingLocationLocalStore = useLocalStorage("browsing-location", {});
const publicUserStore = usePublicUserStore();
const districtStore = useDistrictStore();
districtStore.getAllDistricts();

// const updateBrowsingDistrict = () => {
//   userBrowsingLocationLocalStore.value.district =
//     publicUserStore.browsingLocation.district;
// };

onMounted(() => {
  // if (
  //   userBrowsingLocationLocalStore.value.district instanceof Object &&
  //   !isObjEmpty(userBrowsingLocationLocalStore.value.district)
  // ) {
  //   publicUserStore.browsingLocation.district =
  //     userBrowsingLocationLocalStore.value.district;
  // }
});
const metaData = {
  // sets document title
  title: "Home Page",
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

  // CSS tags
  link: {
    material: {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons",
    },
  },

  // JS tags
  script: {
    ldJson: {
      type: "application/ld+json",
      innerHTML: `{ "@context": "http://schema.org" }`,
    },
  },

  // <html> attributes
  htmlAttr: {
    "xmlns:cc": "http://creativecommons.org/ns#", // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined, // generates <html empty>
  },

  // <body> attributes
  bodyAttr: {
    "action-scope": "xyz", // generates <body action-scope="xyz">
    empty: undefined, // generates <body empty>
  },

  // <noscript> tags
  noscript: {
    default: "This is content for browsers with no JS (or disabled JS)",
  },
};

useMeta(metaData);
</script>
<style scoped>
.site-name {
  font-size: 4rem;
  line-height: 3rem;
  letter-spacing: -0.01562em;
}
@media screen and (max-width: 800px) {
  .site-name {
    font-size: 2rem;
    line-height: 1.2rem;
    letter-spacing: -0.01562em;
  }
}
.welcome-text {
  margin-top: 2rem;
  font-size: 2.125rem;
  line-height: 1.5rem;
  letter-spacing: 0.00735em;
}

@media screen and (max-width: 800px) {
  .welcome-text {
    margin-top: 1.3rem;
    font-size: 1.2rem;
    line-height: 1.5rem;
    letter-spacing: 0.00735em;
  }
}
.query-title {
  margin-top: 1rem;
  font-size: 2.125rem;
  line-height: 1.5rem;
  letter-spacing: 0.00735em;
}
@media screen and (max-width: 800px) {
  .query-title {
    margin-top: 0.3rem;
    font-size: 1.2rem;
    line-height: 1.5rem;
    letter-spacing: 0.00735em;
  }
}
.location-selector-bar {
  border: 1px solid white;
  border-radius: 4px;
  width: 400px;
  position: relative;
}

.location-selector {
  height: 40px !important;
  width: calc(100% - 105px) !important;
}

.location-search-btn {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 40px;
}

.service-item {
  /* min-width:78px; */
  /* height: 50px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 8px;
  font-size: 14px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  vertical-align: top;
  background: #fff;
  position: relative;
}
@media screen and (max-width: 950px) {
  .service-item {
    padding-bottom: 4px;
    font-size: 11px;
    box-shadow: none;
    border-radius: 4px;
    vertical-align: top;
    background: transparent;
    position: relative;
  }
}
.margin-neg {
  margin: -4px;
}
.icon-relative-cont {
  position: relative;
  width: 120px;
  height: 100px;
}
.absolute-top-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.shape {
  width: 98px;
  height: 98px;
}
.service-icon {
  max-width: 70px;
  max-height: 70px;
}
@media screen and (max-width: 950px) {
  .margin-neg {
    margin: -4px;
  }
  .icon-relative-cont {
    position: relative;
    width: 60px;
    height: 50px;
  }
  .absolute-top-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .shape {
    width: 48px;
    height: 48px;
  }
  .service-icon {
    max-width: 35px;
    max-height: 35px;
  }
}
.provider-count-badge {
  position: absolute;
  left: 5px;
  top: 5px;
  z-index: 999999999;
}
</style>
