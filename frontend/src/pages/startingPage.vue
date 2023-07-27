<template>
  <div class="sp-cont relative-position">
    <div class="sp-anim">
      <q-img width="300px" src="/images/icon.png"/>

    </div>
    <div
      class="q-py-sm text-center text-accent full-width footer-area absolute-bottom"
    >
      <div class="fs-14">
        from
      </div>
      <div class="fs-14">
        service zone
      </div>
      <div class="bottom-fx"></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
onMounted(() => {
  setTimeout(()=>{
    router.push('/home')
  },2000)
})
</script>
<style>
.sp-cont{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sp-anim{
  opacity: 1;
  animation: fadeInOut 2s ease-in-out 0s infinite forwards;
}
@keyframes fadeInOut {
  50%{
    opacity: 0;
  }
}
</style>
