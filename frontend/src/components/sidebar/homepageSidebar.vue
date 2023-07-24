<template>
  <div>
    <div class="bg-primary text-white border-radius-sm q-px-sm q-py-xs fs-18">
      {{ $t("headermenus.services") }}
    </div>
    <q-card class="q-pa-xs">
      <div style="max-width: 250px">
        <q-list bordered>
          <div
            v-for="(service, index) in servicePublicStore?.allServices"
            :key="index"
          >
            <q-expansion-item
              group="somegroup"
              :label="
                service.name[languageStore.language] +
                ' (' +
                service.serviceProviderCount +
                ')'
              "
              header-class="text-black bg-blue-2"
            >
              <q-card>
                <q-list class="rounded-borders text-black">
                  <div
                    v-for="(category, index2) in service?.serviceCategorys"
                    :key="index2"
                  >
                    <!-- <q-btn
            class="text-black border-radius-sm q-pl-md q-py-xs fs-18 full-width"
          >
          </q-btn> -->
                    <q-item
                      :to="'/service_providers_list/' + category._id"
                      dense
                      class="bg-blue-grey-1 text-black q-py-md q-pl-lg"
                    >
                      <q-item-section
                        >{{ category.name[languageStore.language] }} ({{
                          category.serviceProviderCount
                        }})
                      </q-item-section>
                    </q-item>

                    <q-separator />
                  </div>
                </q-list>
              </q-card>
            </q-expansion-item>
            <q-separator />
          </div>
        </q-list>
      </div>
    </q-card>
  </div>
</template>
<script setup>
import { usePublicServiceStore } from "src/stores/service/publicServiceStore.js";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
const servicePublicStore = usePublicServiceStore();
const languageStore = useLanguageStore();
</script>
<style></style>
