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
  </q-layout>
</template>

<script setup>
import userProfileHeader from "src/components/headers/userProfileHeader.vue";

</script>

<style lang="sass">
</style>
