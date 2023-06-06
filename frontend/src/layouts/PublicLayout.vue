<template>
  <q-layout class="bg-blue-grey-1" view="hHh lpR fFf">
    <!-- !$q.screen.gt.sm -->
    <q-header elevated class="text-white bg-blue-grey-10" height-hint="61.59">
      <publicUserHeader />
    </q-header>

    <q-page-container class="q-page-cont">
      <router-view />
      <div
        class="q-py-sm text-center bg-blue-grey-10 text-white full-width footer-area"
      >
        <div class="fs-12">
          <span class="text-yellow">Proyojon24.net</span> © 2023 All Rights
          Reserved
        </div>
        <div class="fs-10">
          Developed & Powered By:
          <span class="text-yellow">Service Zone Ltd</span>
        </div>
      </div>
    </q-page-container>
    <publicLayoutAllDialogs />
    <q-footer
      class="q-py-sm bg-blue-grey-10 flex justify-around"
      v-if="!$q.screen.gt.sm"
    >
      <q-btn
        icon="home"
        round
        dense
        glossy
        flat
        size="md"
        color="white"
        class="q-mr-sm"
        no-caps
        @click="$router.push('/')"
      />
      <q-btn
        icon="arrow_back_ios"
        round
        dense
        glossy
        flat
        size="md"
        color="white"
        class="q-mr-sm"
        no-caps
        @click="$router.back()"
      />
    </q-footer>
  </q-layout>
</template>

<script setup>
import publicUserHeader from "src/components/headers/publicUserHeader.vue";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import publicLayoutAllDialogs from "src/components/dialogs/publicLayoutAllDialogs.vue";

import { useRouter } from "vue-router";
const languageStore = useLanguageStore();
languageStore.switchToBn();
const router = useRouter();
</script>

<style lang="scss" scoped>
.q-page-cont {
  min-height: 100vh;
  position: relative;
  padding-bottom: 48px;
}
@media screen and (max-width: 1024px) {
  .q-page-cont {
    padding-bottom: 0px;
}
}
.footer-area {
  position: absolute;
  bottom: 0px;
}
@media screen and (max-width: 1024px) {
  .footer-area {
    position: absolute;
    bottom: 48px;
  }
}
</style>
