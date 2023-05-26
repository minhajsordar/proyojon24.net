<template>
  <q-dialog
    v-model="menuControllerStore.headerMenuMobileScreen"
    maximized
    position="left"
    full-height
  >
    <q-card class="border-primary" style="width: 350px">
      <q-card-section class="row items-center bg-primary text-white">
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
          class="text-primary bg-white"
        />
      </q-card-section>

      <q-card-section style="height: calc(100vh - 88px); overflow-y: auto">
        <div class="bg-blue-grey-2">
          <q-list class="rounded-borders">
            <router-link to="/locations" active-class="text-white link-bg-color">
              <q-item>
                {{ $t("headermenus.locations") }}
              </q-item>
            </router-link>
            <router-link to="/users" active-class="text-white link-bg-color">
              <q-item>
                {{ $t("headermenus.users") }}
              </q-item>
            </router-link>
            <router-link to="/services" active-class="text-white link-bg-color">
              <q-item>
                {{ $t("headermenus.services") }}
              </q-item>
            </router-link>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useMenuControllerStore } from "src/stores/menucontroller/menuControllerStore";
const menuControllerStore = useMenuControllerStore();
</script>
<style>
.link-bg-color .q-item{
  background: #009ef7 !important;
}
</style>
