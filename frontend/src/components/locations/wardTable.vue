<template>
  <div>
    <div class="flex justify-between">
      <div class="text-h6">{{ $t("location.wardList") }}</div>
      <q-btn
        class="btn-h-22"
        color="positive"
        :label="$t('addnew')"
        icon="add"
        dense
        glossy
        size="sm"
        @click="wardStore.openWardCreateDialog = true"
      />
    </div>
    <q-separator class="q-my-sm" />
    <q-markup-table flat bordered dense separator="cell" class="text-left">
      <thead class="bg-blue-grey-2">
        <tr>
          <th>{{ $t("serial") }}</th>
          <th>{{ $t("location.ward") }}</th>
          <th>{{ $t("location.union") }}</th>
          <th>{{ $t("action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(ward, index) in wardList?.wards"
          :key="index"
          :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
        >
          <td>{{ enToBnToEn(String(index+1), languageStore.language) }}</td>
          <td>{{ ward?.name[languageStore.language] }}</td>
          <td>{{ ward.parent?.name[languageStore.language] }}</td>
          <td>
            <q-btn :label="$t('edit')" size="sm" dense
              glossy color="positive"
            @click="wardStore.openWardEditDialogManager(ward)"
            />
            <q-btn
              class="q-ml-xs"
              :label="$t('delete')"
              size="sm"
              dense
              glossy
              color="negative"
              @click="confirm(ward)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-separator class="q-mt-md" />
    <q-pagination
      class="q-mt-md"
      color="blue-grey-7"
      v-model="current"
      :max="wardStore.wardList?.pages"
      :max-pages="6"
      boundary-numbers
      @update:model-value="paginationFunc"
    />
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useWardStore } from "src/stores/locations/wardStore";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { enToBnToEn } from "src/global_js/utils";
import { ref } from "vue";
const $q = useQuasar();
const { t } = useI18n();
const wardStore = useWardStore();
const { wardList } = storeToRefs(wardStore);
const languageStore = useLanguageStore();
const confirm = (ward) => {
  wardStore.wardInfo.id = ward._id
  $q.dialog({
    title: t("confirm"),
    message: t("confirm_delete_start") + ward?.name[languageStore.language] + t("confirm_delete_end"),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    wardStore.deleteWard()
  });
};
// pagination
const current = ref(1);
const paginationFunc = () => {
  wardStore.wardPage = current.value;
  wardStore.getWardList();
};
</script>
