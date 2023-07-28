<template>
  <q-dialog
    v-model="menuControllerStore.userMobileMenusRightOpen"
    maximized
    position="right"
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
          round
          dense
          size="sm"
          class="text-primary-public bg-white"
        />
      </q-card-section>

      <q-card-section
        v-if="authStore?.loginUserInfo"
        class="q-px-none"
        style="height: calc(100vh - 88px); overflow-y: auto"
      >
        <div class="">
          <q-list bordered separator>
            <q-item class="">
              <q-item-section>
                <div>
                  <strong>{{ authStore.loginUserInfo?.name.bn }}</strong>
                </div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable class="">
              <q-item-section>
                <div>
                  <q-icon name="account_circle" color="blue-9" size="18px" />
                  {{
                    authStore.loginUserInfo?.permission == "superAdmin"
                      ? "Super Admin"
                      : authStore.loginUserInfo?.permission == "admin"
                      ? "Admin"
                      : authStore.loginUserInfo?.permission == "self"
                      ? "Service Provider"
                      : authStore.loginUserInfo?.permission
                      ? "Admin " + authStore.loginUserInfo.permission
                      : ""
                  }}
                </div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              class=""
              @click="$router.push('/profile')"
            >
              <q-item-section>{{ $t("usermenus.profile") }}</q-item-section>
            </q-item>
            <q-item
              clickable
              class=""
              @click="$router.push('/service_provider_profile')"
            >
              <q-item-section>{{
                $t("headermenus.service_profile")
              }}</q-item-section>
            </q-item>
            <q-item
              clickable
              class=""
              @click="$router.push('/help')"
            >
              <q-item-section>{{ $t("usermenus.help") }}</q-item-section>
            </q-item>
            <q-item
              clickable
              class="GL__menu-link"
              @click="$router.push('/my_earnings')"
            >
              <q-item-section>{{ $t("usermenus.my_earnings") }}</q-item-section>
            </q-item>
            <q-item
              clickable
              class=""
              @click="$router.push('/premium_account_and_transactions')"
            >
              <q-item-section>{{ $t("usermenus.premium") }}</q-item-section>
            </q-item>
            <q-item
              clickable
              class=""
              @click="$router.push('/settings')"
            >
              <q-item-section>{{ $t("usermenus.settings") }}</q-item-section>
            </q-item>
            <q-item clickable class="" @click="logoutFunc">
              <q-item-section>{{ $t("usermenus.signout") }}</q-item-section>
            </q-item>
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
            <q-separator />
            <router-link
              v-if="
                authStore?.loginUserInfo && authStore?.loginUserInfo?.permission
              "
              to="/users"
              active-class="text-white  link-bg-color"
              @click="menuControllerStore.userMobileMenusRightOpenClose"
            >
              <q-item class="flex items-center">
                <div><q-icon name="person" /></div>
                <div class="q-ml-md">{{ $t("headermenus.users") }}</div>
              </q-item>
            </router-link>
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
const logoutFunc = () => {
  authStore.logoutFunc();
};
</script>
<style lang="scss">
.link-bg-color .q-item {
  background: $primary-public !important;
}
</style>
