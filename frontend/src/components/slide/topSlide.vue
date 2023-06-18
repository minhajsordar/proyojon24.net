<template>
  <div class="">
    <q-carousel
    class="slide-image"
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
      <q-carousel-slide v-for="(sliderImage, index) in publicSliderStore?.sliderData[slide]" :key="index"  :name="index" :img-src="sliderImage" />
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePublicSliderStore } from "src/stores/slider/sliderGet";
defineProps({
  slide:{
    type: String
  }
})
const publicSliderStore = usePublicSliderStore()
const slide= ref(1)
const autoplay= ref(true)
</script>
<style>
.q-carousel__navigation-inner .q-btn{
  font-size: 6px !important;
  padding: 1px;
}
</style>
