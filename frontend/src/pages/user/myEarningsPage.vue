<template >
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <div class="row q-col-gutter-md flex-wrap">
          <div class="col-md-4 col-sm-12 col-12">
            <q-card class="text-black">
              <q-card-section>
                <div class="q-card-section-title">
                  <!-- <q-icon name="visibility" class="text-h4" /> -->
                  <div class="q-mt-md fs-18">Available Balance</div>
                  <div class="text-h3 text-bold">
                    {{ $convertNumberIntoDecimal(earningStore.myEarningList?.myEarningSummary?.balance) }}
                  </div>
                  <div class="q-mt-md">
                    <q-btn label="withdraw" color="grey-8"
                    @click="earningStore.openWithdrawDialogManager"
                    />
                    <!-- :disable="earningStore.myEarningList?.myEarningSummary?.balance < 99" -->
                    <div class="q-mt-sm" v-if="earningStore.myEarningList?.myEarningSummary?.balance < 99">Minimum Withdrawal Balance is 100{{ $currency_sign }}</div>
                  </div>
                  <div class="q-mt-sm">
                    <router-link to="/my_withdrawal_methodes"
                      >Manage Withdrawal Methode</router-link
                    >
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-4 col-sm-6 col-6">
            <q-card class="text-black full-height">
              <q-card-section>
                <div class="q-card-section-title">
                  <!-- <q-icon name="person" class="text-h4" /> -->
                  <div class="q-mt-md fs-18">Total Pending</div>
                  <div class="text-h4 text-bold">
                    {{ $convertNumberIntoDecimal(earningStore.myEarningList?.myEarningSummary?.pending) }}
                  </div>
                  <q-separator class="q-my-md" />
                  <div>Earnings being cleared.</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-4 col-sm-6 col-6">
            <q-card class="text-black full-height">
              <q-card-section>
                <div class="q-card-section-title">
                  <!-- <q-icon name="workspace_premium" class="text-h4" /> -->
                  <div class="q-mt-md fs-18">Total Earnings</div>
                  <div class="text-h4 text-bold">
                    {{ $convertNumberIntoDecimal(earningStore.myEarningList?.myEarningSummary?.balance + earningStore.myEarningList?.myEarningSummary?.withdrawan) }}
                  </div>
                  <q-separator class="q-my-md" />
                  <div>Your earnings since joining.</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="q-mt-md">
          <q-card class="q-pa-md">
            <div>
              <div class="fs-18">{{ $t("earning_list") }}</div>
              <q-separator class="q-my-sm" />
              <q-markup-table flat bordered separator="cell" class="text-left">
                <thead class="bg-blue-grey-2">
                  <tr>
                    <th>{{ $t("date") }}</th>
                    <th>{{ $t("activity") }}</th>
                    <th>{{ $t("description") }}</th>
                    <th>{{ $t("registration_no") }}</th>
                    <th>{{ $t("amount") }}</th>
                    <th>{{ $t("status") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(earning, index) in earningStore.myEarningList?.myEarnings"
                    :key="index"
                    :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
                  >
                    <td>{{ earning.createdAt }}</td>
                    <td>{{earning.activity}}</td>
                    <td>{{earning.description}}</td>
                    <td>{{earning.reference?.registrationNo}}</td>
                    <td class="text-bold" :class="[earning.amount < 0 ?'text-red':'text-green' ]">{{earning.amount}} {{ $currency_sign }}</td>
                    <td>{{earning.status}}</td>
                  </tr>
                </tbody>
              </q-markup-table>
              <q-separator class="q-mt-md" />
              <q-pagination
                class="q-mt-md"
                color="blue-grey-7"
                v-model="earningStore.currentPage"
                :max="earningStore.myEarningList?.pages"
                :max-pages="6"
                boundary-numbers
                @update:model-value="paginationFunc"
              />
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
  <withdrawEarningDialog/>
</template>
<script setup>
import withdrawEarningDialog from "src/components/dialogs/user/withdrawEarningDialog.vue";
import { useWithdrawalMethodeStore } from "src/stores/user/withdrawalMethodeStore";
import { useEarningStore } from "src/stores/user/earningStore";

const earningStore = useEarningStore();
earningStore.getMyEarningList();

const withdrawalMethodeStore = useWithdrawalMethodeStore();
withdrawalMethodeStore.getMyWithdrawalMethodeList();

const paginationFunc = () => {
  earningStore.getMyEarningList();
};
</script>
<style></style>
