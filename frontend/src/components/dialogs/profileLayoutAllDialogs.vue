<template>
  <div>
    <!-- create location dialog -->
    <createDivisionDialog/>
    <createDistrictDialog/>
    <createSubDistrictDialog/>
    <createUnionDialog/>
    <createWardDialog/>
    <!-- edit location dialog -->
    <editDivisionDialog/>
    <editDistrictDialog/>
    <editSubDistrictDialog/>
    <editUnionDialog/>
    <editWardDialog/>
    <!-- create service  -->
    <createServiceDialog/>
    <!-- edit service  -->
    <editServiceDialog/>
    <!-- preview service  -->
    <previewServiceDialog/>
    <!-- create service  -->
    <createServiceCategoryDialog/>
    <!-- edit service  -->
    <editServiceCategoryDialog/>
    <!-- preview service  -->
    <previewServiceCategoryDialog/>
    <!-- create service  -->
    <createServiceProviderDialog/>
    <!-- edit service  -->
    <editServiceProviderDialog/>
    <!-- preview service  -->
    <previewServiceProviderDialog/>

<!-- location filter dialog -->
    <locationFilterDialog />
  </div>
</template>
<script setup>
// create location dialog
import createDivisionDialog from 'src/components/dialogs/division/createDivisionDialog.vue'
import createDistrictDialog from 'src/components/dialogs/district/createDistrictDialog.vue';
import createSubDistrictDialog from 'src/components/dialogs/subdistrict/createSubDistrictDialog.vue';
import createUnionDialog from 'src/components/dialogs/union/createUnionDialog.vue';
import createWardDialog from 'src/components/dialogs/ward/createWardDialog.vue';
// edit location dialog
import editDivisionDialog from 'src/components/dialogs/division/editDivisionDialog.vue'
import editDistrictDialog from 'src/components/dialogs/district/editDistrictDialog.vue';
import editSubDistrictDialog from 'src/components/dialogs/subdistrict/editSubDistrictDialog.vue';
import editUnionDialog from 'src/components/dialogs/union/editUnionDialog.vue';
import editWardDialog from 'src/components/dialogs/ward/editWardDialog.vue';
// service dialogs
import createServiceDialog from 'src/components/dialogs/services/createServiceDialog.vue';
import editServiceDialog from 'src/components/dialogs/services/editServiceDialog.vue';
import previewServiceDialog from 'src/components/dialogs/services/previewServiceDialog.vue';
// service category dialogs
import createServiceCategoryDialog from 'src/components/dialogs/serviceCategorys/createServiceCategoryDialog.vue';
import editServiceCategoryDialog from 'src/components/dialogs/serviceCategorys/editServiceCategoryDialog.vue';
import previewServiceCategoryDialog from 'src/components/dialogs/serviceCategorys/previewServiceCategoryDialog.vue';
// service category dialogs
import createServiceProviderDialog from './serviceProviders/createServiceProviderDialog.vue';
import editServiceProviderDialog from './serviceProviders/editServiceProviderDialog.vue';
import previewServiceProviderDialog from './serviceProviders/previewServiceProviderDialog.vue';

// location filter dialog
import locationFilterDialog from "src/components/dialogs/location/locationFilterDialog.vue";
</script>
