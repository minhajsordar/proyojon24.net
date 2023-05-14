<template >
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width  text-blue-grey-8">
        <q-card class="q-pa-md q-mb-lg border-primary">
          <div class="flex q-mb-md">
            <div >
              <q-avatar rounded size="130px">
              <img src="https://cdn.quasar.dev/img/avatar1.jpg" />
            </q-avatar>
            </div>
            <div class="q-ml-md">
               <div class="fs-20 text-bold">{{ authStore?.loginUserInfo?.name.bn }}</div>
               <div class="fs-13 text-bold text-blue-grey-6 q-mt-sm">
                <q-icon name="person"/>
                <span>
                  {{ authStore.loginUserInfo?.isSuperAdmin ? 'Super Admin': authStore.loginUserInfo?.isAdmin? 'Admin' : 'Service Provider'}}
                </span>
                <q-icon class="q-ml-sm" name="location_on"/>
                <span>
                  {{ authStore?.loginUserInfo?.presentAddress[authStore?.loginUserInfo?.presentAddress.length -1].bn }}
                </span>
                <q-icon class="q-ml-sm" name="alternate_email"/>
                <span>
                  {{ authStore?.loginUserInfo?.email}}
                </span>
               </div>
            </div>
          </div>
        </q-card>
        <q-card class="q-pa-md border-primary">
          <div class="flex justify-between q-mb-md">
            <div class="fs-20 text-bold">Profile Details</div>
            <q-btn label="Edit" color="primary"/>
          </div>
          <div class="full-width">
            <q-seperator/>
          </div>
          <div class="row q-mb-md">
            <div class="col-12">
              <q-seperator/>
            </div>
            <div class="col-lg-4 col-sm-12 col-12">
              <span class="text-bold">Name:</span>
            </div>
            <div class="col-lg-4 col-sm-12 col-12">
               {{ authStore?.loginUserInfo?.name.bn }}
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-lg-4 col-sm-12 col-12">
              <span class="text-bold">Email:</span>
            </div>
            <div class="col-lg-4 col-sm-12 col-12">
               {{ authStore?.loginUserInfo?.email }}
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-lg-4 col-sm-12 col-12">
              <span class="text-bold">Phone:</span>
            </div>
            <div class="col-lg-4 col-sm-12 col-12">
               {{ authStore?.loginUserInfo?.phone[authStore?.loginUserInfo?.phone.length-1] }}
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-lg-4 col-sm-12 col-12">
              <span class="text-bold">Nid No:</span>
            </div>
            <div class="col-lg-4 col-sm-12 col-12">
               {{ authStore?.loginUserInfo?.nidNo[authStore?.loginUserInfo?.nidNo.length-1] }}
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-lg-4 col-sm-12 col-12">
              <span class="text-bold">presentAddress:</span>
            </div>
            <div class="col-lg-4 col-sm-12 col-12">
               {{ authStore?.loginUserInfo?.presentAddress[authStore?.loginUserInfo?.presentAddress.length -1].bn }}
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-lg-4 col-sm-12 col-12">
              <span class="text-bold">permanentAddress:</span>
            </div>
            <div class="col-lg-4 col-sm-12 col-12">
               {{ authStore?.loginUserInfo?.permanentAddress[authStore?.loginUserInfo?.permanentAddress.length -1].bn }}
            </div>
          </div>
        </q-card>

      </div>
      <!-- <div>
        {{ loginUser?.email }}
        {{ authStore?.loginUserInfo }}
      </div> -->
    </div>
  </div>

</template>
<script setup>
import { useAuthStore, loginUser } from "src/stores/auth/authStore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const authStore = useAuthStore()
const router = useRouter()
onMounted(()=>{
  if(!authStore.checkLogin()){
    router.push('/login')
  }
})
</script>
<style>

</style>
