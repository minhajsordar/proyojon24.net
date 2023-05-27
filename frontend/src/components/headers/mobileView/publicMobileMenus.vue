<template>
  <q-dialog
    v-model="menuControllerStore.headerMenuMobileScreen"
    maximized
    position="left"
    full-height
  >
    <q-card class="border-primary" style="width: 350px">
      <q-card-section class="row items-center bg-blue-grey-10 text-white">
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
          class="text-blue-grey-10 bg-white"
        />
      </q-card-section>

      <q-card-section style="height: calc(100vh - 88px); overflow-y: auto">
        <div class="bg-yellow-1">
          <q-list class="rounded-borders">
            <router-link to="/allservices" active-class="text-white link-bg-color">
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
  background: #263238 !important;
}
</style>
