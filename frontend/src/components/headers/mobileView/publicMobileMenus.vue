<template>
  <q-dialog
    v-model="menuControllerStore.headerMenuMobileScreen"
    maximized
    position="left"
    full-height
  >
    <q-card class="border-primary" style="width: 350px">
      <q-card-section class="row items-center bg-accent-public text-white">
        <div class="text-subtitle1 text-bold">
          <!-- <q-img style="width: 5.9375rem" src="~assets/logo.svg" /> -->
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="close"
          push
          round
          dense
          size="sm"
          class="text-primary-public bg-white"
        />
      </q-card-section>

      <q-card-section
        v-if="!authStore?.loginUserInfo"
        class="q-px-none"
        style="height: calc(100vh - 88px); overflow-y: auto"
      >
        <div class="bg-primary">
          <q-list class="rounded-borders">
            <router-link to="/login" active-class="text-white link-bg-color">
              <q-item class="flex items-center">
                <div><q-icon name="login" /></div>
                <div class="q-ml-md">Login</div>
              </q-item>
            </router-link>
            <q-separator />
            <router-link to="/register" active-class="text-white link-bg-color">
              <q-item class="flex items-center">
                <div><q-icon name="app_registration" /></div>
                <div class="q-ml-md">Create Account</div>
              </q-item>
            </router-link>
            <q-separator />
          </q-list>
        </div>
      </q-card-section>
      <q-card-section
        class="q-px-none"
        v-else
        style="height: calc(100vh - 88px); overflow-y: auto"
      >
        <div class="bg-white">
          <q-list class="rounded-borders">
            <q-separator/>
            <router-link
              v-if="authStore?.loginUserInfo?.isSuperAdmin"
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
              v-if="authStore?.loginUserInfo?.isSuperAdmin"
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
              v-if="authStore?.loginUserInfo?.isAdmin"
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
              v-if="authStore?.loginUserInfo?.isAdmin || authStore?.loginUserInfo?.permission !== 'self'"
              to="/service_provider_pending_list"
              active-class="text-white  link-bg-color"
              @click="menuControllerStore.headerMenuMobileScreenClose"
            >
            <q-item class="flex items-center">
                <div><q-icon name="pending_actions" /></div>
                <div class="q-ml-md">{{ $t("headermenus.pending_list") }}</div>
              </q-item>
            </router-link>
            <router-link
              v-if="authStore?.loginUserInfo?.isSuperAdmin"
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
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useLocalStorage } from "@vueuse/core";
import { useAuthStore } from "src/stores/auth/authStore";
import { useMenuControllerStore } from "src/stores/menucontroller/menuControllerStore";
const menuControllerStore = useMenuControllerStore();
const authStore = useAuthStore();
</script>
<style lang="scss">
.link-bg-color .q-item {
  background: $primary-public !important;
}
</style>
