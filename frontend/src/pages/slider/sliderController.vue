<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <div v-for="sliderindex in 4" :key="sliderindex">
          <div class="fs-16">Slider Images For Banner {{ sliderindex }}</div>
          <div class="row q-col-gutter-sm">
            <div
              class="col-md-6 col-sm-6 col-12"
              v-for="index in 10"
              :key="index"
            >
              <div class="fs-10">
                Banner {{ sliderindex }} image {{ index }}
              </div>
              <div
                v-if="
                  typeof publicSliderCUStore.sliderInfo[`slider${sliderindex}`][
                    index - 1
                  ] == 'string'
                "
                class="border-primary border-radius-sm q-pa-sm"
              >
              <q-img :src="web_root_url+'/'+publicSliderCUStore.sliderInfo[`slider${sliderindex}`][
                      index - 1
                    ]" width="300px"/>
                    <div class=" flex justify-between">

                      <div>
                        {{
                          publicSliderCUStore.sliderInfo[`slider${sliderindex}`][
                            index - 1
                          ]
                        }}
                      </div>
                      <q-btn
                        class="bg-red text-white"
                        dense
                        size="xs"
                        icon="edit"
                        @click="
                          publicSliderCUStore.sliderInfo[`slider${sliderindex}`][
                            index - 1
                          ] = null
                        "
                      />
                    </div>
              </div>
              <q-file
                v-else
                outlined
                ref="slider1Img1El"
                dense
                v-model="
                  publicSliderCUStore.sliderInfo[`slider${sliderindex}`][
                    index - 1
                  ]
                "
                label="Add image Max Size 150KB"
                accept=".jpg, .png, .jpeg"
                max-total-size="150000"
                counter
                @rejected="onRejected"
                @update:model-value="
                  () => {
                    publicSliderCUStore.uploadSliderImage(`slider${sliderindex}`, index - 1);
                  }
                "
              >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" /> </template
              ></q-file>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <q-btn v-if="!publicSliderCUStore.sliderInfo.id" label="Create" @click="publicSliderCUStore.createSliders"/>
          <q-btn v-else label="Update" @click="publicSliderCUStore.updateSlider"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Notify } from "quasar";
import { web_root_url } from "src/global_constant/root_url";
import { fileValidate } from "src/global_js/utils";
import { usePublicSliderCreateUpdateStore } from "src/stores/slider/sliderCreateUpdate";

const publicSliderCUStore = usePublicSliderCreateUpdateStore();
publicSliderCUStore.getSliderData()

const onRejected = (rejectedEntries) => {
  // Notify plugin needs to be installed
  // https://quasar.dev/quasar-plugins/notify#Installation
  Notify.create({
    position: "center",
    type: "negative",
    message: `Choosen file size too big`,
  });
};
</script>
