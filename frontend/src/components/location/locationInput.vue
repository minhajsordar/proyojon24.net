<template lang="">
  <div>
    <input type="text" placeholder="Origin" ref="origin" />
    <q-btn label='getval' @click="getVal"/>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const origin = ref(null)
const getVal = ()=>{
  console.log(origin.value.value)
}
onMounted(()=>{
  const autocomplete = new google.maps.places.Autocomplete(origin.value);
  autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log(place);
       })
})

</script>
<style lang="">

</style>
