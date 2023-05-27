<template>
  <q-layout class="bg-blue-grey-1">
    <q-header elevated class="text-white bg-blue-grey-10" height-hint="61.59">
      <publicUserHeader/>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="q-py-sm text-center bg-blue-grey-10"
      >
      <div>Proyojon24.net © 2023 All Rights Reserved</div>
      <div>Developed & Powered By: Service Zone Ltd</div>
      </q-footer
    >
  </q-layout>
</template>

<script setup>
import publicUserHeader from "src/components/headers/publicUserHeader.vue";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useRouter } from "vue-router";
const languageStore = useLanguageStore();
languageStore.switchToBn();
const router = useRouter();
</script>

<style lang="sass"></style>
