<template>
  <q-layout class="background-pattern" view="hHh lpR fFf">
    <!-- !$q.screen.gt.sm -->
    <q-header
      class="text-white"
      :class="[$q.screen.gt.sm ? 'bg-accent-public' : 'bg-red-8']"
      height-hint="61.59"
    >
      <!-- <publicUserHeader v-if="Object.keys(loginUser).length == 0" /> -->
      <userProfileHeader />
    </q-header>

    <q-page-container class="q-page-cont">
      <router-view />
      <div
        v-if="$q.screen.gt.sm"
        class="q-py-sm text-center bg-primary-public text-white full-width footer-area"
      >
        <div class="fs-12">
          <span class="text-secondary-public">Proyojon24.net</span> © 2023 All
          Rights Reserved
        </div>
        <div class="fs-10">
          Developed & Powered By:
          <span class="text-secondary-public">Service Zone Ltd</span>
        </div>
        <div class="bottom-fx"></div>
      </div>
    </q-page-container>
    <publicLayoutAllDialogs />
    <profileLayoutAllDialogs />
    <q-footer
      class="bg-transparent q-py-sm flex justify-around footer-c"
      v-if="!$q.screen.gt.sm"
    >
      <div class="footer-buttons">
        <q-btn
          icon="home"
          round
          dense
          flat
          size="md"
          color="white"
          class="q-mr-sm"
          no-caps
          @click="$router.push('/home')"
        />
        <div class="fs-10 footer-button-text" style="position: absolute">
          {{ $t("bottom_menus.home") }}
        </div>
      </div>
      <div class="footer-buttons">
        <q-btn dense flat round @click="$router.push('direct_message')">
          <q-icon name="chat" size="25px" />
        </q-btn>
        <div
          class="fs-10 footer-button-text-1"
          style="position: absolute; width: 150px"
        >
          {{ $t("bottom_menus.live_chat") }}
        </div>
      </div>
      <div class="relative-position" style="width: 80px">
        <q-btn
          dense
          flat
          round
          style="padding: 3px"
          class="bg-accent text-white absolute-add-serviceporvider"
          :class="[$q.screen.gt.sm ? 'bg-accent' : 'bg-green']"
          @click="
            () => {
              if (authStore?.loginUserInfo) {
                $router.push('/service_provider_profile');
              } else {
                $router.push('/login');
              }
            }
          "
        >
          <div
            class="q-pa-sm"
            v-if="authStore?.loginUserInfo?.hasServiceProviderProfile == true"
          >
            <q-icon class="fs-32" name="manage_accounts" size="45px" />
          </div>
          <q-icon v-else class="rotate-icon" name="add" size="45px" />
        </q-btn>
        <div
          class="fs-10 text-center"
          style="
            position: absolute;
            left: 56%;
            top: 44%;
            width: 150px;
            transform: translate(-50%, 50%);
          "
        >
          <span
            v-if="authStore?.loginUserInfo?.hasServiceProviderProfile == true"
          >
            {{ $t("bottom_menus.service_profile") }}
          </span>
          <span v-else>
            {{ $t("bottom_menus.add_provider") }}
          </span>
        </div>
      </div>
      <div class="footer-buttons">
        <q-btn
          icon="person"
          round
          dense
          flat
          size="md"
          color="white"
          class="q-mr-sm"
          no-caps
          @click="$router.push('/profile')"
        />
        <div
          class="fs-10 footer-button-text"
          style="position: absolute; width: 150px"
        >
          {{ $t("bottom_menus.profile") }}
        </div>
      </div>
      <div class="footer-buttons">
        <q-btn
          icon="menu"
          round
          dense
          flat
          size="md"
          color="white"
          class="q-mr-sm"
          no-caps
          @click="menuControllerStore.headerMenuMobileScreen = true"
        />
        <div
          class="fs-10 footer-button-text"
          style="position: absolute; width: 150px"
        >
          {{ $t("bottom_menus.menu") }}
        </div>
      </div>
      <!-- "home" "live chat" "add provider" "menu". -->
      <svg
        id="footer-bg-svg"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2209 144.45"
      >
        <path
          class="fill-path"
          d="M2209,0V144.45H0V0H1006.06c21.14.3,37.86,12.84,45.74,32.66,3.11,7.83,7.31,15.08,13.13,20.92a55.5,55.5,0,0,0,91.65-20.89h0c6.12-18.65,21-33,45.76-32.69Z"
        />
      </svg>
    </q-footer>
  </q-layout>
</template>

<script setup>
import publicUserHeader from "src/components/headers/publicUserHeader.vue";
import userProfileHeader from "src/components/headers/userProfileHeader.vue";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import publicLayoutAllDialogs from "src/components/dialogs/publicLayoutAllDialogs.vue";
import profileLayoutAllDialogs from "src/components/dialogs/profileLayoutAllDialogs.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePinlocationStore } from "src/stores/locations/pinlocationStore";
import { useSearchLocationStore } from "src/stores/service/searchLocation";
import { useMenuControllerStore } from "src/stores/menucontroller/menuControllerStore";
import { useAuthStore, loginUser } from "src/stores/auth/authStore";
import { isObjEmpty } from "src/global_js/utils";
import { useIntervalFn, useLocalStorage } from "@vueuse/core";
import { Dialog, Notify, date } from "quasar";
const sessionEndTimeStorage = useLocalStorage("session-timeout-end", {});

const languageStore = useLanguageStore();
languageStore.switchToBn();
const router = useRouter();
const menuControllerStore = useMenuControllerStore();
const authStore = useAuthStore();
const eventsList = [
  "click",
  "mousemove",
  "mousedown",
  "scroll",
  "keypress",
  "load",
];
onMounted(() => {
  if (!isObjEmpty(loginUser.value)) {
    authStore.loginUserInfo = loginUser.value;
  }
  eventsList.forEach((event) => {
    document.addEventListener(event, () => {
      if (Boolean(authStore.loginUserInfo)) {
        if (new Date(sessionEndTimeStorage.value) <= new Date()) {
          Notify.create({
            message: "We are going to logout you for 5 minutes inactivity.",
            position: "center",
          });
          authStore.logoutFunc();
        }
        sessionEndTimeStorage.value = date.addToDate(new Date(), { minute: 5 });
      }
    });
  });
});
</script>

<style lang="scss" scoped>
.footer-c {
  height: 50px;
}
#footer-bg-svg {
  position: absolute;
  height: 80px;
  top: -8px;
  z-index: -1;
  .fill-path {
    fill: $accent;
  }
}
@media screen and (max-width: 1024px) {
  #footer-bg-svg {
    .fill-path {
      fill: $green;
    }
  }
}
.absolute-add-serviceporvider {
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-42%, -98%);
}
.footer-buttons {
  position: relative;
  margin-top: -10px;
  .footer-button-text {
    position: absolute;
    left: 41%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    text-align: center;
  }
  .footer-button-text-1 {
    text-align: center;
    position: absolute;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, -0%);
  }
}
.q-page-cont {
  min-height: 100vh;
  position: relative;
  padding-bottom: 48px !important;
}
@media screen and (max-width: 1024px) {
  .q-page-cont {
    padding-bottom: 100px !important;
  }
}
.footer-area {
  position: absolute;
  bottom: 0px;
}
@media screen and (max-width: 1024px) {
  .footer-area {
    position: absolute;
    bottom: 48px;
    .bottom-fx {
      height: 48px;
      width: 100%;
      position: absolute;
      top: 100%;
      background-color: $primary;
    }
  }
}
.rotate-icon {
  transform: rotate(0deg);
  animation: rotateicon 5s ease-in-out 0s infinite forwards;
}
@keyframes rotateicon {
  0%,
  40% {
    transform: rotate(0deg);
  }
  60%,
  100% {
    transform: rotate(360deg);
  }
}
</style>
