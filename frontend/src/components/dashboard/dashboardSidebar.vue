<template>
  <q-list bordered separator>
    <q-item
      clickable
      v-ripple
      v-if="
        ['superAdmin', 'admin'].includes(authStore?.loginUserInfo?.permission)
      "
      to="/dashboard"
    >
      <q-item-section avatar>
        <q-icon name="insert_chart" />
      </q-item-section>
      <q-item-section>{{ $t("headermenus.data_analisis") }}</q-item-section>
      <q-separator />
    </q-item>
    <q-item
      clickable
      v-ripple
      v-if="
        ['superAdmin', 'admin'].includes(authStore?.loginUserInfo?.permission)
      "
      to="/payment_and_service_configuration"
    >
      <q-item-section avatar>
        <q-icon name="payment" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("headermenus.service_and_payment_configuration") }}</q-item-label>
      </q-item-section>
      <q-separator />
    </q-item>
    <q-item
      clickable
      v-ripple
      v-if="authStore?.loginUserInfo?.permission == 'superAdmin'"
      to="/locations"
    >
      <q-item-section avatar>
        <q-icon name="location_on" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("headermenus.locations") }}</q-item-label>
      </q-item-section>
      <q-separator />
    </q-item>
    <q-item
      clickable
      v-ripple
      v-if="authStore?.loginUserInfo && authStore?.loginUserInfo?.permission"
      to="/users"
    >
      <q-item-section avatar>
        <q-icon name="person" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("headermenus.users") }}</q-item-label>
      </q-item-section>
      <q-separator />
    </q-item>
    <q-item
      clickable
      v-ripple
      v-if="authStore?.loginUserInfo?.permission == 'superAdmin'"
      to="/services"
    >
      <q-item-section avatar>
        <q-icon name="info" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("headermenus.services") }}</q-item-label>
      </q-item-section>
      <q-separator />
    </q-item>
    <q-item
      clickable
      v-ripple
      v-if="authStore?.loginUserInfo?.permission == 'superAdmin'"
      to="/banners_create_update"
    >
      <q-item-section avatar>
        <q-icon name="ad_units" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("headermenus.banners") }}</q-item-label>
      </q-item-section>
      <q-separator />
    </q-item>
    <!-- <q-item
      clickable
      v-ripple
      v-if="authStore?.loginUserInfo?.permission == 'superAdmin'"
      to="/dashboard"
    >
      <q-item-section avatar>
        <q-icon name="dashboard" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("dashboard") }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator /> -->
    <q-item
      clickable
      v-ripple
      v-if="authStore?.loginUserInfo?.permission == 'superAdmin'"
      to="/moving_text"
    >
      <q-item-section avatar>
        <q-icon name="T" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("movingtext") }}</q-item-label>
      </q-item-section>
      <q-separator />
    </q-item>
    <q-item
      clickable
      v-ripple
      v-if="
        ['superAdmin', 'admin'].includes(authStore?.loginUserInfo?.permission)
      "
      to="/service_provider_pending_list"
    >
      <q-item-section avatar>
        <q-icon name="pending_actions" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("headermenus.pending_list") }}</q-item-label>
      </q-item-section>
      <q-separator />
    </q-item>
    <q-item
      clickable
      v-ripple
      v-if="
        ['superAdmin', 'admin'].includes(authStore?.loginUserInfo?.permission)
      "
      to="/pending_payments"
    >
      <q-item-section avatar>
        <q-icon name="payments" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("headermenus.pending_payments") }}</q-item-label>
      </q-item-section>
      <q-separator />
    </q-item>
    <q-item
      clickable
      v-ripple
      v-if="
        ['superAdmin', 'admin'].includes(authStore?.loginUserInfo?.permission)
      "
      to="/pending_nid_verification"
    >
      <q-item-section avatar>
        <q-icon name="payments" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("headermenus.pending_nid_verification") }}</q-item-label>
      </q-item-section>
      <q-separator />
    </q-item>
    <q-item
      clickable
      v-ripple
      v-if="
        ['superAdmin', 'admin'].includes(authStore?.loginUserInfo?.permission)
      "
      to="/notification_list"
    >
      <q-item-section avatar>
        <q-icon name="notifications" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("notification.list") }}</q-item-label>
      </q-item-section>
      <q-separator />
    </q-item>
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
