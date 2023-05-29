<template lang="">
  <q-card class="full-width hover-serviceprovider-card"

  @click="$router.push('/service_provider/'+serviceProvider._id)"
  >
    <div class="listcard-cont">
      <q-card-section class="image-section q-pa-sm">
        <q-img :src="serviceProvider.image" />
      </q-card-section>
      <q-card-section class="description-section q-pa-sm">
        <div class="text-bold">
          {{serviceProvider.name[languageStore.language]}}
        </div>
        <q-separator/>
        <div>
          <span>{{serviceProvider.serviceTitle[languageStore.language]}}, </span>
          <span>{{serviceProvider.specialties[languageStore.language]}}</span>
        </div>
        <q-separator/>
        <div class="text-blue-grey-10">
          <span>মোবাইল: <q-icon class="bg-yellow-14 text-white" name="call"/> ০১xxxxxxxxx</span>
        </div>
        <q-separator/>
        <div class="fs-12 text-bold">
          <q-icon class="bg-yellow-14 text-white " name="location_on"/>
          <span>{{serviceProvider.serviceProviderLocation?.division?.name[languageStore.language]}}, </span>
          <span>{{serviceProvider.serviceProviderLocation?.district?.name[languageStore.language]}}, </span>
          <span>{{serviceProvider.serviceProviderLocation?.subDistrict?.name[languageStore.language]}}, </span>
          <span>{{serviceProvider.serviceProviderLocation?.union?.name[languageStore.language]}}, </span>
          <span v-if="serviceProvider.serviceProviderLocation?.exact">{{serviceProvider.serviceProviderLocation?.exact[languageStore.language]}}</span>
        </div>
      </q-card-section>
    </div>
  </q-card>
</template>
<script setup>
import { useLanguageStore } from 'src/stores/lang/languageSettingsStore';

defineProps({
  serviceProvider:{
    type:Object,
    default:null
  }
})
const languageStore = useLanguageStore()
</script>
<style lang="scss">
.listcard-cont{
  display:flex;
  align-items: center;
}
.image-section{
width: 100px;
}
.description-section{
width: calc(100% - 100px);
}
.hover-serviceprovider-card:hover{
  background-color: $blue-grey-2;
}
</style>
