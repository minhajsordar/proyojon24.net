<template lang="">
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
                    {{ $convertNumberIntoDecimal(100) }}
                  </div>
                  <div class="q-mt-md">
                    <q-btn label="withdraw" color="grey-8"/>
                  </div>
                  <div class="q-mt-sm">
                    <router-link to="/my_withdrawal_methodes">Manage Withdrawal Methode</router-link>
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
                    {{ $convertNumberIntoDecimal(100) }}
                  </div>
                  <q-separator class="q-my-md" />
                  <div>
                    Earnings being cleared.
                  </div>
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
                    {{ $convertNumberIntoDecimal(100) }}
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
                    v-for="(user, index) in 4"
                    :key="index"
                    :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
                  >
                    <td>4/5/2022</td>
                    <td>earning/ Withdrawn</td>
                    <td>Premium</td>
                    <td>345</td>
                    <td>100 taka</td>
                    <td>Pending / Approved</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>
<style lang=""></style>
