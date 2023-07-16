<template>
  <q-toolbar class="q-py-none q-px-md">
    <q-item>
      <q-item-section side>
        <div class="fs-24 text-bold cursor-pointer proyojon24-text" @click="$router.push('/home')">Proyojon24</div>
      </q-item-section>
    </q-item>

    <q-space />
    <div
      v-if="$q.screen.gt.sm"
      class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap cursor-pointer"
    >
      <router-link to="/home" exact-active-class="text-primary">{{
        $t("headermenus.home")
      }}</router-link>
      <router-link to="/how_it_works" exact-active-class="text-primary">{{
        $t("headermenus.how_it_works")
      }}</router-link>
      <router-link to="/profile" exact-active-class="text-primary">{{
        $t("headermenus.service_profile")
      }}</router-link>
      <router-link to="/register" exact-active-class="text-primary" v-if="!authStore.loginUserInfo">
        <q-icon class="fs-18 q-mb-xs" name="person_add"/>
        {{
        $t("headermenus.register")
      }}</router-link>
      <router-link to="/login" exact-active-class="text-primary" v-if="!authStore.loginUserInfo">
        <q-icon class="fs-18 q-mb-xs" name="person"/>
        {{
        $t("headermenus.login")
      }}</router-link>
      <!-- <router-link
        v-if="authStore?.loginUserInfo && authStore?.loginUserInfo?.permission"
        to="/users"
        active-class="text-white"
        >{{ $t("headermenus.users") }}</router-link
      > -->
      <router-link
        v-if="authStore?.loginUserInfo?.permission == 'superAdmin'"
        to="/dashboard"
        exact-active-class="text-primary"
        @click="menuControllerStore.leftDashboardOpen = true"
        >{{ $t("dashboard") }}</router-link
      >
    </div>

    <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
      <q-btn v-if="authStore.loginUserInfo" dense flat no-wrap>
        <q-avatar rounded size="20px">
          <img src="/images/user-placeholder.jpg" />
        </q-avatar>
        <q-icon name="arrow_drop_down" size="16px" />
        <q-menu auto-close>
          <q-list dense style="min-width: 140px">
            <q-item class="GL__menu-link-signed-in">
              <q-item-section>
                <div>
                  <strong>{{ loginUser?.name.bn }}</strong>
                </div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable class="GL__menu-link-status">
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
              class="GL__menu-link"
              @click="router.push('/profile')"
            >
              <q-item-section>{{ $t("usermenus.profile") }}</q-item-section>
            </q-item>
            <q-item
              clickable
              class="GL__menu-link"
              @click="router.push('/service_provider_profile')"
            >
              <q-item-section>{{
                $t("headermenus.service_profile")
              }}</q-item-section>
            </q-item>
            <q-item
              clickable
              class="GL__menu-link"
              @click="router.push('/help')"
            >
              <q-item-section>{{ $t("usermenus.help") }}</q-item-section>
            </q-item>
            <q-item
              clickable
              class="GL__menu-link"
              @click="router.push('/premium_account_and_transactions')"
            >
              <q-item-section>{{ $t("usermenus.premium") }}</q-item-section>
            </q-item>
            <q-item
              clickable
              class="GL__menu-link"
              @click="router.push('/settings')"
            >
              <q-item-section>{{ $t("usermenus.settings") }}</q-item-section>
            </q-item>
            <q-item clickable class="GL__menu-link" @click="logoutFunc">
              <q-item-section>{{ $t("usermenus.signout") }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn label="বাংলা" size="md" color="grey-8" @click="languageStore.switchToBn" v-if="languageStore.language == 'en'" />
      <q-btn label="English" size="md" color="grey-8" @click="languageStore.switchToEn" v-else />
    </div>
    <publicMobileMenus />
  </q-toolbar>
</template>

<script setup>
import { header_menus } from "src/global_constant/header_menus";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useMenuControllerStore } from "src/stores/menucontroller/menuControllerStore";
import publicMobileMenus from "./mobileView/publicMobileMenus.vue";
import { useLocalStorage } from "@vueuse/core";
import { isObjEmpty } from "src/global_js/utils";
// seperator

import { useAuthStore } from "src/stores/auth/authStore";

import { useNotificationStore } from "src/stores/notifications/notificationStore.js";
import { socket, state } from "src/socket/socket";

import { usePublicDashboardStore } from "src/stores/user/dashboardStore";

const dashboardStore = usePublicDashboardStore();
// get dashboard data
dashboardStore.getDashboardData();
const notificationStore = useNotificationStore();
notificationStore.getPublishedNotification();
socket.on("push_new_notification", (l) => {
  console.log("new notificaiton came", l);
  notificationStore.getPublishedNotification();
});

const menuControllerStore = useMenuControllerStore();
const languageStore = useLanguageStore();
const authStore = useAuthStore();
const router = useRouter();
const logoutFunc = () => {
  authStore.logoutFunc();
};

const loginUser = useLocalStorage("proyojonloginuser", {});

const profileClickManager = () => {
  if (isObjEmpty(loginUser.value)) {
    console.log(true);
    router.push("/login");
  } else {
    router.push("/profile");
  }
};
</script>

<style lang="sass">
.proyojon24-text
  background-clip: text !important
  -webkit-background-clip: text !important
  -moz-background-clip: text !important
  color: transparent
  background: rgb(255,0,46)
  background: linear-gradient(0deg, rgba(255,197,41,1) 0%, rgba(166,87,0,1) 100%)
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden
    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible
  &__toolbar-link
    a
      color: $accent
      text-decoration: none
      &:hover
        opacity: 0.7
  &__menu-link:hover
    background: #0366d6
    color: white
  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important
  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9
  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
.dashboard-data
  width: 12px
</style>
