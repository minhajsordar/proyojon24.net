<template>
  <q-layout class="bg-grey-1">
    <q-header
      elevated
      class="text-white"
      height-hint="61.59"
    >
    <userProfileHeader/>

  </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <profileLayoutAllDialogs />
    <q-footer class="q-py-sm text-center">Proyojon24.net © 2023 All Rights Reserved</q-footer>
  </q-layout>
</template>

<script setup>
import userProfileHeader from "src/components/headers/userProfileHeader.vue";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import profileLayoutAllDialogs from "src/components/dialogs/profileLayoutAllDialogs.vue"
const languageStore = useLanguageStore()
languageStore.switchToBn()
</script>

<style lang="sass">
</style>
