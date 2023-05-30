<template>
  <q-dialog v-model="publicUserStore.openFilterByServiceCategoryDialog"
  persistent
  full-height
  >
    <q-card class="q-pa-md">
      <div class="flex justify-between q">
        <div>{{ $t('selectCategory') }}</div>
        <q-icon name="close" v-close-popup
        @click=" publicUserStore.openFilterByServiceCategoryDialog = false"
        />
      </div>
      <q-separator class="q-my-md"/>
      <div class="row q-col-gutter-sm">
        service category
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>

import { useLocalStorage } from "@vueuse/core";
import { useMeta } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { usePublicUserStore } from "src/stores/user/publicStore";
import { ref, onBeforeMount } from "vue";
const userBrowsingLocationLocalStore = useLocalStorage("browsing-location", {});
const publicUserStore = usePublicUserStore();
const languageStore = useLanguageStore();

</script>
<style lang="scss"></style>
