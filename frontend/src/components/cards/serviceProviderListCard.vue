<template lang="">
  <div class="relative-position">
    <div class="gradient-bg-medium"></div>
    <q-card class="full-width cursor-pointer">
      <div class="listcard-cont">
        <!-- <q-badge v-if="serviceProvider.viewCount" class="view-badge-top-right" color="pink"> <q-icon name="visibility"/> {{serviceProvider.viewCount}}</q-badge> -->
        <q-card-section class="image-section q-pa-sm">
          <q-img :src="web_root_url + serviceProvider.image" />
        </q-card-section>
        <q-card-section class="description-section q-pa-sm">
          <div class="text-bold text-blue-8" v-if="register">
            {{ serviceProvider.name[languageStore.language] }}
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <div class="text-bold text-blue-8" v-if="!register">
                {{ serviceProvider.name[languageStore.language] }}
              </div>
              <!-- <q-separator/> -->
              <div class="text-bold">
                <span>{{
                  serviceProvider.serviceTitle[languageStore.language]
                }}</span>
              </div>
              <div class="text-bold">
                {{ $t('experience')}}
                <span>{{
                  serviceProvider.experience
                }}</span>
              </div>
            </div>
            <div class="col-6">
              <div class="flex justify-end text-bold fs-12" v-if="!register">
                <div
                  v-if="serviceProvider.user?.isAvailable"
                  class="text-green"
                >
                  {{ $t("available") }}
                </div>
                <div v-else class="text-red">{{ $t("not_available") }}</div>
                <div
                  v-if="serviceProvider.user?.nidVerified"
                  class="text-green"
                >
                  <q-icon style="margin-bottom: 3px" name="badge" />
                  {{ $t("nid_verified") }}
                </div>
                <div v-else class="text-red">
                  <q-icon style="margin-bottom: 3px" name="badge" />
                  {{ $t("nid_not_verified") }}
                </div>
              </div>
            </div>
          </div>
          <!-- <q-separator/> -->
          <!-- <div class="text-blue-grey-10">
            <span>{{$t('mobile')}}: <q-icon class="bg-primary text-white" name="call"/> {{enToBnToEn('০১', languageStore.language)}}xxxxxxxxx</span>
          </div> -->
          <!-- <q-separator/> -->

          <!-- <div v-if="serviceProvider.user?._id" class="text-bold">
            {{ $t("joined_date") }}:
            {{
              enToBnToEn(
                date.formatDate(
                  serviceProvider?.user?.createdAt,
                  "YYYY-MM-DD HH:mm:ss"
                ),
                languageStore.language
              )
            }}, {{ $t("registration_no") }}:
            <span v-if="serviceProvider?.user?.registrationNo"
              >{{
                "000000000".slice(
                  0,
                  9 - serviceProvider?.user?.registrationNo.toString().length
                ) + serviceProvider?.user?.registrationNo.toString()
              }}
            </span>
          </div> -->
          <div class="fs-12 text-bold">
            <q-icon class="bg-primary text-white" name="location_on" />
            <span
              v-if="
                serviceProvider.serviceProviderLocation?.division?.name[
                  languageStore.language
                ]
              "
            >
              {{
                " " +
                serviceProvider.serviceProviderLocation?.division?.name[
                  languageStore.language
                ]
              }}
            </span>
            <span
              v-if="
                serviceProvider.serviceProviderLocation?.district?.name[
                  languageStore.language
                ]
              "
              >,
              {{
                serviceProvider.serviceProviderLocation?.district?.name[
                  languageStore.language
                ]
              }}
            </span>
            <span
              v-if="
                serviceProvider.serviceProviderLocation?.subDistrict?.name[
                  languageStore.language
                ]
              "
              >,
              {{
                serviceProvider.serviceProviderLocation?.subDistrict?.name[
                  languageStore.language
                ]
              }}
            </span>
            <span
              v-if="
                serviceProvider.serviceProviderLocation?.union?.name[
                  languageStore.language
                ]
              "
              >,
              {{
                serviceProvider.serviceProviderLocation?.union?.name[
                  languageStore.language
                ]
              }}</span
            >
            <span v-if="serviceProvider.serviceProviderLocation?.exact"
              >,
              {{
                serviceProvider.serviceProviderLocation?.exact[
                  languageStore.language
                ]
              }}</span
            >
          </div>
          <q-separator class="q-my-xs" />
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-btn
                :ripple="false"
                class="full-width text-bold text-purple-6 border-purple-6"
                :label="
                  $t('view') +
                  ' ' +
                  (serviceProvider?.viewCount ? serviceProvider.viewCount : '0')
                "
                size="sm"
              />
            </div>
            <div class="col-6">
              <q-btn
                class="full-width text-bold text-white bg-primary"
                :label="register ? $t('headermenus.register') : $t('details')"
                size="sm"
                @click="
                  () => {
                    if (register) {
                      $router.push('/register');
                    } else {
                      $router.push('/service_provider/' + serviceProvider._id);
                    }
                  }
                "
              />
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>
<script setup>
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { web_root_url } from "src/global_constant/root_url";
import { enToBnToEn } from "src/global_js/utils.js";
import { date } from "quasar";
defineProps({
  serviceProvider: {
    type: Object,
    default: null,
  },
  register: {
    type: Boolean,
    default: false,
  },
});
const languageStore = useLanguageStore();
</script>
<style lang="scss"></style>
