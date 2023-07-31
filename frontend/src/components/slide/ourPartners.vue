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
        clickable: false,
      }"
      :navigation="false"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide
        class="our-partner-slide"
        v-for="(partner, index) in ourBusinessPartners.ourBusinessPartnersData?.ourBusinessPartners"
        :key="index"
        :name="index"
      >
        <div class="q-pt-xs">
          <div class="flex justify-center">
          <img :src="web_root_url + partner.image" />
        </div>
        <div class="fs-14">{{ partner.name }}</div>
        <div class="fs-13">{{ partner.subTitle }}</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";

import "swiper/css/pagination";
import "./style.css";
import { ref } from "vue";
import { web_root_url } from "src/global_constant/root_url";
import { usePublicSliderStore } from "src/stores/slider/sliderGet";
const modules = [Autoplay];

import { useOurBusinessPartnersStore } from "src/stores/dashboard/ourBusinessPartnersStore";
const ourBusinessPartners = useOurBusinessPartnersStore()
const publicSliderStore = usePublicSliderStore();
const slideImg = ref(0);
const autoplay = ref(true);
</script>
<style>
.q-carousel__navigation-inner .q-btn {
  font-size: 6px !important;
  padding: 1px;
}
</style>
