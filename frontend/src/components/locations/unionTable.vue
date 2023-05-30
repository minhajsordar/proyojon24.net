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
              glossy
        size="sm"
        @click="unionStore.openUnionCreateDialog = true"
      />
    </div>
    <q-separator class="q-my-sm" />
    <q-markup-table flat bordered dense separator="cell" class="text-left">
      <thead class="bg-blue-grey-2">
        <tr>
          <th>{{ $t("serial") }}</th>
          <th>{{ $t("location.union") }}</th>
          <th>{{ $t("location.subdistrict") }}</th>
          <th>{{ $t("action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(union, index) in unionList?.unions"
          :key="index"
          :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
        >
          <td>{{ enToBnToEn(String(index+1), languageStore.language) }}</td>
          <td>{{ union?.name[languageStore.language] }}</td>
          <td>{{ union.parent?.name[languageStore.language] }}</td>
          <td>
            <q-btn :label="$t('edit')" size="sm" dense
              glossy color="positive" key=""
            @click="unionStore.openUnionEditDialogManager(union)"
            />
            <q-btn
              class="q-ml-xs"
              :label="$t('delete')"
              size="sm"
              dense
              glossy
              color="negative"
              @click="confirm(union)"
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
      :max="unionStore.unionList?.pages"
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
import { useUnionStore } from "src/stores/locations/unionStore";
import { useI18n } from "vue-i18n";
import { enToBnToEn } from "src/global_js/utils";
import { ref } from "vue";
const $q = useQuasar();
const { t } = useI18n();
const unionStore = useUnionStore();
const { unionList } = storeToRefs(unionStore);
const languageStore = useLanguageStore();
const confirm = (union) => {
  unionStore.unionInfo.id = union._id
  $q.dialog({
    title: t("confirm"),
    message: t("confirm_delete_start") + union?.name[languageStore.language] + t("confirm_delete_end"),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    unionStore.deleteUnion()
  });
};
// pagination
const current = ref(1);
const paginationFunc = () => {
  unionStore.unionPage = current.value;
  unionStore.getUnionList();
};
</script>
