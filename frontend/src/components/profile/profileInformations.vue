<template>
  <q-card class="q-pa-md border-primary">
    <div class="flex justify-between q-mb-md">
      <div class="fs-20 text-bold">Profile Details</div>
      <div>
        <q-btn
          class="q-mr-sm"
          :label="$t('delete')"
          color="negative"
          @click="userStore.deleteRequestDialog = true"
        />
        <q-btn
          :label="$t('edit')"
          color="primary"
          @click="$router.push('/settings')"
        />
      </div>
    </div>
    <div class="full-width">
      <q-separator />
    </div>
    <div class="row q-mb-md q-mt-md">
      <div class="col-lg-4 col-sm-12 col-12">
        <span class="text-bold">Name:</span>
      </div>
      <div class="col-lg-4 col-sm-12 col-12">
        {{ authStore?.loginUserInfo?.name[languageStore.language] }}
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-lg-4 col-sm-12 col-12">
        <span class="text-bold">Email:</span>
      </div>
      <div class="col-lg-4 col-sm-12 col-12">
        {{ authStore?.loginUserInfo?.email }}
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-lg-4 col-sm-12 col-12">
        <span class="text-bold">Phone:</span>
      </div>
      <div class="col-lg-4 col-sm-12 col-12">
        {{ authStore?.loginUserInfo?.phone }}
        <span v-if="authStore?.loginUserInfo?.phoneVerified">
          <q-icon name="check_circle" color="green" /> phone verified
        </span>
        <span v-else>
          <q-btn
            label="send otp"
            size="xs"
            dense
            color="orange"
            @click="sendOtpManager"
          />
          <q-btn
            class="q-ml-xs"
            label="verify otp"
            size="xs"
            dense
            color="primary"
            @click="verifyOtp"
          />
        </span>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-lg-4 col-sm-12 col-12">
        <span class="text-bold">Nid No:</span>
      </div>
      <div class="col-lg-4 col-sm-12 col-12">
        {{ authStore?.loginUserInfo?.nidNo }}
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-lg-4 col-sm-12 col-12">
        <span class="text-bold">presentAddress:</span>
      </div>
      <div class="col-lg-4 col-sm-12 col-12">
        {{ authStore?.loginUserInfo?.presentAddress[languageStore.language] }}
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-sm-12 col-12">
        <span class="text-bold">permanentAddress:</span>
      </div>
      <div class="col-lg-4 col-sm-12 col-12">
        {{ authStore?.loginUserInfo?.permanentAddress[languageStore.language] }}
      </div>
    </div>
  </q-card>
</template>
<script setup>
import { useLocalStorage } from "@vueuse/core";
import { useQuasar, Notify } from "quasar";
import { isObjEmpty } from "src/global_js/utils";
import { useAuthStore, loginUser } from "src/stores/auth/authStore";
import { useOtpVerificationStore } from "src/stores/auth/verifyPhone";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useUserStore } from "src/stores/user/userStore.js";
const $q = useQuasar();
const otpVerificationStore = useOtpVerificationStore();
const userStore = useUserStore();
const languageStore = useLanguageStore();
const authStore = useAuthStore();
const otpCodeResend = useLocalStorage("opt-resend", {});

const sendOtpManager = () => {
  if (!isObjEmpty(otpCodeResend)) {
    console.log("not empty otp code resend")
    if (new Date(otpCodeResend.value.timer) > new Date()) {
      let timeDif = new Date(new Date(otpCodeResend.value.timer) - new Date());
      Notify.create({
        position: "center",
        type: "negative",
        message: `Try again ${timeDif.getMinutes()} minutes later.`,
      });
      return;
    }
  }
  return;
  let d = new Date();
  d.setMinutes(d.getMinutes() + 10);
  otpCodeResend.value.timer = d;
  otpVerificationStore.getOtpVerificationCode();
};

const verifyOtp = () => {
  $q.dialog({
    // title: t("confirm"),
    message: "Enter OTP code",
    cancel: true,
    persistent: true,
    prompt: {
      model: "",
      type: "text", // optional
    },
  }).onOk((data) => {
    otpVerificationStore.verifyOtpCode(data);
  });
};
</script>
