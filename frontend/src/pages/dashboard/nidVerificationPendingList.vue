<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <q-card class="border-primary q-pa-md">
          <div>
            <q-markup-table flat bordered separator="cell" class="text-left">
              <thead class="bg-blue-grey-2">
                <tr>
                  <th>{{ $t("serial") }}</th>
                  <th>{{ $t("update_date") }}</th>
                  <th>{{ $t("nidno") }}</th>
                  <th>{{ $t("name") }}</th>
                  <th>{{ $t("image") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(user, index) in pendingNidVerificationStore
                    .pendingNidVerificationList?.users"
                  :key="index"
                  :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
                >
                  <td>
                    {{ index }}
                  </td>
                  <td>
                    {{
                      date.formatDate(user.updatedAt, "YYYY-MM-DD  HH:mm:ss")
                    }}
                  </td>
                  <td>{{ user.nidNo }}</td>
                  <td>{{ user.name[languageStore.language] }}</td>
                  <td>
                    <q-img :src="web_root_url + user?.nidImage" />
                  </td>
                  <td>
                    <div class="q-gutter-sm">

                    <q-btn
                    class="btn-h-39"
                    dense
                    color="white"
                    text-color="primary"
                    :icon="fullscreen ? 'fullscreen_exit' : 'visibility'"
                    @click="
                        () => {
                          fullscreen = true;
                          fullscreenImage = web_root_url + user?.nidImage;
                        }
                        "
                    />
                    <q-btn
                    class="btn-h-39"
                    :label="$t('approved')"
                    color="positive"
                    @click="
                        pendingNidVerificationStore.approveNid(user._id)
                        "
                    />
                    <q-btn
                    class="btn-h-39"
                      :label="$t('reject')"
                      color="negative"
                      @click="rejectDialog(user._id)"
                    />
                    </div>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
            <q-separator class="q-mt-md" />
            <q-pagination
              class="q-mt-md"
              color="blue-grey-7"
              v-model="pendingNidVerificationStore.currentPage"
              :max="
                pendingNidVerificationStore.pendingNidVerificationList?.pages
              "
              :max-pages="6"
              boundary-numbers
              @update:model-value="paginationFunc"
            />
          </div>
        </q-card>
      </div>
    </div>
  </div>
  <q-dialog v-model="fullscreen" full-height full-width maximized>
    <q-card class="text-black">
      <q-bar class="bg-primary text-white">
        <q-space />
        <q-btn
          dense
          glossy
          flat
          icon="minimize"
          @click="fullscreen = false"
          :disable="!fullscreen"
        >
          <q-tooltip v-if="fullscreen" class="bg-white text-primary"
            >Minimize</q-tooltip
          >
        </q-btn>
        <q-btn
          dense
          glossy
          flat
          icon="crop_square"
        >
          <q-tooltip v-if="!fullscreen" class="bg-white text-primary"
            >Maximize</q-tooltip
          >
        </q-btn>
        <q-btn dense glossy flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-img :src="fullscreenImage" />
      </q-card-section>
      </q-card>
    <!-- <div class="relative-position">
    </div> -->
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";
import { date, useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { usePendingNidVerificationStore } from "src/stores/dashboard/pendingNidVerificationStore";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { web_root_url } from "src/global_constant/root_url";
const pendingNidVerificationStore = usePendingNidVerificationStore();
pendingNidVerificationStore.getPendingNidVerificationList();
const languageStore = useLanguageStore();

// pagination
const paginationFunc = () => {
  pendingNidVerificationStore.getPendingNidVerificationList();
};
const fullscreen = ref(false);
const fullscreenImage = ref(null);
const $q = useQuasar();
const { t } = useI18n();
const rejectDialog = (id) => {
  $q.dialog({
    title: t("reject"),
    message: "Are you sure to reject this?",
    prompt: {
      model: "",
      type: "text", // optional
    },
    cancel: true,
    persistent: true,
  }).onOk((data) => {
    pendingNidVerificationStore.rejectNote = data;
    pendingNidVerificationStore.rejectNid(id);
  });
};
</script>
<style></style>
