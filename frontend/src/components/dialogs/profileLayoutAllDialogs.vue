<template>
  <div>
    <!-- create location dialog -->
    <createDivisionDialog/>
    <createDistrictDialog/>
    <createSubDistrictDialog/>
    <createUnionDialog/>
    <createWardDialog/>
    <createServiceDialog/>
    <!-- edit location dialog -->
    <editDivisionDialog/>
    <editDistrictDialog/>
    <editSubDistrictDialog/>
    <editUnionDialog/>
    <editWardDialog/>
    <editServiceDialog/>
  </div>
</template>
<script setup>
// create location dialog
import createDivisionDialog from 'src/components/dialogs/division/createDivisionDialog.vue'
import createDistrictDialog from 'src/components/dialogs/district/createDistrictDialog.vue';
import createSubDistrictDialog from 'src/components/dialogs/subdistrict/createSubDistrictDialog.vue';
import createUnionDialog from 'src/components/dialogs/union/createUnionDialog.vue';
import createWardDialog from 'src/components/dialogs/ward/createWardDialog.vue';
import createServiceDialog from './services/createServiceDialog.vue';
// edit location dialog
import editDivisionDialog from 'src/components/dialogs/division/editDivisionDialog.vue'
import editDistrictDialog from 'src/components/dialogs/district/editDistrictDialog.vue';
import editSubDistrictDialog from 'src/components/dialogs/subdistrict/editSubDistrictDialog.vue';
import editUnionDialog from 'src/components/dialogs/union/editUnionDialog.vue';
import editWardDialog from 'src/components/dialogs/ward/editWardDialog.vue';
import editServiceDialog from './services/editServiceDialog.vue';

</script>
