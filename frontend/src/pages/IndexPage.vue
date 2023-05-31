<template>
  <q-page class="q-py-sm q-pa-md bg-blue-grey-10 text-white pattern-bg-image">
    <div class="container-section" style="min-height:800px">
      <div class="inner-section">
        <div class="full-width">
          <div class="text-bold site-name text-center text-yellow-13">
            Proyojon24
          </div>
          <div class="text-bold welcome-text text-center">
            আপনাকে <span class="text-yellow-13">স্বাগতম</span>
          </div>
          <div class="text-bold query-title text-center">
            আপনার <span class="text-yellow-13">জেলা</span> সিলেক্ট করুন
          </div>
          <div class="full-width flex justify-center q-mt-lg">
            <div class="flex location-selector-bar">
              <q-select
                v-model="publicUserStore.browsingLocation.district"
                :options="districtStore.allDistricts"
                options-dense
                :option-label="
                  (opt) =>
                    Object(opt) === opt && 'name' in opt
                      ? opt.name[languageStore.language]
                      : null
                "
                @update:model-value="updateBrowsingDistrict"
                class="location-selector"
                bg-color="white"
                color="black"
                outlined
                dense
                autofocus
                table-colspan="4"
              />
              <q-btn
                class="bg-yellow-13 text-black location-search-btn"
                @click="
                  () => {
                    if (publicUserStore.browsingLocation.district !== null)
                      $router.push('/allservices');
                  }
                "
                label="Enter now"
                flat
                glossy
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core";
import { useMeta } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { usePublicUserStore } from "src/stores/user/publicStore";
import { ref, onMounted } from "vue";
import { isObjEmpty } from "src/global_js/utils";
const userBrowsingLocationLocalStore = useLocalStorage("browsing-location", {});
const district = ref(null);
const publicUserStore = usePublicUserStore();
const languageStore = useLanguageStore();
const districtStore = useDistrictStore();
districtStore.getAllDistricts();

const updateBrowsingDistrict = () => {
  userBrowsingLocationLocalStore.value.district = publicUserStore.browsingLocation.district;
};

onMounted(() => {
  if (
    userBrowsingLocationLocalStore.value.district instanceof Object &&
    !isObjEmpty(userBrowsingLocationLocalStore.value.district)
  ) {
    publicUserStore.browsingLocation.district = userBrowsingLocationLocalStore.value.district;
  }
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
  font-size: 5rem;
  line-height: 3rem;
  letter-spacing: -0.01562em;
}
@media screen and (max-width: 800px) {
  .site-name {
    font-size: 2.5rem;
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
    font-size: 1.6rem;
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
    margin-top: 1.3rem;
    font-size: 1.3rem;
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
</style>
