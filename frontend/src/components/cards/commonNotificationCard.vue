<template lang="">
  <div class="relative-position">
    <div class="gradient-bg-medium"></div>
    <q-card class="full-width hover-notification-card cursor-pointer"
    >
      <q-item clickable v-ripple>
        <q-item-section side>
          <q-icon
            class="fs-32 text-center"
            name="notifications"
            color="primary"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{
            notification.title
          }}</q-item-label>

          <q-item-label caption v-if="notification?.description">
            <div
              v-html="notification.description"
            ></div>
          </q-item-label>
          <q-item-label v-if="notification?.link">
            <a :href="notification.link" target="_blank">visit now</a>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <span
            v-if="
              date.isSameDate(
                date1,
                notification.updatedAt,
                /* optional */ unit
              )
            "
          >
            <span
              v-if="
                date.getDateDiff(new Date(date1), notification.updatedAt, 'hour') == 0
              "
            >
              {{
                date.getDateDiff(date1, notification.updatedAt, "minute")
              }}
              minute ago
            </span>
            <span v-else>
              {{ date.getDateDiff(date1, notification.updatedAt, "hour") }} hour
              ago
            </span>
          </span>
          <span v-else>
            {{ date.getDateDiff(date1, notification.updatedAt, unit) }} days
            ago</span
          >
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>
<script setup>
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { date } from "quasar";
defineProps({
  notification: {
    type: Object,
    default: null,
  },
});

const date1 = new Date();
const date2 = new Date(2017, 3, 8);
const unit = "days";
const diff = date.getDateDiff(new Date(), date2, "days");
const languageStore = useLanguageStore();
</script>
<style lang="scss">
.listcard-cont {
  display: flex;
  align-items: center;
  position: relative;
}
.view-badge-top-right {
  position: absolute;
  left: 4px;
  bottom: 4px;
  z-index: 1;
}
.image-section {
  width: 48px;
}
.description-section {
  width: calc(100% - 48px);
}
.hover-notification-card:hover {
  background-color: $grey-1;
}
</style>
