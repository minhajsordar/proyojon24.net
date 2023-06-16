<template>
  <q-dialog
    v-model="userStore.deleteRequestDialog"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="text-primary">
      <q-bar class="bg-primary text-white">
        <q-space />
        <q-btn dense glossy flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-card class="border-primary q-pa-md">
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <div class="row">
                <div class="col-lg-4 col-md-5 col-sm-12 col-12 fs-16 text-bold">
                  {{ $t('delete_user_note') }}
                </div>
                <div class="col-lg-8 col-md-7 col-sm-12 col-12">
                  <q-input
                    ref="deleteNoteEl"
                    v-model="userStore.deleteNote"
                    outlined
                    dense
                    type="textarea"
                    :rules="[required]"
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <q-btn :label="$t('confirm')" color="red"
              glossy @click="deleteRequestManager"/>
              </div>
            </div>
          </div>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";
import { required } from "src/global_js/utils";
import { useUserStore } from "src/stores/user/userStore.js";
const userStore = useUserStore();
const deleteNoteEl = ref(null);

const deleteRequestManager = () => {
  deleteNoteEl.value.validate();
  if (
    deleteNoteEl.value.hasError
  ) {
    return;
  }
  userStore.requestDeleteUserProfile()
};
</script>
