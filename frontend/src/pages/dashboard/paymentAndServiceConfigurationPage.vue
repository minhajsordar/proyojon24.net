<template>
  <div class="container-section-py-xs">
    <div class="inner-section">
      <div class="full-width">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-card class="border-primary">
              <q-card-section>
                <div>
                  <div class="fs-18 q-mb-sm">
                    Create New Registration Fee Methode
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-lg-4 col-6">
                      <q-input
                      v-model="registrationFeeStore.registrationFeeInfo.amount"
                      ref="regFeeAmountEl"
                      :label="'Amount' +  $currency_sign"
                      outlined
                      dense
                      :rules="[required]"
                      />
                    </div>
                    <div class="col-lg-4 col-6">
                      <q-input
                      v-model="registrationFeeStore.registrationFeeInfo.employeeCount"
                        ref="employeeCountEl"
                        label="Employee Count"
                        outlined
                        dense
                        :rules="[required]"
                      />
                    </div>
                    <div class="col-lg-4 col-12">
                      <q-btn
                        class="btn-h-39 full-width"
                        label="Create"
                        color="primary"
                        @click="createRegistrationFeeManager"
                      />
                    </div>
                  </div>
                </div>
                <registrationFeeMethodeList />
                <div>
                  <div class="fs-18 q-my-sm">
                    Create New Monthly Fee Methode
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-lg-4 col-6">
                      <q-input
                      v-model="monthlyFeeStore.monthlyFeeInfo.amount"
                        ref="monthlyFeeAmountEl"
                        label="Amount"
                        outlined
                        dense
                        :rules="[required]"
                      />
                    </div>
                    <div class="col-lg-4 col-6">
                      <q-input
                      v-model="monthlyFeeStore.monthlyFeeInfo.employeeCount"
                        ref="monthlyEmployeeCountEl"
                        label="Employee Count"
                        outlined
                        dense
                        :rules="[required]"
                      />
                    </div>
                    <div class="col-lg-4 col-12">
                      <q-btn
                        class="btn-h-39 full-width"
                        label="Create"
                        color="primary"
                        @click="createMonthlyFeeManager"
                      />
                    </div>
                  </div>
                </div>
                <monthlyFeeMethodeList />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { required } from "src/global_js/utils";
import monthlyFeeMethodeList from "src/components/dashboard/monthlyFeeMethodeList.vue";
import registrationFeeMethodeList from "src/components/dashboard/registrationFeeMethodeList.vue";
import { useRegistrationFeeStore } from "src/stores/dashboard/registrationFeeStore.js";
import { useMonthlyFeeStore } from "src/stores/dashboard/monthlyFeeStore.js";
const registrationFeeStore = useRegistrationFeeStore();
registrationFeeStore.getRegistrationFeeList();
const monthlyFeeStore = useMonthlyFeeStore();
monthlyFeeStore.getMonthlyFeeList();

const regFeeAmountEl = ref(null),
  employeeCountEl = ref(null),
  monthlyFeeAmountEl = ref(null),
  monthlyEmployeeCountEl = ref(null);
const createMonthlyFeeManager = () => {
  monthlyFeeAmountEl.value.validate();
  monthlyEmployeeCountEl.value.validate();
  if (
    monthlyFeeAmountEl.value.hasError ||
    monthlyEmployeeCountEl.value.hasError
  ) {
    return
  }
  monthlyFeeStore.createMonthlyFee();
};
const createRegistrationFeeManager = () => {
  regFeeAmountEl.value.validate();
  employeeCountEl.value.validate();
  if (
    regFeeAmountEl.value.hasError ||
    employeeCountEl.value.hasError
  ) {
    return
  }
  registrationFeeStore.createRegistrationFee();
};
</script>
<style></style>
