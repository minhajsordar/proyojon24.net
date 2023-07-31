<template lang="">
  <div>
    <q-markup-table flat bordered separator="cell" class="text-left">
      <thead class="bg-blue-grey-2">
        <tr>
          <th>{{ $t("serial") }}</th>
          <th>{{ $t("amount") }}</th>
          <th>{{ $t("employeecount") }}</th>
          <th>{{ $t("action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(monthlyfee, index) in monthlyFeeStore.monthlyFeeData?.monthlyFees"
          :key="index"
          :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
        >
          <td>
            {{ enToBnToEn(String(index + 1), languageStore.language) }}
          </td>
          <td>{{ monthlyfee.amount }} {{ $currency_sign }}</td>
          <td>{{ monthlyfee.employeeCount }}</td>
          <td>
            <!-- <q-btn
              class="q-ml-xs"
              :label="$t('edit')"
              size="sm"
              dense
              glossy
              color="positive"
              @click="
                serviceCategoryStore.openServiceCategoryEditDialogManager(
                  service
                )
              "
            /> -->
            <q-btn
              class="q-ml-xs"
              :label="$t('delete')"
              size="sm"
              dense
              glossy
              color="negative"
              @click="confirm(monthlyfee._id)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <!-- <q-separator class="q-mt-md" />
    <q-pagination
      class="q-mt-md"
      color="blue-grey-7"
      v-model="serviceCategoryStore.paginationCurrent"
      :max="serviceCategoryStore.serviceCategoryList?.pages"
      :max-pages="6"
      boundary-numbers
      @update:model-value="paginationFunc"
    /> -->
  </div>
</template>
<script setup>
import { useMonthlyFeeStore } from "src/stores/dashboard/monthlyFeeStore.js";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { enToBnToEn } from "src/global_js/utils";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

const monthlyFeeStore = useMonthlyFeeStore();
const languageStore = useLanguageStore();

const $q = useQuasar()

const { t } = useI18n();
const confirm = (id) => {
  $q.dialog({
    title: t("confirm"),
    message: "Are you sure you want to delete monthly fee data",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    monthlyFeeStore.deleteMonthlyFee(id)
  });
};
</script>
<style lang=""></style>
