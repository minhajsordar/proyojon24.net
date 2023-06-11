<template>
  <div class="container-section-py-xs">
    <div class="notification-page-width">
      <div class="full-width">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            Last 7 days
            <q-separator/>
          </div>
          <div class="col-12" v-for="(notification,index) in notificationStore?.last7DaysNotification" :key="index">
            <commonNotificationCard
            :notification="notification"
            />
          </div>
          <div class="col-12">
            Previous
            <q-separator/>
          </div>
          <div class="col-12" v-for="(notification,index) in notificationStore?.publishedNotification" :key="index">
            <commonNotificationCard
              :notification="notification"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import commonNotificationCard from "src/components/cards/commonNotificationCard.vue";
import { useNotificationStore } from "src/stores/notifications/notificationStore.js";

const notificationStore = useNotificationStore();
</script>
<style lang="scss">
.notification-page-width {
  padding: 0px 20px;
  max-width: 40rem;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
</style>
