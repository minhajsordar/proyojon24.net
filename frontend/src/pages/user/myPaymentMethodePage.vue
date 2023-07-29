<template lang="">
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <div class="flex q-gutter-sm">
          <q-btn
            v-if="!withdrawalMethodeStore.existingBankAccount.bkash"
            class="text-normal"
            label="Register for Bkash (personal)"
            color="pink-6"
            @click="withdrawalMethodeStore.withdrawalMethodeDialogManagerBkash"
          />
          <q-btn
            v-else
            class="text-normal"
            label="Bkash (personal)"
            color="pink-6"
          />
          <q-btn
            v-if="!withdrawalMethodeStore.existingBankAccount.rocket"
            class="text-normal"
            label="Register for Rocket (personal)"
            color="deep-purple-7"
            @click="withdrawalMethodeStore.withdrawalMethodeDialogManagerRocket"
          />
          <q-btn
            v-else
            class="text-normal"
            label="Rocket (personal)"
            color="deep-purple-7"
          />
          <q-btn
            v-if="!withdrawalMethodeStore.existingBankAccount.nagad"
            class="text-normal"
            label="Register for Nagad (personal)"
            color="deep-orange-6"
            @click="withdrawalMethodeStore.withdrawalMethodeDialogManagerNagad"
          />
          <q-btn
            v-else
            class="text-normal"
            label="Nagad (personal)"
            color="deep-orange-6"
          />
        </div>
        <div class="q-mt-md">
          <q-card class="q-pa-md">
            <div>
              <div class="fs-18">{{ $t("payment_methode_list") }}</div>
              <q-separator class="q-my-sm" />
              <q-markup-table flat bordered separator="cell" class="text-left">
                <thead class="bg-blue-grey-2">
                  <tr>
                    <th>{{ $t("AccoountPhoneNumber") }}</th>
                    <th>{{ $t("bankAccountName") }}</th>
                    <th>{{ $t("status") }}</th>
                    <th>{{ $t("action") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      withdrawalMethode, index
                    ) in withdrawalMethodeStore.myWithdrawalMethodeList"
                    :key="index"
                    :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
                  >
                    <td>{{ withdrawalMethode.phone }}</td>
                    <td>{{ withdrawalMethode.mobileBankName }}</td>
                    <td>
                      <span v-if="withdrawalMethode.pendingForRemove">Pending for remove</span>
                      <span v-if="withdrawalMethode.pendingForVerification">Pending for verification</span>
                      <span v-if="withdrawalMethode.verified">Active</span>
                    </td>
                    <td>
                      <q-btn
                        label="Remove"
                        color="red"
                        @click="confirmDelete(withdrawalMethode._id)"
                        :disabled="withdrawalMethode.pendingForRemove"
                      />
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
  <addWithdrawalMethodeDialog />
</template>
<script setup>
import { useQuasar } from "quasar";
import addWithdrawalMethodeDialog from "src/components/dialogs/user/addWithdrawalMethodeDialog.vue";
import { useWithdrawalMethodeStore } from "src/stores/user/withdrawalMethodeStore";
import { useI18n } from "vue-i18n";
const withdrawalMethodeStore = useWithdrawalMethodeStore();
withdrawalMethodeStore.getMyWithdrawalMethodeList();
const $q = useQuasar();
const {t} = useI18n()
const confirmDelete = (id) => {
  $q.dialog({
    title: t("confirm"),
    message: "Are you sure to remove this payment mathode?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    withdrawalMethodeStore.deleteWithdrawalMethode(id);
    console.log(">>>> OK");
  });
};
</script>
<style lang=""></style>
