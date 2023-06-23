<template>
  <q-toolbar class="q-py-sm q-px-md">
    <q-item clickable v-ripple @click="profileClickManager">
      <q-item-section side>
        <q-avatar rounded size="40px">
          <img v-if="loginUser?.profileImage" :src="web_root_url + loginUser?.profileImage" />
          <img v-else src="/images/user-placeholder.jpg" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label v-if="loginUser?.name">{{
          loginUser?.name[languageStore.language]
        }}</q-item-label>
        <q-item-label v-else>Guest User</q-item-label>
        <q-item-label v-if="loginUser?.username" caption class="text-white">
          {{
            loginUser?.permission == "superAdmin"
              ? "Super Admin"
              : loginUser?.permission == "admin"
              ? "Admin"
              : loginUser?.permission == "self"
              ? "Service Provider"
              : loginUser?.permission
              ? "Admin " + loginUser.permission
              : "Guest"
          }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-space />

    <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
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
import { web_root_url } from "src/global_constant/root_url";
const loginUser = useLocalStorage("proyojonloginuser", {});
const menuControllerStore = useMenuControllerStore();
const languageStore = useLanguageStore();
const router = useRouter();

const profileClickManager = () => {
  if (isObjEmpty(loginUser.value)) {
    console.log(true);
    router.push("/");
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
