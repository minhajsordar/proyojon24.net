<template>
  <div>
    <div class="flex justify-between">
      <div class="text-h6">{{ $t("location.divisionList") }}</div>
      <q-btn
        class="btn-h-22"
        color="positive"
        :label="$t('addnew')"
        icon="add"
        dense
              glossy
        size="sm"
        @click="divisionStore.openDivisionCreateDialog = true"
      />
    </div>
    <q-separator class="q-my-sm" />
    <q-markup-table flat bordered dense separator="cell" class="text-left">
      <thead class="bg-blue-grey-2">
        <tr>
          <th>{{ $t("serial") }}</th>
          <th>{{ $t("location.division") }}</th>
          <th>{{ $t("action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(division, index) in divisionList?.divisions"
          :key="index"
          :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
        >
          <td>{{ enToBnToEn(String(index), languageStore.language) }}</td>
          <td>{{ division?.name[languageStore.language] }}</td>
          <td>
            <q-btn :label="$t('edit')" size="sm" dense
              glossy color="positive"
            @click="divisionStore.openDivisionEditDialogManager(division)"
            />
            <q-btn
              class="q-ml-xs"
              :label="$t('delete')"
              size="sm"
              dense
              glossy
              color="negative"
              @click="confirm(division)"
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
import { useDivisionStore } from "src/stores/locations/divisionStore";
import { useI18n } from "vue-i18n";
import { enToBnToEn } from "src/global_js/utils";
const $q = useQuasar();
const { t } = useI18n();
const divisionStore = useDivisionStore();
const { divisionList } = storeToRefs(divisionStore);
const languageStore = useLanguageStore();

const confirm = (division) => {
  divisionStore.divisionInfo.id = division._id
  $q.dialog({
    title: t("confirm"),
    message: t("confirm_delete_start") + division?.name[languageStore.language] + t("confirm_delete_end"),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    divisionStore.deleteDivision()
  });
};
</script>
