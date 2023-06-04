<template>
  <div>
    <div class="flex justify-between">
      <div class="text-h6">{{ $t("location.pinlocationList") }}</div>
      <q-btn
        class="btn-h-22"
        color="positive"
        :label="$t('addnew')"
        icon="add"
        dense
        glossy
        size="sm"
        @click="pinlocationStore.openPinlocationCreateDialog = true"
      />
    </div>
    <q-separator class="q-my-sm" />
    <q-markup-table flat bordered dense separator="cell" class="text-left">
      <thead class="bg-blue-grey-2">
        <tr>
          <th>{{ $t("serial") }}</th>
          <th>{{ $t("location.union") }}</th>
          <th>{{ $t("location.pinlocation") }}</th>
          <th>{{ $t("action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(pinlocation, index) in pinlocationList?.pinlocations"
          :key="index"
          :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
        >
          <td>{{ enToBnToEn(String(index+1), languageStore.language) }}</td>
          <td>{{ pinlocation.parent?.name[languageStore.language] }}</td>
          <td>{{ pinlocation?.name[languageStore.language] }}</td>
          <td>
            <q-btn :label="$t('edit')" size="sm" dense
              glossy color="positive"
            @click="pinlocationStore.openPinlocationEditDialogManager(pinlocation)"
            />
            <q-btn
              class="q-ml-xs"
              :label="$t('delete')"
              size="sm"
              dense
              glossy
              color="negative"
              @click="confirm(pinlocation)"
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
      :max="pinlocationStore.pinlocationList?.pages"
      :max-pages="6"
      boundary-numbers
      @update:model-value="paginationFunc"
    />
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { usePinlocationStore } from "src/stores/locations/pinlocationStore";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { enToBnToEn } from "src/global_js/utils";
import { ref } from "vue";
const $q = useQuasar();
const { t } = useI18n();
const pinlocationStore = usePinlocationStore();
const { pinlocationList } = storeToRefs(pinlocationStore);
const languageStore = useLanguageStore();
const confirm = (pinlocation) => {
  pinlocationStore.pinlocationInfo.id = pinlocation._id
  $q.dialog({
    title: t("confirm"),
    message: t("confirm_delete_start") + pinlocation?.name[languageStore.language] + t("confirm_delete_end"),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    pinlocationStore.deletePinlocation()
  });
};
// pagination
const current = ref(1);
const paginationFunc = () => {
  pinlocationStore.pinlocationPage = current.value;
  pinlocationStore.getPinlocationList();
};
</script>
