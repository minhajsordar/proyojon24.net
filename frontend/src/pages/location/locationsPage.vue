<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <q-card class="border-primary">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
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
              <div class="text-h6">{{ $t('location.divisionList') }}</div>
      <q-separator class="q-my-sm"/>
              <divisionTable/>
            </q-tab-panel>
            <q-tab-panel name="district">
              <div class="text-h6">{{$t('location.districtList')}}</div>
      <q-separator class="q-my-sm"/>
              <districtTable/>
            </q-tab-panel>
            <q-tab-panel name="subdistrict">
              <div class="text-h6">{{$t('location.subdistrictList')}}</div>
      <q-separator class="q-my-sm"/>
              <subDistrictTable/>
            </q-tab-panel>
            <q-tab-panel name="union">
              <div class="text-h6">{{$t('location.unionList')}}</div>
      <q-separator class="q-my-sm"/>
              <unionTable/>
            </q-tab-panel>
            <q-tab-panel name="ward">
              <div class="text-h6">{{$t('location.wardList')}}</div>
      <q-separator class="q-my-sm"/>
              <wardTable/>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth/authStore";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { onMounted, ref } from "vue";
import divisionTable from "src/components/locations/divisionTable.vue";
import districtTable from "src/components/locations/districtTable.vue";
import subDistrictTable from "src/components/locations/subDistrictTable.vue";
import unionTable from "src/components/locations/unionTable.vue";
import wardTable from "src/components/locations/wardTable.vue";
const languageStore =useLanguageStore()
const tab = ref("division")
const authStore = useAuthStore()
onMounted(()=>{
  authStore.checkLogin()
})
</script>
<style scoped>

</style>
