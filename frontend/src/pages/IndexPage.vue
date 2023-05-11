<template>
  <q-page class="flex flex-center">
    <div class="coming-soon-image">
      <q-img src="/images/coming-soon.jpeg"/>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
<style scoped>

.coming-soon-image{
  width: 100%
}
</style>
