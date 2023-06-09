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
        glossy
        size="sm"
        @click="serviceProviderStore.openServiceProviderCreateDialogManager"
      />
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-lg-4 col-sm-4 col-xs-12 col-12">
        <div>{{ $t("getInfoByService") }}</div>
        <q-select
          v-model="serviceCategoryStore.filteredByServiseId"
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
          @update:model-value="
            () => {
              searchServiceStore.updateServiceCategoryOnServiceProviderTable();
              serviceProviderStore.filteredByServiseCategoryId = null;
            }
          "
        />
      </div>
      <div class="col-sm-8 col-xs-12 col-12">
        <div>{{ $t("getInfoByServiceCategory") }}</div>
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
          <div class="col-lg-6 col-sm-6 col-xs-12 col-12 fs-16 text-bold">
            <q-btn
              :label="$t('search')"
              color="primary"
              glossy
              @click="applyFilterFunc"
            />
            <q-btn
              class="q-ml-sm"
              :label="$t('restore')"
              color="primary"
              glossy
              @click="resetFilterFunc"
            />
          </div>
        </div>
      </div>
    </div>
    <q-separator class="q-mb-md q-mt-sm" />
    <q-markup-table flat bordered separator="cell" class="text-left">
      <thead class="bg-blue-grey-2">
        <tr>
          <th>{{ $t("serial") }}</th>
          <th>{{ $t("name") }}</th>
          <th>{{ $t("action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(serviceProvider, index) in serviceProviderStore
            .serviceProviderList?.serviceProviders"
          :key="index"
          :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
        >
          <td>
            {{ enToBnToEn(String(index + 1), languageStore.language) }}
          </td>
          <td>{{ serviceProvider.name[languageStore.language] }}</td>
          <td>
            <q-btn
              :label="$t('preview')"
              size="sm"
              dense
              glossy
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
              glossy
              color="positive"
              @click="
                serviceProviderStore.openServiceProviderEditDialogManager(
                  serviceProvider
                );
                editManager(serviceProvider);
              "
            />
            <q-btn
              v-if="!serviceProvider.suggested"
              class="q-ml-xs"
              :label="$t('addToSuggestion')"
              size="sm"
              dense
              glossy
              color="orange"
              @click="
                serviceProviderStore.addToSuggestionServiceProvider(
                  serviceProvider._id
                )
              "
            />
            <q-btn
              v-else
              class="q-ml-xs"
              :label="$t('removeFromSuggestion')"
              size="sm"
              dense
              glossy
              color="negative"
              @click="
                serviceProviderStore.removeFromSuggestionServiceProvider(
                  serviceProvider._id
                )
              "
            />
            <q-btn
              class="q-ml-xs"
              :label="$t('delete')"
              size="sm"
              dense
              glossy
              color="negative"
              @click="confirm(serviceProvider)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-separator class="q-mt-md" />
    <q-pagination
      class="q-mt-md"
      color="blue-grey-7"
      v-model="serviceProviderStore.paginationCurrent"
      :max="serviceProviderStore.serviceProviderList?.pages"
      :max-pages="6"
      boundary-numbers
      @update:model-value="paginationFunc"
    />
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useQuasar, useMeta } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "src/stores/auth/authStore";
import { onMounted, ref } from "vue";
import { enToBnToEn } from "src/global_js/utils";
import { useServiceCategoryStore } from "src/stores/service/serviceCategoryStore";
import { useServiceStore } from "src/stores/service/serviceStore";
import { useServiceProviderStore } from "src/stores/service/serviceProviderStore";
import { useSearchServiceStore } from "src/stores/service/searchService";
import { useDivisionStore } from "src/stores/locations/divisionStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { useSubDistrictStore } from "src/stores/locations/subDistrictStore";
import { useUnionStore } from "src/stores/locations/unionStore";
import { usePinlocationStore } from "src/stores/locations/pinlocationStore";
const districtStore = useDistrictStore();
const subDistrictStore = useSubDistrictStore();
const unionStore = useUnionStore();
const pinlocationStore = usePinlocationStore();
const serviceStore = useServiceStore();
const authStore = useAuthStore();
const $q = useQuasar();
const { t } = useI18n();
const serviceProviderStore = useServiceProviderStore();
const { serviceProviderList } = storeToRefs(serviceProviderStore);
const serviceCategoryStore = useServiceCategoryStore();
const languageStore = useLanguageStore();
const searchServiceStore = useSearchServiceStore();
const confirm = (service) => {
  serviceProviderStore.serviceProviderInfo.id = service._id;
  $q.dialog({
    title: t("confirm"),
    message:
      t("confirm_delete_start") +
      service.name[languageStore.language] +
      t("confirm_delete_end"),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    serviceProviderStore.deleteServiceProvider();
  });
};

const applyFilterFunc = () => {
  if (serviceProviderStore?.filteredByServiseCategoryId) {
    // serviceProviderStore.getFilteredServiceProviderByServiceCategory();
    serviceProviderStore.getServiceProviderList();
  } else {
    // serviceProviderStore.getServiceProviderList();
    // serviceCategoryStore.filteredByServiseId._id
  }
};
const resetFilterFunc = () => {
  serviceProviderStore.getServiceProviderList();
};

// pagination
const current = ref(1);
const paginationFunc = () => {
  serviceProviderStore.serviceProviderPage =
    serviceProviderStore.paginationCurrent;
  serviceProviderStore.getServiceProviderList();
};
const editManager = (data) => {
  console.log(data);
  // if (data.serviceProviderLocation.division) {
  //   console.log(data.serviceProviderLocation.division._id);
  //   districtStore.getAllDistricts(data.serviceProviderLocation.division._id);
  // }
  // if (data.serviceProviderLocation.district) {
  //   subDistrictStore.getAllSubDistricts(
  //     data.serviceProviderLocation.district._id
  //   );
  // }
  // if (data.serviceProviderLocation.subDistrict) {
  //   unionStore.getAllUnions(data.serviceProviderLocation.subDistrict._id);
  // }
  // if (data.serviceProviderLocation.union) {
  //   pinlocationStore.getAllPinlocations(data.serviceProviderLocation.union._id);
  // }
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
<style></style>
