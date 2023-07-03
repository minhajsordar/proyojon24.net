<template>
  <q-list bordered separator>
    <q-item clickable v-ripple to="/dashboard">
      <q-item-section>Data Analysis</q-item-section>
    </q-item>

    <q-item clickable v-ripple  to="/payment_and_service_configuration">
      <q-item-section>
        <q-item-label>Configure Service & Payment</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator/>
            <router-link
              v-if="authStore?.loginUserInfo?.permission == 'superAdmin'"
              to="/locations"
              active-class="text-white  link-bg-color"
              @click="menuControllerStore.headerMenuMobileScreenClose"
            >
            <q-item class="flex items-center">
                <div><q-icon name="location_on" /></div>
                <div class="q-ml-md">{{ $t("headermenus.locations") }}</div>
              </q-item>
            </router-link>
            <q-separator/>
            <router-link
              v-if="authStore?.loginUserInfo && authStore?.loginUserInfo?.permission"
              to="/users"
              active-class="text-white  link-bg-color"
              @click="menuControllerStore.headerMenuMobileScreenClose"
            >
            <q-item class="flex items-center">
                <div><q-icon name="person" /></div>
                <div class="q-ml-md">{{ $t("headermenus.users") }}</div>
              </q-item>
            </router-link>
            <q-separator/>
            <router-link
              v-if="authStore?.loginUserInfo?.permission == 'superAdmin'"
              to="/services"
              active-class="text-white  link-bg-color"
              @click="menuControllerStore.headerMenuMobileScreenClose"
            >
            <q-item class="flex items-center">
                <div><q-icon name="info" /></div>
                <div class="q-ml-md">{{ $t("headermenus.services") }}</div>
              </q-item>
            </router-link>
            <q-separator/>
            <router-link
              v-if="authStore?.loginUserInfo?.permission == 'superAdmin'"
              to="/banners_create_update"
              active-class="text-white  link-bg-color"
              @click="menuControllerStore.headerMenuMobileScreenClose"
            >
            <q-item class="flex items-center">
                <div><q-icon name="ad_units" /></div>
                <div class="q-ml-md">{{ $t("headermenus.banners") }}</div>
              </q-item>
            </router-link>
            <q-separator/>
            <router-link
              v-if="authStore?.loginUserInfo?.permission == 'superAdmin'"
              to="/dashboard"
              active-class="text-white  link-bg-color"
              @click="menuControllerStore.headerMenuMobileScreenClose"
            >
            <q-item class="flex items-center">
                <div><q-icon name="dashboard" /></div>
                <div class="q-ml-md">{{ $t("dashboard") }}</div>
              </q-item>
            </router-link>
            <q-separator/>
            <router-link
              v-if="authStore?.loginUserInfo?.permission == 'superAdmin'"
              to="/moving_text"
              active-class="text-white  link-bg-color"
              @click="menuControllerStore.headerMenuMobileScreenClose"
            >
            <q-item class="flex items-center">
                <div><q-icon name="T" /></div>
                <div class="q-ml-md">{{ $t("movingtext") }}</div>
              </q-item>
            </router-link>
            <q-separator/>
            <router-link
              v-if="['superAdmin','admin'].includes(authStore?.loginUserInfo?.permission) || authStore?.loginUserInfo?.permission !== 'self'"
              to="/service_provider_pending_list"
              active-class="text-white  link-bg-color"
              @click="menuControllerStore.headerMenuMobileScreenClose"
            >
            <q-item class="flex items-center">
                <div><q-icon name="pending_actions" /></div>
                <div class="q-ml-md">{{ $t("headermenus.pending_list") }}</div>
              </q-item>
            </router-link>
            <q-separator/>
            <router-link
              v-if="['superAdmin','admin'].includes(authStore?.loginUserInfo?.permission)"
              to="/notification_list"
              active-class="text-white  link-bg-color"
              @click="menuControllerStore.headerMenuMobileScreenClose"
            >
            <q-item class="flex items-center">
                <div><q-icon name="notifications" /></div>
                <div class="q-ml-md">{{ $t("notification.list") }}</div>
              </q-item>
            </router-link>
            <q-separator/>
  </q-list>
</template>
<script setup>
import { useLocalStorage } from "@vueuse/core";
import { useAuthStore } from "src/stores/auth/authStore";
import { useMenuControllerStore } from "src/stores/menucontroller/menuControllerStore";
const menuControllerStore = useMenuControllerStore();
const authStore = useAuthStore();
</script>
<style></style>
