<template>
  <div>
<!-- location filter dialog -->
    <locationFilterDialog />
<!-- service category filter dialog -->
    <serviceCategoryFilterDialog />
  </div>
</template>
<script setup>
// location filter dialog
import locationFilterDialog from "src/components/dialogs/location/locationFilterDialog.vue";
import serviceCategoryFilterDialog from "src/components/dialogs/serviceCategorys/serviceCategoryFilterDialog.vue";
</script>
