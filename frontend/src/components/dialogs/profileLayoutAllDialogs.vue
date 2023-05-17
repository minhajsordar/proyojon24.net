<template>
  <div>
    <createDivisionDialog/>
    <createDistrictDialog/>
    <createSubDistrictDialog/>
    <createUnionDialog/>
    <createWardDialog/>
  </div>
</template>
<script setup>
import createDivisionDialog from 'src/components/dialogs/division/createDivisionDialog.vue'
import createDistrictDialog from 'src/components/dialogs/district/createDistrictDialog.vue';
import createSubDistrictDialog from 'src/components/dialogs/subdistrict/createSubDistrictDialog.vue';
import createUnionDialog from 'src/components/dialogs/union/createUnionDialog.vue';
import createWardDialog from 'src/components/dialogs/ward/createWardDialog.vue';

</script>
