<template>
  <div>
    <div class="flex justify-between">
      <div class="text-h6">{{ $t("location.districtList") }}</div>
      <q-btn
        class="btn-h-22"
        color="positive"
        :label="$t('addnew')"
        icon="add"
        dense
        size="sm"
        @click="districtStore.openDistrictCreateDialog = true"
      />
    </div>
    <q-separator class="q-my-sm" />
    <q-markup-table flat bordered dense separator="cell" class="text-left">
      <thead class="bg-blue-3">
        <tr>
          <th>{{ $t("serial") }}</th>
          <th>{{ $t("location.district") }}</th>
          <th>{{ $t("action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(district, index) in districtList?.districts"
          :key="index"
          :class="{ 'bg-blue-1': index % 2 != 0 }"
        >
          <td>{{ enToBnToEn(String(index), languageStore.language) }}</td>
          <td>{{ district?.name[languageStore.language] }}</td>
          <td>
            <q-btn :label="$t('edit')" size="sm" dense color="positive"
            @click="districtStore.openDistrictEditDialogManager(district)"
            />
            <q-btn
              class="q-ml-xs"
              :label="$t('delete')"
              size="sm"
              dense
              color="negative"
              @click="confirm(district?.name[languageStore.language])"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { useI18n } from "vue-i18n";
import { enToBnToEn } from "src/global_js/utils";
const $q = useQuasar();
const { t } = useI18n();
const districtStore = useDistrictStore();
const { districtList } = storeToRefs(districtStore);
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
</script>

