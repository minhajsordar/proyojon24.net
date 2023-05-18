<template>
  <div>
    <div class="flex justify-between">
      <div class="text-h6">{{ $t("location.unionList") }}</div>
      <q-btn
        class="btn-h-22"
        color="positive"
        :label="$t('addnew')"
        icon="add"
        dense
        size="sm"
        @click="unionStore.openUnionCreateDialog = true"
      />
    </div>
    <q-separator class="q-my-sm" />
    <q-markup-table flat bordered dense separator="cell" class="text-left">
      <thead class="bg-blue-3">
        <tr>
          <th>{{ $t("serial") }}</th>
          <th>{{ $t("location.union") }}</th>
          <th>{{ $t("location.subdistrict") }}</th>
          <th>{{ $t("action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(union, index) in unionList"
          :key="index"
          :class="{ 'bg-blue-1': index % 2 != 0 }"
        >
          <td>{{ enToBnToEn(String(index), languageStore.language) }}</td>
          <td>{{ union.name[languageStore.language] }}</td>
          <td>{{ union.parent[languageStore.language] }}</td>
          <td>
            <q-btn :label="$t('edit')" size="sm" dense color="positive" key=""
            @click="unionStore.openUnionEditDialogManager(union)"
            />
            <q-btn
              class="q-ml-xs"
              :label="$t('delete')"
              size="sm"
              dense
              color="negative"
              @click="confirm(union.name[languageStore.language])"
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
import { useUnionStore } from "src/stores/locations/unionStore";
import { useI18n } from "vue-i18n";
import { enToBnToEn } from "src/global_js/utils";
const $q = useQuasar();
const { t } = useI18n();
const unionStore = useUnionStore();
const { unionList } = storeToRefs(unionStore);
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
