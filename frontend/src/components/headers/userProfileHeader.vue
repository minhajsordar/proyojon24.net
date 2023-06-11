<template>
  <!-- <q-btn
    v-if="!$q.screen.gt.sm"
    icon="menu"
    round
    dense
    glossy
    flat
    size="md"
    color="white"
    class="q-mr-sm"
    no-caps
    @click="menuControllerStore.headerMenuMobileScreen = true"
  /> -->
  <profileMobileMenus />
  <q-toolbar class="q-py-sm q-px-md">
    <q-item clickable v-ripple @click="profileClickManager">
      <q-item-section side>
        <q-avatar rounded size="40px">
          <img v-if="authStore?.loginUserInfo?.profileImage" :src="authStore?.loginUserInfo?.profileImage" />
          <img v-else src="/images/user-placeholder.jpg" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label v-if="authStore?.loginUserInfo?.name">{{
          authStore?.loginUserInfo?.name[languageStore.language]
        }}</q-item-label>
        <q-item-label v-else>Guest User</q-item-label>
        <q-item-label v-if="authStore?.loginUserInfo?.username" caption class="text-white">
          {{
            authStore?.loginUserInfo?.isSuperAdmin
              ? "Super Admin"
              : authStore?.loginUserInfo?.isAdmin
              ? "Admin"
              : authStore?.loginUserInfo?.permission == "self"
              ? "Service Provider"
              : authStore?.loginUserInfo?.permission
              ? "Admin " + authStore?.loginUserInfo.permission
              : "Guest"
          }}
        </q-item-label>
        <q-item-label v-else caption class="text-white">
          Login/Register
</q-item-label>
      </q-item-section>
    </q-item>
    <div
      v-if="$q.screen.gt.sm"
      class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap cursor-pointer"
    >
      <router-link
        to="/"
        exact-active-class="text-white"
        >{{ $t("headermenus.home") }}</router-link
      >
      <router-link
        v-if="authStore?.loginUserInfo?.isSuperAdmin"
        to="/locations"
        active-class="text-white"
        >{{ $t("headermenus.locations") }}</router-link
      >
      <router-link
        v-if="authStore?.loginUserInfo?.isSuperAdmin"
        to="/users"
        active-class="text-white"
        >{{ $t("headermenus.users") }}</router-link
      >
      <router-link
        v-if="authStore?.loginUserInfo?.isAdmin"
        to="/services"
        active-class="text-white"
        >{{ $t("headermenus.services") }}</router-link
      >
      <router-link
        v-if="
          authStore?.loginUserInfo && (authStore?.loginUserInfo?.isAdmin ||
          authStore?.loginUserInfo?.permission !== 'self')
        "
        to="/service_provider_pending_list"
        active-class="text-white"
        >{{ $t("headermenus.pending_list") }}</router-link
      >
      <router-link
        v-if="authStore?.loginUserInfo?.isSuperAdmin"
        to="/notification_list"
        active-class="text-white"
        >{{ $t("notifications") }}</router-link
      >
    </div>
    <q-space />

    <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
      <q-btn dense flat >
        <q-icon name="notifications" size="25px" />
          <q-badge :label="notificationStore?.last7DaysNotification?.length" class="absolute-top-right fs-10" color="red"/>
      </q-btn>
      <q-btn dense flat>
        <div class="row items-center no-wrap">
          <q-icon name="language" size="20px" />
          {{ $t("language") }}
          <q-icon
            name="arrow_drop_down"
            size="16px"
            style="margin-left: -2px"
          />
        </div>
        <q-menu auto-close>
          <q-list dense style="min-width: 140px">
            <q-item
              clickable
              class="GL__menu-link"
              @click="languageStore.switchToBn"
            >
              <q-item-section>বাংলা</q-item-section>
            </q-item>
            <q-item
              clickable
              class="GL__menu-link"
              @click="languageStore.switchToEn"
            >
              <q-item-section>English</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn v-if="authStore.loginUserInfo" dense flat no-wrap>
        <q-avatar rounded size="30px">
          <!-- <img src="images/user-placeholder.jpg" /> -->
          <q-icon name="settings_input_component" size="20px" />
        </q-avatar>
        <q-icon name="arrow_drop_down" size="16px" />
        <!-- <q-icon name="person" size="26px" /> -->

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
                    authStore.loginUserInfo?.isSuperAdmin
                      ? "Super Admin"
                      : authStore.loginUserInfo?.isAdmin
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
    </div>
    <publicMobileMenus />
  </q-toolbar>
</template>

<script setup>

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useMenuControllerStore } from "src/stores/menucontroller/menuControllerStore";
import publicMobileMenus from "./mobileView/publicMobileMenus.vue";
import { useLocalStorage } from "@vueuse/core";
import { isObjEmpty } from "src/global_js/utils";
// seperator

import { useAuthStore } from "src/stores/auth/authStore";
import profileMobileMenus from "./mobileView/profileMobileMenus.vue";

import { useNotificationStore } from "src/stores/notifications/notificationStore.js";

const notificationStore = useNotificationStore();
notificationStore.getPublishedNotification();


const menuControllerStore = useMenuControllerStore();
const languageStore = useLanguageStore();
const authStore = useAuthStore();
const router = useRouter();
const logoutFunc = () => {
  authStore.logoutFunc();
  router.push("/");
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
      color: rgb(209, 233, 255)
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
</style>
