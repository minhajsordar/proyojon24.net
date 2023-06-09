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
              glossy
        size="sm"
        @click="districtStore.openDistrictCreateDialog = true"
      />
    </div>
    <q-separator class="q-my-sm" />
    <q-markup-table flat bordered separator="cell" class="text-left">
      <thead class="bg-blue-grey-2">
        <tr>
          <th>{{ $t("serial") }}</th>
          <th>{{ $t("location.district") }}</th>
          <th>{{ $t("location.division") }}</th>
          <th>{{ $t("action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(district, index) in districtList?.districts"
          :key="index"
          :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
        >
          <td>{{ enToBnToEn(String(index+1), languageStore.language) }}</td>
          <td>{{ district?.name[languageStore.language] }}</td>
          <td>{{ district.parent?.name[languageStore.language] }}</td>
          <td>
            <q-btn :label="$t('edit')" size="sm" dense
              glossy color="positive"
            @click="districtStore.openDistrictEditDialogManager(district)"
            />
            <q-btn
              class="q-ml-xs"
              :label="$t('delete')"
              size="sm"
              dense
              glossy
              color="negative"
              @click="confirm(district)"
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
      :max="districtStore.districtList?.pages"
      :max-pages="6"
      boundary-numbers
      @update:model-value="paginationFunc"
    />
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { useI18n } from "vue-i18n";
import { enToBnToEn } from "src/global_js/utils";
import { ref } from "vue";
const $q = useQuasar();
const { t } = useI18n();
const districtStore = useDistrictStore();
const { districtList } = storeToRefs(districtStore);
const languageStore = useLanguageStore();
const confirm = (district) => {
  districtStore.districtInfo.id = district._id
  $q.dialog({
    title: t("confirm"),
    message: t("confirm_delete_start") + district?.name[languageStore.language] + t("confirm_delete_end"),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    districtStore.deleteDistrict()
  });
};
// pagination
const current = ref(1);
const paginationFunc = () => {
  districtStore.districtPage = current.value;
  districtStore.getDistrictList();
};
</script>

