<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <q-card class="border-primary q-pa-md">
          <div>
            <div class="flex justify-between">
              <div class="fs-18">{{ $t("headermenus.pending_list") }}</div>
              <q-btn
                class="btn-h-22"
                color="positive"
                :label="$t('addnew')"
                icon="add"
                dense
                glossy
                size="sm"
                @click="notificationStore.openCreateNotificationManager"
              />
            </div>
            <q-separator class="q-my-sm" />
            <q-markup-table flat bordered separator="cell" class="text-left">
              <thead class="bg-blue-grey-2">
                <tr>
                  <th>{{ $t("serial") }}</th>
                  <th>{{ $t("notification.list") }}</th>
                  <th>{{ $t("status") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(notification, index) in notificationStore
                    .notificationList?.notifications"
                  :key="index"
                  :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
                >
                  <td>
                    {{ enToBnToEn(String(index + 1), languageStore.language) }}
                  </td>
                  <td>
                    {{ notification.title }}
                    <q-separator/>
                    <div
                      v-html="notification.description"
                    ></div>
                    <div v-if="notification.link">
                      <q-separator/>
                      <a :href="notification.link" target="_blank">{{ notification.link }}</a></div>
                  </td>

                  <td>
                    <q-badge :color="notification.published ? 'primary':'grey-8'">
                      {{ notification.published ? "Published":"Not Published Yet" }}
                    </q-badge>
                  </td>
                  <td>
                    <q-btn
                      class="q-ml-xs"
                      :label="$t('edit')"
                      size="sm"
                      dense
                      color="positive"
                      @click="notificationStore.openEditNotificationManager(notification)"
                    />
                    <q-btn
                      class="q-ml-xs"
                      :label="$t('delete')"
                      size="sm"
                      dense
                      color="negative"
                      @click="confirm(notification._id)"
                    />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useNotificationStore } from "src/stores/notifications/notificationStore.js";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { enToBnToEn } from "src/global_js/utils";
import { useQuasar, useMeta } from "quasar";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const $q = useQuasar();
const languageStore = useLanguageStore();
const notificationStore = useNotificationStore();
notificationStore.getNotificationList();

const confirm = (id) => {
  notificationStore.notificationInfo.id = id;
  $q.dialog({
    title: t("confirm"),
    message: "Are you sure? You want to delete this notification.",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    notificationStore.deleteNotification();
    console.log(">>>> OK");
  });
};
</script>
