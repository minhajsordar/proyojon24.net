<template>
  <div class="row">
    <div class="col-12">
      <div class="text-bold">
        {{ $t("bankAccountName") }}
      </div>
      <q-select
        ref="bankAccountNameEl"
        v-model="paymentStore.paymentInfo.bankAccountName"
        outlined
        :options="['bKash 01956853831 (personal)', 'Dutch Bangla', 'Nagad']"
        dense
        :rules="[required]"
      />
    </div>
    <div class="col-12">
      <div class="text-bold">
        {{ $t("phoneNumber") }}
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
        {{ $t("transactionId") }}
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
        {{ $t("amount") }}
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
</template>
<script setup>

</script>
