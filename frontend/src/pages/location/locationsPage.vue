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
            <q-tab name="division" :label="$t('location.division')" />
            <q-tab name="district" :label="$t('location.district')" />
            <q-tab name="subdistrict" :label="$t('location.subdistrict')" />
            <q-tab name="union" :label="$t('location.union')" />
            <q-tab name="ward" :label="$t('location.ward')" />
          </q-tabs>
          <q-separator/>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="division">
              <divisionTable/>
            </q-tab-panel>
            <q-tab-panel name="district">
              <districtTable/>
            </q-tab-panel>
            <q-tab-panel name="subdistrict">
              <subDistrictTable/>
            </q-tab-panel>
            <q-tab-panel name="union">
              <unionTable/>
            </q-tab-panel>
            <q-tab-panel name="ward">
              <wardTable/>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
    </div>
</template>

<script setup>
import { useMeta } from "quasar";
import { useAuthStore } from "src/stores/auth/authStore";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { onBeforeMount, ref } from "vue";
import divisionTable from "src/components/locations/divisionTable.vue";
import districtTable from "src/components/locations/districtTable.vue";
import subDistrictTable from "src/components/locations/subDistrictTable.vue";
import unionTable from "src/components/locations/unionTable.vue";
import wardTable from "src/components/locations/wardTable.vue";
import { useUnionStore } from "src/stores/locations/unionStore";
import { useWardStore } from "src/stores/locations/wardStore";
import { useSubDistrictStore } from "src/stores/locations/subDistrictStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { useDivisionStore } from "src/stores/locations/divisionStore";
const languageStore =useLanguageStore()
const tab = ref("division")
const authStore = useAuthStore()
const divisionStore = useDivisionStore()
const districtStore = useDistrictStore()
const subDistrictStore = useSubDistrictStore()
const unionStore = useUnionStore()
const wardStore = useWardStore()


divisionStore.getDivisionList()
districtStore.getDistrictList()
subDistrictStore.getSubDistrictList()
unionStore.getUnionList()
wardStore.getWardList()

const metaData = {
  // sets document title
  title: 'Locations',
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

</style>
