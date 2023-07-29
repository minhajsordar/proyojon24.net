<template>
  <q-dialog
    v-model="withdrawalMethodeStore.openWithdrawalMethodeDialog"
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
                  <q-input
                    ref="bankAccountNameEl"
                    v-model="withdrawalMethodeStore.withdrawalMethodeInfo.mobileBankName"
                    outlined
                    dense
                    disable
                    :rules="[required]"
                  />
                </div>
                <div class="col-12">
                  <div class="text-bold">
                    {{ $t('AccoountPhoneNumber') }}
                  </div>
                  <q-input
                    ref="phoneNumberEl"
                    v-model="withdrawalMethodeStore.withdrawalMethodeInfo.phone"
                    outlined
                    dense
                    :rules="[mobileNoBd]"
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
import { useWithdrawalMethodeStore } from "src/stores/user/withdrawalMethodeStore";
const withdrawalMethodeStore =useWithdrawalMethodeStore()
const bankAccountNameEl = ref(null);
const phoneNumberEl = ref(null);

const addPaymentManager = () => {
  bankAccountNameEl.value.validate();
  phoneNumberEl.value.validate();
  if (
    bankAccountNameEl.value.hasError ||
    phoneNumberEl.value.hasError
  ) {
    return;
  }
  withdrawalMethodeStore.createWithdrawalMethode()
};
</script>
src/stores/user/withdrawalMethodeStore
