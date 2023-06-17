<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <q-card class="border-primary">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey-10"
            indicator-color="blue-grey-10"
            active-bg-color="blue-grey-2"
            align="justify"
            narrow-indicator
          >
            <q-tab class="bg-blue-grey-1" name="service" :label="$t('services.services')" />
            <q-tab class="bg-blue-grey-1" name="service_category" :label="$t('services.service_category')" />
            <q-tab class="bg-blue-grey-1" name="service_provider" :label="$t('services.service_provider')" />
          </q-tabs>
          <q-separator/>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="service">
              <serviceTable/>
            </q-tab-panel>
            <q-tab-panel name="service_category">
              <serviceCategoryTable/>
            </q-tab-panel>
            <q-tab-panel name="service_provider">
              <serviceProviderTable/>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar, useMeta } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import serviceTable from "src/components/services/serviceTable.vue"
import serviceCategoryTable from "src/components/services/serviceCategoryTable.vue"
import serviceProviderTable from "src/components/services/serviceProviderTable.vue";
import { useI18n } from "vue-i18n";
import { useServiceCategoryStore } from "src/stores/service/serviceCategoryStore";
import { useAuthStore } from "src/stores/auth/authStore";
import { useRouter } from "vue-router";
import { useServiceStore } from "src/stores/service/serviceStore";
import { useServiceProviderStore } from "src/stores/service/serviceProviderStore";

const router = useRouter()
const authStore = useAuthStore()
onMounted(()=>{
  if(!authStore.checkLogin()){
    router.push('/home')
  }
  if(!authStore.loginUserInfo.isSuperAdmin || !authStore.loginUserInfo.isAdmin){
    router.push("/profile")
  }
})

const serviceStore = useServiceStore();
serviceStore.getServiceList();
const serviceProviderStore = useServiceProviderStore();
serviceProviderStore.getServiceProviderList()
const serviceCategoryStore = useServiceCategoryStore();
serviceCategoryStore.getServiceCategoryList();
serviceCategoryStore.getAllServiceCategorys();

const { t } = useI18n();
const languageStore = useLanguageStore();
const tab = ref('service')
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
