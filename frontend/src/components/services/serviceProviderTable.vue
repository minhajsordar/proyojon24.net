<template>
  <div>
    <div class="flex justify-between">
      <div class="fs-18">{{ $t("services.service_category") }}</div>
      <q-btn
        class="btn-h-22"
        color="positive"
        :label="$t('addnew')"
        icon="add"
        dense
        size="sm"
        @click="serviceProviderStore.openServiceProviderCreateDialog = true"
      />
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-lg-4 col-sm-4 col-xs-12 col-12">
        <div>সার্ভিস দ্বারা বাছুন</div>
        <q-select
          v-model="serviceProviderStore.filteredByServiseId"
          :options="serviceStore.serviceList.services"
          :option-label="
            (opt) =>
              Object(opt) === opt && 'name' in opt
                ? opt.name[languageStore.language]
                : null
          "
          options-dense
          outlined
          dense
          @update:model-value="searchServiceStore.updateServiceCategoryOnServiceProviderTable"
        />
      </div>
      <div class="col-sm-8 col-xs-12 col-12">
        <div>সার্ভিস ক‍্যটাগরি দ্বারা বাছুন</div>
        <div class="row q-col-gutter-sm">
          <div class="col-lg-6 col-sm-6 col-xs-12 col-12">
            <q-select
              v-model="serviceProviderStore.filteredByServiseCategoryId"
              :options="serviceCategoryStore.allServiceCategoryList"
              :option-label="
                (opt) =>
                  Object(opt) === opt && 'name' in opt
                    ? opt.name[languageStore.language]
                    : null
              "
              options-dense
              outlined
              dense
            />
          </div>
          <div class="col-lg-6 col-sm-6  col-xs-12 col-12 fs-16 text-bold">
            <q-btn
              label="বাছুন"
              color="primary"
              outline
              @click="applyFilterFunc"
            />
            <q-btn
              class="q-ml-sm"
              label="পুনরুদ্ধার"
              color="primary"
              outline
              @click="resetFilterFunc"
            />
          </div>
        </div>
      </div>
    </div>
    <q-separator class="q-mb-md q-mt-sm" />
    <q-markup-table flat bordered dense separator="cell" class="text-left">
      <thead class="bg-blue-3">
        <tr>
          <th>{{ $t("serial") }}</th>
          <th>{{ $t("name") }}</th>
          <th>{{ $t("action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(serviceProvider, index) in serviceProviderStore.serviceProviderList.serviceProviders"
          :key="index"
          :class="{ 'bg-blue-1': index % 2 != 0 }"
        >
          <td>
            {{ enToBnToEn(String(index), languageStore.language) }}
          </td>
          <td>{{ serviceProvider.name[languageStore.language] }}</td>
          <td>
            <q-btn
              :label="$t('preview')"
              size="sm"
              dense
              color="primary"
              @click="
                serviceProviderStore.openServiceProviderPreviewDialogManager(
                  serviceProvider
                )
              "
            />
            <q-btn
              class="q-ml-xs"
              :label="$t('edit')"
              size="sm"
              dense
              color="positive"
              @click="
                serviceProviderStore.openServiceProviderEditDialogManager(
                  serviceProvider
                )
              "
            />
            <q-btn
              class="q-ml-xs"
              :label="$t('delete')"
              size="sm"
              dense
              color="negative"
              @click="confirm(serviceProvider)"
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
import { useI18n } from "vue-i18n";
import { useAuthStore } from "src/stores/auth/authStore";
import { onMounted } from "vue";
import { enToBnToEn } from "src/global_js/utils";
import { useServiceCategoryStore } from "src/stores/service/serviceCategoryStore";
import { useServiceStore } from "src/stores/service/serviceStore";
import { useServiceProviderStore } from "src/stores/service/serviceProviderStore";
import { useSearchServiceStore } from "src/stores/service/searchService";
const serviceStore = useServiceStore();
const authStore = useAuthStore();
const $q = useQuasar();
const { t } = useI18n();
const serviceProviderStore = useServiceProviderStore();
const { serviceProviderList } = storeToRefs(serviceProviderStore);
serviceProviderStore.getServiceProviderList()
const serviceCategoryStore = useServiceCategoryStore();
const languageStore = useLanguageStore();
const searchServiceStore = useSearchServiceStore();
const confirm = (service) => {
  serviceCategoryStore.serviceCategoryInfo.id = service._id;
  $q.dialog({
    title: t("confirm"),
    message:
      t("confirm_delete_start") +
      service.name[languageStore.language] +
      t("confirm_delete_end"),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    serviceCategoryStore.deleteServiceCategory();
  });
};

const applyFilterFunc = () => {
  if (serviceCategoryStore?.filteredByServiseId) {
    serviceCategoryStore.getFilteredServiceCategoryByService();
  }
};
const resetFilterFunc = () => {
  serviceCategoryStore.getServiceCategoryList();
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
