<template>
  <q-card class="q-pa-md q-ma-sm ">
    <div v-if="serviceProviderPreview"  class="fs-16">
      <div class="fs-24 q-mb-md">Name: {{ serviceProviderPreview.name[languageStore.language] }}</div>
      <p>Description: {{ serviceProviderPreview.description[languageStore.language] }}</p>
      <p>
        Location: {{ serviceProviderPreview.serviceProviderLocation.division.name[languageStore.language] }},
        {{ serviceProviderPreview.serviceProviderLocation.district.name[languageStore.language] }},
        {{ serviceProviderPreview.serviceProviderLocation.subDistrict.name[languageStore.language] }},
        {{ serviceProviderPreview.serviceProviderLocation.union.name[languageStore.language] }}
      </p>
      <p>Service Title: {{ serviceProviderPreview.serviceTitle[languageStore.language] }}</p>
      <p>Phone Number1: {{ serviceProviderPreview.phoneNumber1 }}</p>
      <p v-if="serviceProviderPreview.phoneNumber2">Phone Number2: {{ serviceProviderPreview.phoneNumber2 }}</p>
      <p>Email: {{ serviceProviderPreview.email }}</p>
      <p>Facebook: {{ serviceProviderPreview.facebook }}</p>
      <p>Whats app: {{ serviceProviderPreview.whatsapp }}</p>
      <p>Imo: {{ serviceProviderPreview.imo }}</p>
      <p>Twitter: {{ serviceProviderPreview.twitter }}</p>
      <p>Created At: {{ date.formatDate(serviceProviderPreview.createdAt, 'YYYY-MM-DD HH:mm:ss') }}</p>
      <p>Updated At: {{ date.formatDate(serviceProviderPreview.updatedAt, 'YYYY-MM-DD HH:mm:ss') }}</p>
      <div v-if="serviceProviderPreview.image">
        <q-img  :src="web_root_url+serviceProviderPreview.image"/>
      </div>
      <div v-if="serviceProviderPreview.serviceImage">
        <q-img :src="web_root_url+serviceProviderPreview.serviceImage"/>
      </div>
    </div>
  </q-card>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { web_root_url } from "src/global_constant/root_url";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useServiceProviderPreviewStore } from "src/stores/service/serviceProviderPreviewStore";
import { useRoute } from "vue-router";
import { date } from 'quasar'
const serviceProviderPreviewStore = useServiceProviderPreviewStore();
const route = useRoute();
const languageStore = useLanguageStore();
const {serviceProviderPreview} = storeToRefs(serviceProviderPreviewStore)

serviceProviderPreviewStore.getServiceProviderPreview(route.params.id);

console.log(route.params.id);
</script>
