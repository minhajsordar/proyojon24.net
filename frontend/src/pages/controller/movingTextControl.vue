<template>
  <div class="flex justify-center">
    <div class="moving-text-controller-container q-pa-sm">
      <q-card>
        <q-card-section>
          <q-input v-model="movingtextCreateUpdateStore.movingText" type="textarea" outlined dense rows="30"/>
        </q-card-section>
        <q-card-section class="q-pt-none flex justify-end">
          <q-btn :label="$t('update')" color="primary" @click="movingtextCreateUpdateStore.updateMovingTextManager"/>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import {useMovingTextCreateUpdateStore} from 'src/stores/movingtext/movingtextCreateUpdate.js'
const movingtextCreateUpdateStore = useMovingTextCreateUpdateStore()
movingtextCreateUpdateStore.getMovingText()
</script>
<style>
.moving-text-controller-container{
  margin-top: 25px;
  margin-bottom: 25px;
  width: 500px;
}
</style>
