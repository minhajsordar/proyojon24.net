<template >
  <div class="container-section-py-sm">
    <div class="inner-section">
    <profileEdit/>
    </div>
    </div>
</template>
<script setup>
import { useMeta } from "quasar";
import { useAuthStore } from "src/stores/auth/authStore";
import { onMounted } from "vue";
import profileEdit from "src/components/profile/profileEdit.vue"
const authStore = useAuthStore()
onMounted(()=>{
  authStore.checkLogin()
  authStore.userAuthInfo.password = null
})
const metaData = {
  // sets document title
  title: 'Settings Profile',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title} - Proyojon24.net`,

  // meta tags
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'keywords', content: 'proyojon24 services service-provider' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle:  {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template (ogTitle) {
        return `${ogTitle} - Proyojon24.net`
      }
    }
  }
}

useMeta(metaData)
</script>
<style>

</style>
