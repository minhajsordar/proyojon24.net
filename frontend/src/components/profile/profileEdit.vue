<template>
  <q-card class="q-pa-md border-primary">
    <div class="flex justify-between q-mb-md">
      <div class="fs-20 text-bold">Personal Details</div>
      <q-btn :label="$t('goback')" color="primary" @click="$router.back()" />
    </div>
    <div class="full-width">
      <q-separator />
    </div>

    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-sm-6 col-xs-12 col-12">
          <q-input
            v-model="registerStore.newUserInfo.username"
            label="Username"
            :placeholder="authStore.loginUserInfo?.username"
            stack-label
            outlined
            dense
            disable
          />
        </div>
        <div class="col-sm-6 col-xs-12 col-12">
          <q-input
            v-model="authStore.updateUserInfo.email"
            label="Email"
            :placeholder="authStore.loginUserInfo?.email"
            type="email"
            stack-label
            outlined
            dense
          />
        </div>
        <div class="col-sm-6 col-xs-12 col-12">
          <q-input
            v-model="authStore.updateUserInfo.password3"
            label="Password"
            type="password"
            stack-label
            outlined
            dense
          />
        </div>
        <div class="col-sm-6 col-xs-12 col-12">
          <q-input
            ref="confirmPassEl"
            v-model="authStore.updateUserInfo.password4"
            label="Confirm Password"
            type="password"
            stack-label
            outlined
            dense
            :rules="[checkMatchPassword]"
          />
        </div>
        <div class="col-sm-6 col-xs-12 col-12">
          <q-input
            v-model="authStore.updateUserInfo.nidNo"
            label="Nid No"
            :placeholder="authStore.loginUserInfo?.nidNo"
            stack-label
            outlined
            dense
          />
        </div>
        <div class="col-sm-6 col-xs-12 col-12">
          <q-file
            v-model="authStore.updateUserInfo.nidImage"
            label="Nid Image"
            stack-label
            outlined
            dense
            clearable
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" @click.stop.prevent />
            </template>
          </q-file>
        </div>
        <div class="col-sm-6 col-xs-12 col-12">
          <q-file
            v-model="authStore.updateUserInfo.profileImage"
            label="Profile Image"
            stack-label
            outlined
            dense
            clearable
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" @click.stop.prevent />
            </template>
          </q-file>
        </div>
        <div class="col-sm-6 col-xs-12 col-12">
          <q-input
            v-model="authStore.updateUserInfo.phone"
            label="Phone number"
            :placeholder="authStore.loginUserInfo?.phone"
            stack-label
            outlined
            dense
            :rules="[mobileNoBd]"
          />
        </div>
        <div class="col-sm-6 col-xs-12 col-12">
          <q-input
            v-model="authStore.updateUserInfo.name.bn"
            label="Full name In Bangla"
            :placeholder="authStore.loginUserInfo?.name.bn"
            stack-label
            outlined
            dense
          />
        </div>
        <div class="col-sm-6 col-xs-12 col-12">
          <q-input
            v-model="authStore.updateUserInfo.name.en"
            label="Full name In English"
            :placeholder="authStore.loginUserInfo?.name.en"
            stack-label
            outlined
            dense
          />
        </div>
        <div class="col-sm-6 col-xs-12 col-12">
          <q-input
            v-model="authStore.updateUserInfo.presentAddress.bn"
            label="Present Address Bangla"
            :placeholder="authStore.loginUserInfo?.presentAddress.bn"
            stack-label
            type="textarea"
            outlined
            dense
          />
        </div>
        <div class="col-sm-6 col-xs-12 col-12">
          <q-input
            v-model="authStore.updateUserInfo.presentAddress.en"
            label="Present Address English"
            :placeholder="authStore.loginUserInfo?.presentAddress.en"
            stack-label
            type="textarea"
            outlined
            dense
          />
        </div>
        <div class="col-sm-6 col-xs-12 col-12">
          <q-input
            v-model="authStore.updateUserInfo.permanentAddress.bn"
            label="Permanent Address Bangla"
            :placeholder="authStore.loginUserInfo?.permanentAddress.bn"
            stack-label
            type="textarea"
            outlined
            dense
          />
        </div>
        <div class="col-sm-6 col-xs-12 col-12">
          <q-input
            v-model="authStore.updateUserInfo.permanentAddress.en"
            label="Permanent Address English"
            :placeholder="authStore.loginUserInfo?.permanentAddress.en"
            stack-label
            type="textarea"
            outlined
            dense
          />
        </div>
        <div class="col-12">
          <q-btn
            @click="updateManager"
            class="full-width bg-primary text-white btn-h-39"
            :label="$t('update')"
            stack-label
            outlined
            dense
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { useAuthStore, loginUser } from "src/stores/auth/authStore";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";

import { ref, onMounted } from "vue";
import { required, isEmail, mobileNoBd } from "src/global_js/utils";
import { useRegisterStore } from "src/stores/auth/registerStore";
import { useRoute, useRouter } from "vue-router";
import { Notify } from "quasar";

const languageStore = useLanguageStore();
const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();
const registerStore = useRegisterStore();
const confirmPassEl = ref(null);
const updateManager = () => {
  confirmPassEl.value.validate();
  if (
    authStore.updateUserInfo.password3 !== authStore.updateUserInfo.password4
  ) {
    Notify.create({
      position: "center",
      type: "negative",
      message: `Password Not Matched`,
    });
    return;
  }
  authStore.updateUserProfile();
};

const checkMatchPassword = (val) => {
  if (authStore.updateUserInfo.password3 == val) {
    return true;
  } else {
    ("Password Not Matched");
  }
};

onMounted(() => {
  if (route.query.namebn) {
    registerStore.newUserInfo.name.bn = route.query.namebn;
  }
  if (route.query.nameen) {
    registerStore.newUserInfo.name.en = route.query.nameen;
  }
  if (route.query.email) {
    registerStore.newUserInfo.email = route.query.email;
  }
  if (route.query.username) {
    registerStore.newUserInfo.username = route.query.username;
  }
  if (route.query.phone) {
    registerStore.newUserInfo.phone = route.query.phone;
  }
});
</script>
