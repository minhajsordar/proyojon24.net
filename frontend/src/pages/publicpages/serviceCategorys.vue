<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <div>
          <div class="row q-col-gutter-sm">
            <div class="col-lg-3 col-md-3 col-sm-2 col-3"
            v-for="(serviceCategory,index) in serviceCategoryStore.allServiceCategoryList" :key="index"
            >
            <div class="text-center cursor-pointer service-item"
              @click="$router.push('/service_category/'+serviceCategory._id);
              selectedServiceAndCategory.serviceCategoryId = serviceCategory._id
              "
              >
                <div class="icon-relative-cont">

                  <!-- <q-img  src="images/hexagonalshape.svg"
                  style="width: 56px; height: 48px;"
                  /> -->
                  <q-img  src="/images/roundedsquareshape.svg"
                  class="shape"
                  />
                  <q-img class="absolute-top-center service-icon"
                  v-if="serviceCategory.icon"
                  fit
                  :src="serviceCategory.icon"
                  />
                  <q-img
                  v-else class="absolute-top-center service-icon"
                   fit
                  src="images/placeholder_image.png"
                  />
                  <!-- <q-img fit
                  style="max-width: 50px; max-height: 50px;"
                  src="https://cdn.pixabay.com/photo/2019/11/06/05/47/stethoscope-4605241_1280.png"
                  /> -->
                </div>
                <div >
                  {{ serviceCategory.name[languageStore.language] }}
                </div>
              </div>

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
import { useLocalStorage } from "@vueuse/core";

const selectedServiceAndCategory = useLocalStorage('selected-service-and-category',{})
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
<style scoped>

.service-item{
  /* min-width:78px; */
  /* height: 50px; */
  display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 8px;
font-size: 14px;
box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
border-radius: 4px;
vertical-align: top;
background: #fff;
position: relative;
}
@media screen and (max-width: 950px) {
  .service-item{
    padding-bottom: 4px;
    font-size: 11px;
    box-shadow: none;
    border-radius: 4px;
    vertical-align: top;
    background: transparent;
    position: relative;
}
}
.margin-neg{
  margin:-4px;
}
.icon-relative-cont{
  position: relative;
  width: 120px;
  height: 100px;
}
.absolute-top-center{
  position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.shape{
  width: 98px;
  height: 98px;
}
.service-icon{
  max-width: 70px;
  max-height: 70px;
}
@media screen and (max-width: 950px) {

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

.shape{
  width: 48px;
  height: 48px;
}
.service-icon{
  max-width: 35px;
  max-height: 35px;
}
}
</style>
