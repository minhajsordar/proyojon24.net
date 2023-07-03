<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <q-card class="border-primary q-pa-md">
          <div>
            <div class="flex justify-between">
              <div class="fs-18">{{ $t("payment_list") }}</div>
              <q-btn
                label="new payment"
                color="primary"
                @click="paymentStore.paymentDialogManager"
              />
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
                  <td>{{ date.formatDate(payment.createdAt, "YYYY-MM-DD  HH:mm:ss") }}</td>
                  <td>{{ payment.transactionId }}</td>
                  <td>{{ payment.amount }}</td>
                  <td>{{ payment.periods }}</td>
                  <td>{{ payment.status }}</td>
                  <td>{{ payment.note }}</td>
                  <td>
                    <q-btn
                      :label="$t('delete')"
                      color="negative"
                      :disable="payment.status ==='approved'"
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
</template>
<script setup>
import addPaymentDialog from "src/components/dialogs/user/addPaymentDialog.vue";
import {date} from 'quasar'
import { usePaymentStore } from "src/stores/user/paymentStore";
const paymentStore = usePaymentStore();
paymentStore.getMyPaymentList();

// pagination
const paginationFunc = () => {
  paymentStore.getMyPaymentList();
};
</script>
<style></style>
