<template>
  <div class="container-section-py-xs">
    <div class="inner-section">
      <div class="full-width">
        <div class="row q-col-gutter-md flex-wrap">
          <div class="col-md-4 col-sm-6 col-6">
            <q-card class="bg-blue-7 text-white">
              <q-card-section>
                <div class="q-card-section-title">
                  <q-icon name="visibility" class="text-h4" />
                  <div class="q-mt-md fs-18">Total View</div>
                  <q-separator class="q-my-md" />
                  <div class="text-h4">{{ $convertNumberIntoDecimal(dashboardStore.dashboardData?.totalView) }}</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-4 col-sm-6 col-6">
            <q-card class="bg-blue-grey-7 text-white">
              <q-card-section>
                <div class="q-card-section-title">
                  <q-icon name="person" class="text-h4" />
                  <div class="q-mt-md fs-18">Total User</div>
                  <q-separator class="q-my-md" />
                  <div class="text-h4">{{ $convertNumberIntoDecimal(dashboardStore.dashboardData?.totalUser) }}</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-4 col-sm-6 col-6">
            <q-card class="bg-golden-gradient text-white">
              <q-card-section>
                <div class="q-card-section-title">
                  <q-icon name="workspace_premium" class="text-h4" />
                  <div class="q-mt-md fs-18">Total Premium User</div>
                  <q-separator class="q-my-md" />
                  <div class="text-h4">{{ $convertNumberIntoDecimal(dataAnalysisGraph?.paidRegistration) }}</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="q-mt-md">
          <div class="row q-col-gutter-md flex-wrap">
            <div class="col-md-6 col-sm-12 col-12">
              <dailyUserChart />
            </div>
            <div class="col-md-6 col-sm-12 col-12">
              <monthlyUserChart />
            </div>
            <div class="col-md-6 col-sm-12 col-12">
              <monthlyViewChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import dailyUserChart from "src/components/dashboard/dailyUserChart.vue";
import monthlyUserChart from "src/components/dashboard/monthlyUserChart.vue";
import monthlyViewChart from "src/components/dashboard/monthlyViewChart.vue";
import { useDataAnalysisStore } from "src/stores/dashboard/dataAnalysisStore.js"

import { usePublicDashboardStore } from "src/stores/user/dashboardStore";

const dashboardStore = usePublicDashboardStore();
// get dashboard data
dashboardStore.getDashboardData();
const dataAnalysisStore = useDataAnalysisStore()
dataAnalysisStore.getDataAnalysisGraph()
const { dataAnalysisGraph } = storeToRefs(dataAnalysisStore);
</script>
<style></style>
