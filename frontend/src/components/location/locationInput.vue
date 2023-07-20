<template lang="">
  <div>
    <input type="text" placeholder="Origin" ref="origin" />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const origin = ref(null)
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
