<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <q-card class="border-primary q-pa-md">
          <div class="flex">
            <q-input
              v-model="ourBusinessPartners.ourBusinessPartnerSectionTitle"
              dense
              outlined
            />
            <q-btn
              label="Update"
              color="primary"
              dense
              @click="
                ourBusinessPartners.createAndUpdateOurBusinessPartnerTitle
              "
            />
          </div>
        </q-card>

        <q-card class="border-primary q-pa-md q-mt-lg">
          <div class="flex justify-between">
            <div class="fs-18">{{ $t("partners.partners_list") }}</div>
            <q-btn
              class="btn-h-22"
              color="positive"
              :label="$t('addnew')"
              icon="add"
              dense
              glossy
              size="sm"
              @click="ourBusinessPartners.openBusinessPartnersAddManager"
            />
          </div>
          <div class="q-mt-sm">
            <q-markup-table flat bordered separator="cell" class="text-left">
              <thead class="bg-blue-grey-2">
                <tr>
                  <th>{{ $t("serial") }}</th>
                  <th>{{ $t("name") }}</th>
                  <th>{{ $t("subtitle") }}</th>
                  <th>{{ $t("image") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(partner, index) in ourBusinessPartners
                    .ourBusinessPartnersData?.ourBusinessPartners"
                  :key="index"
                  :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
                >
                  <td>
                    {{ index }}
                  </td>
                  <td>{{ partner.name }}</td>
                  <td>{{ partner.subTitle }}</td>
                  <td>
                    <q-img
                      style="width: 70px"
                      :src="web_root_url + partner.image"
                    />
                  </td>
                  <td>
                    <q-btn
                      :label="$t('update')"
                      color="positive"
                      @click="
                        ourBusinessPartners.openBusinessPartnersUpdateManager(
                          partner
                        )
                      "
                    />
                    <q-btn
                      class="q-ml-xs"
                      :label="$t('delete')"
                      color="negative"
                      @click="deletePartner(partner._id)"
                    />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
            <q-separator class="q-mt-md" />
            <q-pagination
              class="q-mt-md"
              color="blue-grey-7"
              v-model="ourBusinessPartners.currentPage"
              :max="ourBusinessPartners.ourBusinessPartnersData?.pages"
              :max-pages="6"
              boundary-numbers
              @update:model-value="paginationFunc"
            />
          </div>
        </q-card>
      </div>
    </div>
  </div>
  <addBusinessPartner />
  <updateBusinessPartner />
</template>
<script setup>
import addBusinessPartner from "src/components/dialogs/dashboard/addBusinessPartner.vue";
import updateBusinessPartner from "src/components/dialogs/dashboard/updateBusinessPartner.vue";
import { date, useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useOurBusinessPartnersStore } from "src/stores/dashboard/ourBusinessPartnersStore";
import { web_root_url } from "src/global_constant/root_url";
const ourBusinessPartners = useOurBusinessPartnersStore();
ourBusinessPartners.getourBusinessPartnersList();

// pagination
const paginationFunc = () => {
  ourBusinessPartners.getourBusinessPartnersList();
};
const $q = useQuasar();
const { t } = useI18n();
const deletePartner = (id) => {
  $q.dialog({
    title: t("delete"),
    message: "Are you sure to delete this?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    ourBusinessPartners.deleteOurBusinessPartners(id);
  });
};
</script>
<style></style>
