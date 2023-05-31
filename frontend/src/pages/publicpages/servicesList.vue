<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <div class="">
          <div class="row q-col-gutter-sm">
            <div class="col-lg-1 col-md-1 col-sm-2 col-3"
            v-for="(service,index) in servicePublicStore.allServices" :key="index"
            >
              <div class="text-center cursor-pointer service-item"
              @click="$router.push('/service/'+service._id)"
              >
                <div class="icon-relative-cont">

                  <!-- <q-img  src="images/hexagonalshape.svg"
                  style="width: 56px; height: 48px;"
                  /> -->
                  <q-img  src="images/roundedsquareshape.svg"
                  style="width: 48px; height: 48px;"
                  />
                  <q-img class="absolute-top-center"
                  v-if="service.icon"
                  fit
                  style="max-width: 35px; max-height: 35px;"
                  :src="service.icon"
                  />
                  <q-img
                  v-else class="absolute-top-center"
                   fit
                  style="max-width: 35px; max-height: 35px;"
                  src="images/placeholder_image.png"
                  />
                  <!-- <q-img fit
                  style="max-width: 50px; max-height: 50px;"
                  src="https://cdn.pixabay.com/photo/2019/11/06/05/47/stethoscope-4605241_1280.png"
                  /> -->
                </div>
                <div class="fs-11">
                  {{ service.name[languageStore.language] }}
                </div>
              </div>
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
.service-item{
  /* min-width:78px; */
  /* height: 50px; */
  display: flex;
    flex-direction: column;
    align-items: center;
}
.margin-neg{
  margin:-4px;
}
.icon-relative-cont{
  position: relative;
  width: 60px;
  height: 50px;
}
.absolute-top-center{
  position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
</style>
