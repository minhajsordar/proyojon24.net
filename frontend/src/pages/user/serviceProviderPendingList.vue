<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <q-card class="border-primary q-pa-md">
          <div>
            <div class="fs-18">{{ $t("headermenus.pendinglist") }}</div>
            <q-separator class="q-my-sm" />
            <q-markup-table
              flat
              bordered
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
                  v-for="(provider, index) in serviceProviderPendingStore.serviceProviderPendingList"
                  :key="index"
                  :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
                >
                  <td>
                    {{ enToBnToEn(String(index+1), languageStore.language) }}
                  </td>
                  <td>
                    {{ provider.name[languageStore.language] }}
                  </td>
                  <td>
                    <q-btn
                      class="q-ml-xs"
                      :label="$t('preview')"
                      size="sm"
                      dense
                      color="blue-grey-10"
                    />
                    <q-btn
                      class="q-ml-xs"
                      :label="$t('approved')"
                      size="sm"
                      dense
                      color="positive"
                      @click="confirm(provider._id,provider.dataCollector)"
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
import { useQuasar, useMeta } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useUserStore } from "src/stores/user/userStore";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "src/stores/auth/authStore";
import { onMounted, ref } from "vue";
import { enToBnToEn } from "src/global_js/utils";
import { useRouter } from "vue-router";
import  userPermission  from "src/components/profile/userPermission.vue";
import { useLocalStorage } from "@vueuse/core";
import { useServiceProviderPendingStore } from "src/stores/service/serviceProviderPendingStore";
const serviceProviderPendingStore = useServiceProviderPendingStore()
serviceProviderPendingStore.getServiceProviderPendingList()
const userInfo = useLocalStorage('proyojonloginuser',{})
const router = useRouter();
const authStore = useAuthStore();
const $q = useQuasar();
const { t } = useI18n();
const userStore = useUserStore();

const { userList } = storeToRefs(userStore);
const languageStore = useLanguageStore();
const adminUserType = ref('self')
const confirm = (id,dataCollector) => {
  $q.dialog({
    title: t("confirm"),
    message: "Are you sure to approved this.",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    serviceProviderPendingStore.approveServiceProviderProfile(id,dataCollector)
    console.log(">>>> OK");
  });
};
onMounted(() => {
  authStore.checkLogin();
  if (!(userInfo.value.isAdmin ||
  ["division", "district", "subDistrict", "union"].includes(userInfo.value.permission))
  ) {
    router.push("/profile");
  }
});
const metaData = {
  // sets document title
  title: "User List",
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
