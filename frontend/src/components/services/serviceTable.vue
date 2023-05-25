<template>
  <div>
    <div class="flex justify-between">
      <div class="fs-18">{{ $t("headermenus.services") }}</div>
      <q-btn
        class="btn-h-22"
        color="positive"
        :label="$t('addnew')"
        icon="add"
        dense
        glossy
        size="sm"
        @click="serviceStore.openServiceCreateDialogManager"
      />
    </div>
    <q-separator class="q-my-sm" />
    <q-markup-table
      flat
      bordered
      dense
      separator="cell"
      class="text-left"
    >
      <thead class="bg-blue-grey-2">
        <tr>
          <th>{{ $t("serial") }}</th>
          <th>{{ $t("name") }}</th>
          <th>{{ $t("action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(service, index) in serviceList.services"
          :key="index"
          :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
        >
          <td>
            {{ enToBnToEn(String(index), languageStore.language) }}
          </td>
          <td>{{ service.name[languageStore.language] }}</td>
          <td>
            <q-btn
              :label="$t('preview')"
              size="sm"
              dense
              glossy
              color="primary"
              @click="
                serviceStore.openServicePreviewDialogManager(service)
              "
            />
            <q-btn
              class="q-ml-xs"
              :label="$t('edit')"
              size="sm"
              dense
              glossy
              color="positive"
              @click="
                serviceStore.openServiceEditDialogManager(service)
              "
            />
            <q-btn
              class="q-ml-xs"
              :label="$t('delete')"
              size="sm"
              dense
              glossy
              color="negative"
              @click="confirm(service)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useQuasar, useMeta } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useServiceStore } from "src/stores/service/serviceStore";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "src/stores/auth/authStore";
import { onMounted } from "vue";
import { enToBnToEn } from "src/global_js/utils";
const authStore = useAuthStore();
const $q = useQuasar();
const { t } = useI18n();
const serviceStore = useServiceStore();
const { serviceList } = storeToRefs(serviceStore);
const languageStore = useLanguageStore();
serviceStore.getServiceList();
const confirm = (service) => {
  serviceStore.serviceInfo.id = service._id;
  $q.dialog({
    title: t("confirm"),
    message:
      t("confirm_delete_start") +
      service.name[languageStore.language] +
      t("confirm_delete_end"),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    serviceStore.deleteService();
  });
};
onMounted(() => {
  authStore.checkLogin();
});
const metaData = {
  // sets document title
  title: "Services List",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - Proyojon24.net`,

  // meta tags
  meta: {
    description: { name: "description", content: "Page 1" },
    keywords: {
      name: "keywords",
      content: "proyojon24 services service-provider",
    },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle} - Proyojon24.net`;
      },
    },
  },
};

useMeta(metaData);
</script>
<style>
</style>
