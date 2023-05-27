<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <div class="q-pa-sm">
          <div class="row q-col-gutter-sm">
            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4 col-3"
            v-for="(serviceCategory,index) in serviceCategoryStore.allServiceCategoryList" :key="index"
            >
              <q-card class="full-width full-height text-center q-pa-sm"
              @click="$router.push('/service_category/'+serviceCategory._id)"
              >
                <div>
                  <q-img fit
                  style="max-width: 50px; max-height: 50px;"
                  :src="serviceCategory.icon"
                  />
                  <!-- <q-img fit
                  style="max-width: 50px; max-height: 50px;"
                  src="https://cdn.pixabay.com/photo/2019/11/06/05/47/stethoscope-4605241_1280.png"
                  /> -->
                </div>
                <div class="q-mt-sm">
                  {{ serviceCategory.name[languageStore.language] }}
                </div>
              </q-card>
            </div>
            <div class="col-12"
            v-if="serviceCategoryStore.allServiceCategoryList && serviceCategoryStore.allServiceCategoryList.length ==0"
            >
            এখনও তথ্য যুক্ত করা হয়নি।
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
import { useI18n } from "vue-i18n";
import { usePublicServiceStore } from "src/stores/service/publicServiceStore.js";
import { useServiceCategoryStore } from "src/stores/service/serviceCategoryStore";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const languageStore = useLanguageStore();
const router = useRouter()
const route = useRoute()
const serviceCategoryStore = useServiceCategoryStore();
if(route.params.id){
  serviceCategoryStore.getAllServiceCategorys(route.params.id)
}else{
  router.push("/allservices")
}



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
