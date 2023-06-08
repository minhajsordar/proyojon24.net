<template>

<q-card class="q-pa-md border-primary">
          <div class="flex justify-between q-mb-md">
            <div class="fs-20 text-bold">Profile Details</div>
            <q-btn
        :label="$t('edit')" color="primary" @click="$router.push('/settings')"/>
          </div>
          <div class="full-width">
            <q-separator/>
          </div>
          <div class="row q-mb-md q-mt-md">
            <div class="col-lg-4 col-sm-12 col-12">
              <span class="text-bold">Name:</span>
            </div>
            <div class="col-lg-4 col-sm-12 col-12">
               {{ authStore?.loginUserInfo?.name[languageStore.language] }}
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
               {{ authStore?.loginUserInfo?.phone }}
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-lg-4 col-sm-12 col-12">
              <span class="text-bold">Nid No:</span>
            </div>
            <div class="col-lg-4 col-sm-12 col-12">
               {{ authStore?.loginUserInfo?.nidNo }}
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-lg-4 col-sm-12 col-12">
              <span class="text-bold">presentAddress:</span>
            </div>
            <div class="col-lg-4 col-sm-12 col-12">
               {{ authStore?.loginUserInfo?.presentAddress[languageStore.language] }}
            </div>
          </div>
          <div class="row ">
            <div class="col-lg-4 col-sm-12 col-12">
              <span class="text-bold">permanentAddress:</span>
            </div>
            <div class="col-lg-4 col-sm-12 col-12">
               {{ authStore?.loginUserInfo?.permanentAddress[languageStore.language] }}
            </div>
          </div>
        </q-card>
</template>
<script setup>
import { useAuthStore, loginUser } from "src/stores/auth/authStore";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
const languageStore = useLanguageStore()
const authStore = useAuthStore()
</script>
