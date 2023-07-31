<template>
  <q-card class="q-pa-md"><canvas id="dailyuser"></canvas></q-card>
</template>
<script setup>
import { onMounted, watch } from "vue";
import Chart from "chart.js/auto";
import { useDataAnalysisStore } from "src/stores/dashboard/dataAnalysisStore.js";
import { storeToRefs } from "pinia";
const dataAnalysisStore = useDataAnalysisStore();
const { dataAnalysisGraph } = storeToRefs(dataAnalysisStore);
onMounted(() => {
  // const labels = Utils.months({ count: 7 });
});

watch(dataAnalysisGraph,()=>{
  let ctx = document.getElementById("dailyuser");
  let labels = dataAnalysisGraph.value.dailyUsers.map(e=>e.date.split("T")[0])
  let usercount = dataAnalysisGraph.value.dailyUsers.map(e=>e.userCount)
  let data = {
    labels: labels,
    datasets: [
      {
        axis: "y",
        label: "New user last 30 days",
        data: usercount,
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
      },
    ],
  };
  new Chart(ctx, {
    type: "line",
    data,
    options: {
      indexAxis: "x",
    },
  });
})
</script>
<style></style>
