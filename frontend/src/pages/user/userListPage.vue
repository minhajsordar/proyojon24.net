<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
    <q-card class="border-primary q-pa-md">
      <div>
      <div class="fs-18">{{ $t('headermenus.users') }}</div>
      <q-separator class="q-my-sm"/>
        <q-markup-table flat bordered dense separator="cell" class="text-left ">
        <thead class="bg-blue-3">
          <tr>
            <th>{{ $t('serial') }}</th>
            <th>{{ $t('name') }}</th>
            <th>{{ $t('action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userList" :key="index" :class="{'bg-blue-1':index%2 !=0 }">
            <td>{{ enToBnToEn(String(index),languageStore.language) }}</td>
            <td>{{ user.name[languageStore.language] }}</td>
            <td>
              <q-btn :label="$t('edit')" size="sm" dense color="positive" />
              <q-btn
                class="q-ml-xs"
                :label="$t('delete')"
                size="sm"
                dense
                color="negative"
                @click="confirm(user.name[languageStore.language])"
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
import { useUserStore } from "src/stores/user/userStore";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "src/stores/auth/authStore";
import { onMounted } from "vue";
import {enToBnToEn} from 'src/global_js/utils'
const authStore = useAuthStore();
const $q = useQuasar();
const { t } = useI18n();
const userStore = useUserStore();
const { userList } = storeToRefs(userStore);
const languageStore = useLanguageStore();

const confirm = (data) => {
  $q.dialog({
    title: t("confirm"),
    message: t("confirm_delete_start") + data + t("confirm_delete_end"),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    console.log(">>>> OK");
  });
};
onMounted(() => {
  authStore.checkLogin();
});
</script>
<style>
</style>
