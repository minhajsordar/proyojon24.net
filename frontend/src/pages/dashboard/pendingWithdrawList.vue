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
                  <th>{{ $t("withdraw_date") }}</th>
                  <th>{{ $t("userId") }}</th>
                  <th>{{ $t("amount") }}</th>
                  <th>{{ $t("withdrawVia") }}</th>
                  <th>{{ $t("status") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(withdraw, index) in pendingWithdrawStore.pendingWithdrawList
                    ?.withdrawList"
                  :key="index"
                  :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
                >
                  <td>
                    {{ index }}
                  </td>
                  <td>
                    {{
                      date.formatDate(withdraw.createdAt, "YYYY-MM-DD  HH:mm:ss")
                    }}
                  </td>
                  <td>{{ withdraw.user?.registrationNo }}</td>
                  <td>{{ -1 * withdraw.amount }} {{ $currency_sign }}</td>
                  <td>{{ withdraw.description }}</td>
                  <td>{{ withdraw.status }}</td>
                  <td>
                    <q-btn
                      :label="$t('approved')"
                      color="positive"
                      @click="pendingWithdrawStore.approveWithdrawAmount(withdraw._id)"
                    />
                    <!-- <q-btn
                      :label="$t('reject')"
                      color="negative"
                      @click="rejectDialog(payment._id)"
                    /> -->
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
            <q-separator class="q-mt-md" />
            <q-pagination
              class="q-mt-md"
              color="blue-grey-7"
              v-model="pendingWithdrawStore.currentPage"
              :max="pendingWithdrawStore.pendingWithdrawList?.pages"
              :max-pages="6"
              boundary-numbers
              @update:model-value="paginationFunc"
            />
          </div>
        </q-card>
      </div>
    </div>
  </div>
  <addPaymentDialog />
  <addRegistrationFeeDialog />
</template>
<script setup>
import addPaymentDialog from "src/components/dialogs/user/addPaymentDialog.vue";
import addRegistrationFeeDialog from "src/components/dialogs/user/addRegistrationFeeDialog.vue";
import { date, useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { usePendingWithdrawStore } from "src/stores/dashboard/pendingWithdrawStore";
const pendingWithdrawStore = usePendingWithdrawStore()
pendingWithdrawStore.getPendingWithdrawList();

// pagination
const paginationFunc = () => {
pendingWithdrawStore.getPendingWithdrawList();
};
const $q = useQuasar()
const {t} = useI18n()
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
    pendingPaymentStore.rejectNote = data
    pendingPaymentStore.rejectPayment(
      id
    );
  });
};
</script>
<style></style>
