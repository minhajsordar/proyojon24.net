<template>
  <q-card class="q-pa-md"><canvas id="monthlyuser"></canvas></q-card>
</template>
<script setup>
import { onMounted, watch } from "vue";
import Chart from "chart.js/auto";
import { useDataAnalysisStore } from "src/stores/dashboard/dataAnalysisStore.js";
import { storeToRefs } from "pinia";
const dataAnalysisStore = useDataAnalysisStore();
const { dataAnalysisGraph } = storeToRefs(dataAnalysisStore);

watch(dataAnalysisGraph, () => {
  let ctx = document.getElementById("monthlyuser");
  console.log("Graph loaded", dataAnalysisGraph.value);
  let labels = dataAnalysisGraph.value.monthlyUsers.map(
    (e) => e.createdAt.split("T")[0]
  );
  let usercount = dataAnalysisGraph.value.monthlyUsers.map((e) => e.userCount);
  let data = {
    labels: labels,
    datasets: [
      {
        axis: "y",
        label: "New user last 12 months",
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
    type: "bar",
    data,
    options: {
      indexAxis: "x",
    },
  });
});
</script>
<style></style>
