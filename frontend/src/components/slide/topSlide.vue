<template>
  <div class="">
    <!-- class="slide-image" -->
    <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(sliderImage, index) in publicSliderStore?.sliderData[slide]" :key="index"  :name="index" >
    <q-img :src="web_root_url+sliderImage"/>
    </swiper-slide>
  </swiper>
  </div>
</template>

<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';

import 'swiper/css/pagination';
import { ref } from 'vue'
import { web_root_url } from 'src/global_constant/root_url';
import { usePublicSliderStore } from "src/stores/slider/sliderGet";
defineProps({
  slide:{
    type: String
  }
})
const publicSliderStore = usePublicSliderStore()
const slideImg= ref(0)
const autoplay= ref(true)
</script>
<style>
.q-carousel__navigation-inner .q-btn{
  font-size: 6px !important;
  padding: 1px;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
