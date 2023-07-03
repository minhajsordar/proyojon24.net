<template>
  <q-dialog
    v-model="paymentStore.openPaymentDialog"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="text-primary">
      <q-bar class="bg-primary text-white">
        <q-space />
        <q-btn dense glossy flat icon="close" class="bg-red" v-close-popup>
          <q-tooltip class="bg-primary text-white">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-card class="border-primary q-pa-md">
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <div class="row">
                <div class="col-12">
                  <div class="text-bold">
                    {{ $t('bankAccountName') }}
                  </div>
                  <q-select
                    ref="bankAccountNameEl"
                    v-model="paymentStore.paymentInfo.bankAccountName"
                    outlined
                    :options="['bKash', 'Dutch Bangla', 'Nagad']"
                    dense
                    :rules="[required]"
                  />
                </div>
                <div class="col-12">
                  <div class="text-bold">
                    {{ $t('phoneNumber') }}
                  </div>
                  <q-input
                    ref="phoneNumberEl"
                    v-model="paymentStore.paymentInfo.phoneNumber"
                    outlined
                    dense
                    :rules="[mobileNoBd]"
                  />
                </div>
                <div class="col-12">
                  <div class="text-bold">
                    {{ $t('transactionId') }}
                  </div>
                  <q-input
                    ref="transactionIdEl"
                    v-model="paymentStore.paymentInfo.transactionId"
                    outlined
                    dense
                    :rules="[required]"
                  />
                </div>
                <div class="col-12">
                  <div class="text-bold">
                    {{ $t('amount') }}
                  </div>
                  <q-input
                    ref="amountEl"
                    v-model="paymentStore.paymentInfo.amount"
                    outlined
                    dense
                    type="number"
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row justify-end">
                <q-btn :label="$t('confirm')" color="primary"
              glossy @click="addPaymentManager"/>
              </div>
            </div>
          </div>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";
import { required, requiredSelector, mobileNoBd  } from "src/global_js/utils";
import { usePaymentStore } from "src/stores/user/paymentStore";
const paymentStore =usePaymentStore()
const bankAccountNameEl = ref(null);
const phoneNumberEl = ref(null);
const transactionIdEl = ref(null);
const amountEl = ref(null);

const addPaymentManager = () => {
  bankAccountNameEl.value.validate();
  phoneNumberEl.value.validate();
  transactionIdEl.value.validate();
  amountEl.value.validate();
  if (
    bankAccountNameEl.value.hasError ||
    phoneNumberEl.value.hasError ||
    transactionIdEl.value.hasError ||
    amountEl.value.hasError
  ) {
    return;
  }
  paymentStore.makePayment()
};
</script>
