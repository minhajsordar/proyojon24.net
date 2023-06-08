<template >
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width  text-blue-grey-8">
        <q-card class="q-pa-md q-mb-lg border-primary">
          <div class="flex ">
            <div >
              <q-avatar rounded size="130px">
              <img v-if="authStore.loginUserInfo?.profileImage" :src="authStore.loginUserInfo.profileImage" />
              <img src="/images/noormohammad.jpeg" />
            </q-avatar>
            </div>
            <div class="q-ml-md">
               <div class="fs-20 text-bold">{{ authStore?.loginUserInfo?.name[languageStore.language] }}</div>
               <div class="fs-13 text-bold text-blue-grey-6 q-mt-sm">
                <q-icon name="person"/>
                <span>
                  {{
                    authStore.loginUserInfo?.isSuperAdmin
                      ? "Super Admin"
                      : authStore.loginUserInfo?.isAdmin
                      ? "Admin"
                      : authStore.loginUserInfo?.permission == 'self'?
                      'Service Provider'
                      :authStore.loginUserInfo?.permission?
                      "Admin "+authStore.loginUserInfo.permission:""
                  }}
                </span>
                <q-icon v-if="authStore?.loginUserInfo?.presentAddress[languageStore.language]" class="q-ml-sm" name="location_on"/>
                <span>
                  {{ authStore?.loginUserInfo?.presentAddress[languageStore.language] }}
                </span>
                <q-icon class="q-ml-sm" name="alternate_email"/>
                <span>
                  {{ authStore?.loginUserInfo?.email}}
                </span>
               </div>
            </div>
          </div>
        </q-card>
        <profileInformations />
      </div>
      <!-- <div>
        {{ loginUser?.email }}
        {{ authStore?.loginUserInfo }}
      </div> -->
    </div>
  </div>

</template>
<script setup>
import { useMeta } from "quasar";
import { useAuthStore, loginUser } from "src/stores/auth/authStore";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import profileInformations from "src/components/profile/profileInformations.vue";

const languageStore = useLanguageStore()
const authStore = useAuthStore()
const router = useRouter()
onMounted(()=>{
  if(!authStore.checkLogin()){
    router.push('/login')
  }
})

const metaData = {
  // sets document title
  title: 'User Profile',
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
