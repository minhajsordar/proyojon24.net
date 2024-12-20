<template>
  <div class="container-section-py-sm" @keypress.enter="registerManager">
    <div class="inner-section">
      <div class="full-width">
        <div class="flex justify-between items-center">
          <div class="fs-24">{{ $t("create_new_account") }}</div>
          <div>
            {{ $t("already_have_account") }}?
            <router-link to="/login">{{ $t("signin") }}</router-link>
            {{ $t('or') }}
            <router-link to="/how_to_register">{{ $t("headermenus.how_to_register") }}</router-link>
          </div>
        </div>
        <q-card class="q-pa-md q-mt-md">
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-sm-6 col-xs-12 col-12">
                <q-select
                  label="Account For"
                  v-model="accountFor"
                  stack-label
                  outlined
                  dense
                  :options="['Own', 'Other']"
                />
              </div>
              <div class="col-sm-6 col-xs-12 col-12">
                <q-input
                  label="Reference"
                  v-model="registerStore.newUserInfo.reference"
                  stack-label
                  outlined
                  :disable="accountFor == 'Own'"
                  dense
                />
              </div>
              <div class="col-sm-6 col-xs-12 col-12">
                <div class="row q-col-gutter-xs">
                  <div class="col-12">
                    <q-input
                      ref="usernameEl"
                      v-model="registerStore.newUserInfo.username"
                      :label="$t('username')"
                      stack-label
                      outlined
                      dense
                      :rules="[required]"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      ref="emailEl"
                      v-model="registerStore.newUserInfo.email"
                      :label="$t('email')"
                      type="email"
                      stack-label
                      outlined
                      dense
                      :rules="[required, isEmail]"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      ref="passwordEl"
                      v-model="registerStore.newUserInfo.password"
                      :label="$t('password')"
                      stack-label
                      outlined
                      dense
                      :type="isPwd ? 'password' : 'text'"
                      :rules="[required]"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12">
                    <q-input
                      ref="confirmPasswordEl"
                      v-model="registerStore.newUserInfo.password2"
                      :label="$t('confirm_password')"
                      stack-label
                      outlined
                      dense
                      :rules="[required, registerStore.matchPassword]"
                      :type="isPwdC ? 'password' : 'text'"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwdC ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwdC = !isPwdC"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xs-12 col-12">
                <div class="row q-col-gutter-xs">
                  <div class="col-12">
                    <q-select
                      ref="accountTypeEl"
                      v-model="registerStore.newUserInfo.accountType"
                      :label="$t('accountType')"
                      stack-label
                      :options="['personal', 'company']"
                      outlined
                      dense
                      :rules="[requiredSelector]"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      ref="phoneEl"
                      v-model="registerStore.newUserInfo.phone"
                      :label="$t('phone')"
                      stack-label
                      outlined
                      dense
                      :rules="[mobileNoBd]"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      ref="fullnameBnEl"
                      v-model="registerStore.newUserInfo.name.bn"
                      :label="$t('full_name_bangla')"
                      stack-label
                      outlined
                      dense
                      :rules="[required]"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      ref="fullnameEnEl"
                      v-model="registerStore.newUserInfo.name.en"
                      :label="$t('full_name_english')"
                      stack-label
                      outlined
                      dense
                      :rules="[required]"
                    />
                  </div>
                </div>
              </div>
                  <div class="full-width">
                    <q-btn
                      @click="registerManager"
                      class="full-width bg-primary text-white btn-h-39"
                      label="Sign up"
                      stack-label
                      outlined
                      dense
                    />
                  </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
  <otpInputRegistrationDialog/>
</template>
<script setup>
import { ref, onMounted } from "vue";
import {
  required,
  isEmail,
  mobileNoBd,
  fileValidate,
  requiredSelector,
} from "src/global_js/utils";
import { useRegisterStore } from "src/stores/auth/registerStore";
import { useRoute, useRouter } from "vue-router";
import { useOtpVerificationStore } from "src/stores/auth/verifyPhone";
import otpInputRegistrationDialog from "src/components/dialogs/otpInput/otpInputRegistrationDialog.vue"
const accountFor = ref("Own");
const isPwd = ref(true);
const isPwdC = ref(true);
const router = useRouter();
const route = useRoute();
const registerStore = useRegisterStore();
const otpVerificationStore = useOtpVerificationStore();
const usernameEl = ref(null);
const emailEl = ref(null);
const passwordEl = ref(null);
const confirmPasswordEl = ref(null);
const phoneEl = ref(null);
const fullnameBnEl = ref(null);
const fullnameEnEl = ref(null);
const bankAccountNameEl = ref(null);
const phoneNumberEl = ref(null);
const transactionIdEl = ref(null);
const amountEl = ref(null);

const registerManager = () => {
  usernameEl.value.validate();
  emailEl.value.validate();
  passwordEl.value.validate();
  confirmPasswordEl.value.validate();
  phoneEl.value.validate();
  fullnameBnEl.value.validate();
  fullnameEnEl.value.validate();

  if (
    usernameEl.value.hasError ||
    emailEl.value.hasError ||
    passwordEl.value.hasError ||
    confirmPasswordEl.value.hasError ||
    phoneEl.value.hasError ||
    fullnameBnEl.value.hasError ||
    fullnameEnEl.value.hasError
  ) {
    return;
  }
  router.push({
    query: {
      namebn: registerStore.newUserInfo.name.bn,
      nameen: registerStore.newUserInfo.name.en,
      username: registerStore.newUserInfo.username,
      email: registerStore.newUserInfo.email,
      phone: registerStore.newUserInfo.phone,
    },
  });
  // at first verify phone number, check that the phone number is valid then verify that phone number
  // finally call register user api
  // otpVerificationStore.getOtpVerificationCodeWhileRegistration()
  registerStore.registerNewUser()
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
  if (route.query.nid) {
    registerStore.newUserInfo.nid = route.query.nid;
  }
});
</script>
