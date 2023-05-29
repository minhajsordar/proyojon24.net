<template>
  <div class="container-section-py-xs">
    <div class="inner-section">
      <div class="full-width">
        <div class="">
          <div class="q-py-sm q-px-md q-mb-sm bg-blue-grey-10 text-yellow-13 text-left fs-17">{{ $t("services.ourAllServices") }}</div>
          <div class="row q-col-gutter-sm">
            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4 col-3"
            v-for="(service,index) in servicePublicStore.allServices" :key="index"
            >
              <q-card class="full-width full-height text-center q-pa-sm"
              @click="$router.push('/service/'+service._id)"
              >
                <div>
                  <q-img
                  v-if="service.icon"
                  fit
                  style="max-width: 50px; max-height: 50px;"
                  :src="service.icon"
                  />
                  <q-img
                  v-else
                   fit
                  style="max-width: 50px; max-height: 50px;"
                  src="frontend/public/images/placeholder_image.png"
                  />
                  <!-- <q-img fit
                  style="max-width: 50px; max-height: 50px;"
                  src="https://cdn.pixabay.com/photo/2019/11/06/05/47/stethoscope-4605241_1280.png"
                  /> -->
                </div>
                <div class="q-mt-sm">
                  {{ service.name[languageStore.language] }}
                </div>
              </q-card>
            </div>
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
import serviceTable from "src/components/services/serviceTable.vue"
import serviceCategoryTable from "src/components/services/serviceCategoryTable.vue"
import serviceProviderTable from "src/components/services/serviceProviderTable.vue";
import { useI18n } from "vue-i18n";
import { useServiceStore } from "src/stores/service/serviceStore";
import { usePublicServiceStore } from "src/stores/service/publicServiceStore.js";

const servicePublicStore = usePublicServiceStore();
servicePublicStore.getAllServices();
const { t } = useI18n();
const languageStore = useLanguageStore();



const metaData = {
  // sets document title
  title: 'Services List',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title} - Proyojon24.net`,

  // meta tags
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'keywords', content: 'proyojon24 services service-provider' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle:  {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template (ogTitle) {
        return `${ogTitle} - Proyojon24.net`
      }
    }
  }
}

useMeta(metaData)
</script>
<style>
</style>
