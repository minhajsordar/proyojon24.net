<template>
  <div class="">
    <!-- class="slide-image" -->
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide v-for="(sliderImage, index) in publicSliderStore?.sliderData['slider1']" :key="index"  :name="index" :img-src="web_root_url+'/uploads/image-1687054044168.png'" />
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { web_root_url } from 'src/global_constant/root_url';
import { usePublicSliderStore } from "src/stores/slider/sliderGet";
defineProps({
  slide:{
    type: String
  }
})
const publicSliderStore = usePublicSliderStore()
const slide= ref(0)
const autoplay= ref(true)
</script>
<style>
.q-carousel__navigation-inner .q-btn{
  font-size: 6px !important;
  padding: 1px;
}
</style>
