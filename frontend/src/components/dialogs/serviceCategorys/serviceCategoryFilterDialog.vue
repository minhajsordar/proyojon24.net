<template>
  <q-dialog
    v-model="publicUserStore.openFilterByServiceCategoryDialog"
    persistent
    full-height
  >
    <q-card class="q-pa-md dialog-card-width">
      <div class="flex justify-between q">
        <div>{{ $t("selectCategory") }}</div>
        <q-icon
          name="close"
          v-close-popup
          @click="publicUserStore.openFilterByServiceCategoryDialog = false"
        />
      </div>
      <q-separator class="q-my-md" />
      <div
        v-for="(
          serviceCategory, index
        ) in serviceCategoryStore.allServiceCategoryList"
        :key="index"
      >
        <q-btn
          flat
          class="sidebar-links full-width bg-blue-grey-1"
          :class="{
            'bg-blue-grey-3': route.params.id == serviceCategory._id,
          }"
          @click="
            getServiceProviders(serviceCategory._id);

            selectedServiceAndCategory.serviceCategoryId = serviceCategory._id;
            selectedServiceAndCategory.serviceCategoryName =
              serviceCategory.name;
          "
          v-close-popup
        >
          {{ serviceCategory.name[languageStore.language] }}
        </q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useLocalStorage } from "@vueuse/core";
import { useMeta } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { useServiceCategoryStore } from "src/stores/service/serviceCategoryStore";
import { useServiceProviderStore } from "src/stores/service/serviceProviderStore";
import { usePublicUserStore } from "src/stores/user/publicStore";
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

const userBrowsingLocationLocalStore = useLocalStorage("browsing-location", {});
const selectedServiceAndCategory = useLocalStorage(
  "selected-service-and-category",
  {}
);
const publicUserStore = usePublicUserStore();
const languageStore = useLanguageStore();

const router = useRouter();
const route = useRoute();
const serviceProviderStore = useServiceProviderStore();
const serviceCategoryStore = useServiceCategoryStore();
// serviceCategoryStore.getAllServiceCategorys(
//   selectedServiceAndCategory.value.serviceId
// );

const getServiceProviders = (id) => {
  serviceProviderStore.getPublicServiceProviders(id);
  router.push("/service_providers_list/" + id);
};
</script>
<style lang="scss">
.dialog-card-width {
  width: 500px;
}
@media screen and (max-width: 600px) {
  .dialog-card-width {
    width: 300px;
  }
}
</style>
