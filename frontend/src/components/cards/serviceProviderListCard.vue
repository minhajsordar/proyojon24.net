<template lang="">
  <div class="relative-position">
    <div class="gradient-bg-medium"></div>
    <q-card class="full-width hover-serviceprovider-card  cursor-pointer "
    @click="function(){
      if(register){
        $router.push('/register')
      }else{
        $router.push('/service_provider/'+serviceProvider._id)
      }
    }
    "
    >
    <div class="listcard-cont ">
        <q-badge v-if="serviceProvider.viewCount" class="view-badge-top-right" color="pink"> <q-icon name="visibility"/> {{serviceProvider.viewCount}}</q-badge>
        <q-card-section class="image-section q-pa-sm">
          <q-img :src="web_root_url+serviceProvider.image" />
        </q-card-section>
        <q-card-section class="description-section q-pa-sm">
          <div class="text-bold">
            {{serviceProvider.name[languageStore.language]}}
          </div>
          <q-separator/>
          <div>
            <span>{{serviceProvider.serviceTitle[languageStore.language]}}</span>
          </div>
          <q-separator/>
          <div class="text-blue-grey-10">
            <span>মোবাইল: <q-icon class="bg-primary text-white" name="call"/> ০১xxxxxxxxx</span>
          </div>
          <q-separator/>
          <div class="fs-12 text-bold">
            <q-icon class="bg-primary text-white " name="location_on"/>
            <span v-if="serviceProvider.serviceProviderLocation?.division?.name[languageStore.language]"> {{ " "+serviceProvider.serviceProviderLocation?.division?.name[languageStore.language]}} </span>
            <span v-if="serviceProvider.serviceProviderLocation?.district?.name[languageStore.language]">, {{serviceProvider.serviceProviderLocation?.district?.name[languageStore.language]}} </span>
            <span v-if="serviceProvider.serviceProviderLocation?.subDistrict?.name[languageStore.language]">, {{serviceProvider.serviceProviderLocation?.subDistrict?.name[languageStore.language]}} </span>
            <span v-if="serviceProvider.serviceProviderLocation?.union?.name[languageStore.language]">, {{serviceProvider.serviceProviderLocation?.union?.name[languageStore.language]}}</span>
            <span v-if="serviceProvider.serviceProviderLocation?.exact">, {{serviceProvider.serviceProviderLocation?.exact[languageStore.language]}}</span>
          </div>
        </q-card-section>
      </div>
    </q-card>

  </div>
</template>
<script setup>
import { useLanguageStore } from 'src/stores/lang/languageSettingsStore';
import { web_root_url } from 'src/global_constant/root_url';
defineProps({
  serviceProvider:{
    type:Object,
    default:null
  },register:{
    type: Boolean,
    default: false
  }
})
const languageStore = useLanguageStore()
</script>
<style lang="scss">
</style>
