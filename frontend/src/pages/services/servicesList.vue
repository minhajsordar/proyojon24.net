<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
    <q-card class="border-primary q-pa-md">
      <div>
        <div class="flex justify-between">
        <div class="fs-18">{{ $t('headermenus.services') }}</div>
      <q-btn
        class="btn-h-22"
        color="positive"
        :label="$t('addnew')"
        icon="add"
        dense
        size="sm"
        @click="serviceStore.openServiceCreateDialogManager"
      />
    </div>
    <q-separator class="q-my-sm" />
        <q-markup-table flat bordered dense separator="cell" class="text-left ">
        <thead class="bg-blue-3">
          <tr>
            <th>{{ $t('serial') }}</th>
            <th>{{ $t('name') }}</th>
            <th>{{ $t('action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(service, index) in serviceList.services" :key="index" :class="{'bg-blue-1':index%2 !=0 }">
            <td>{{ enToBnToEn(String(index),languageStore.language) }}</td>
            <td>{{ service.name[languageStore.language] }}</td>
            <td>
              <q-btn :label="$t('preview')" size="sm" dense color="primary"
                @click="serviceStore.openServicePreviewDialogManager(service)"
                />
              <q-btn
                class="q-ml-xs" :label="$t('edit')" size="sm" dense color="positive"
                @click="serviceStore.openServiceEditDialogManager(service)"
                />
              <q-btn
                class="q-ml-xs"
                :label="$t('delete')"
                size="sm"
                dense
                color="negative"
                @click="confirm(service)"
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
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useServiceStore } from "src/stores/service/serviceStore";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "src/stores/auth/authStore";
import { onMounted } from "vue";
import {enToBnToEn} from 'src/global_js/utils'
const authStore = useAuthStore();
const $q = useQuasar();
const { t } = useI18n();
const serviceStore = useServiceStore();
const { serviceList } = storeToRefs(serviceStore);
const languageStore = useLanguageStore();
serviceStore.getServiceList()
const confirm = (service) => {
  serviceStore.serviceInfo.id = service._id
  $q.dialog({
    title: t("confirm"),
    message: t("confirm_delete_start") + service.name[languageStore.language] + t("confirm_delete_end"),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    serviceStore.deleteService()
  });
};
onMounted(() => {
  authStore.checkLogin();
});
</script>
<style>
</style>
