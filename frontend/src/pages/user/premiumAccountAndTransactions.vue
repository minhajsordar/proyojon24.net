<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <q-card class="border-primary q-pa-md">
          <div>
            <div class="flex justify-between">
              <div class="fs-18">{{ $t("payment_list") }}</div>
              <div class="q-gutter-sm">
                <q-btn
                v-if="!paymentStore.registrationFeePaid"
                  label="Pay Registration Fee"
                  color="primary"
                  size="sm"
                  @click="paymentStore.registrationFeeDialogManager"
                  />
                  <q-btn
                  label="new payment"
                  size="sm"
                  color="primary"
                  @click="paymentStore.paymentDialogManager"
                />
              </div>
            </div>
            <q-separator class="q-my-sm" />
            <q-markup-table flat bordered separator="cell" class="text-left">
              <thead class="bg-blue-grey-2">
                <tr>
                  <th>{{ $t("serial") }}</th>
                  <th>{{ $t("issue_date") }}</th>
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
                  v-for="(payment, index) in paymentStore.myPaymentList
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
                  <td>{{ payment.transactionId }}</td>
                  <td>{{ payment.amount }} {{ $currency_sign }}</td>
                  <td>{{ payment.periods }}</td>
                  <td>{{ payment.status }}</td>
                  <td>{{ payment.paymentFor }}</td>
                  <td>{{ payment.note }}</td>
                  <td>
                    <q-btn
                      :label="$t('delete')"
                      color="negative"
                      :disable="payment.status === 'approved'"
                      @click="paymentStore.deletePayment(payment._id)"
                    />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
            <q-separator class="q-mt-md" />
            <q-pagination
              class="q-mt-md"
              color="blue-grey-7"
              v-model="paymentStore.currentPage"
              :max="paymentStore.myPaymentList?.pages"
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
import { date } from "quasar";
import { usePaymentStore } from "src/stores/user/paymentStore";
const paymentStore = usePaymentStore();
paymentStore.getMyPaymentList();
paymentStore.getMyRegistrationPayment();

// pagination
const paginationFunc = () => {
  paymentStore.getMyPaymentList();
};
</script>
<style></style>
