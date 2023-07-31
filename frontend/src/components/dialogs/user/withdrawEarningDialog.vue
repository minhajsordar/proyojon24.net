<template>
  <q-dialog
    v-model="earningStore.openWithdrawDialog"
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
        <q-card class="border-primary q-pa-md" style="width: 300px">
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <div class="row">
                <div class="col-12">
                  <div class="text-bold">
                    {{ $t('bankAccountName') }}
                  </div>
                  <q-select
                    ref="bankAccountNameEl"
                    v-model="earningStore.withdrawMethode"
                    outlined
                    :options="withdrawalMethodeStore.myWithdrawalMethodeList"
                    dense
                    :rules="[requiredSelector]"
                    :option-label="(item) => item === null ? 'Null value' : item.mobileBankName"
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row justify-end">
                <q-btn :label="$t('confirm')" color="primary"
              glossy @click="confirmWithdraw"/>
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
import { useEarningStore } from "src/stores/user/earningStore";

const earningStore = useEarningStore();
const withdrawalMethodeStore = useWithdrawalMethodeStore();

const bankAccountNameEl = ref(null);

const confirmWithdraw = () => {
  bankAccountNameEl.value.validate();
  if (
    bankAccountNameEl.value.hasError
  ) {
    return;
  }
  earningStore.withdrawAmount()
};
</script>
