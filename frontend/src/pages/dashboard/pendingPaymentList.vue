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
                  <th>{{ $t("issue_date") }}</th>
                  <th>{{ $t("userId") }}</th>
                  <th>{{ $t("transactionId") }}</th>
                  <th>{{ $t("amount") }}</th>
                  <th>{{ $t("premium_account_periods") }}</th>
                  <th>{{ $t("status") }}</th>
                  <th>{{ $t("paymentfor") }}</th>
                  <th>{{ $t("note") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(payment, index) in pendingPaymentStore.pendingPaymentList
                    ?.payments"
                  :key="index"
                  :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
                >
                  <td>
                    {{ index }}
                  </td>
                  <td>
                    {{
                      date.formatDate(payment.createdAt, "YYYY-MM-DD  HH:mm:ss")
                    }}
                  </td>
                  <td>{{ payment.user.registrationNo }}</td>
                  <td>{{ payment.transactionId }}</td>
                  <td>{{ payment.amount }}</td>
                  <td>{{ payment.periods }}</td>
                  <td>{{ payment.status }}</td>
                  <td>{{ payment.paymentFor }}</td>
                  <td>{{ payment.note }}</td>
                  <td>
                    <q-btn
                      :label="$t('approved')"
                      color="positive"
                      @click="pendingPaymentStore.approvePayment(payment._id)"
                    />
                    <q-btn
                      :label="$t('reject')"
                      color="negative"
                      @click="rejectDialog(payment._id)"
                    />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
            <q-separator class="q-mt-md" />
            <q-pagination
              class="q-mt-md"
              color="blue-grey-7"
              v-model="pendingPaymentStore.currentPage"
              :max="pendingPaymentStore.pendingPaymentList?.pages"
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
import { usePendingPaymentStore } from "src/stores/dashboard/pendingPaymentStore";
import { useI18n } from "vue-i18n";
const pendingPaymentStore = usePendingPaymentStore()
pendingPaymentStore.getPendingPaymentList();

// pagination
const paginationFunc = () => {
pendingPaymentStore.getPendingPaymentList();
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
