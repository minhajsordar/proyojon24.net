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
      <q-carousel-slide  :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide  :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide  :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide  :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const slide= ref(1)
const autoplay= ref(true)
</script>
<style>
.q-carousel__navigation-inner .q-btn{
  font-size: 6px !important;
  padding: 1px;
}
</style>
