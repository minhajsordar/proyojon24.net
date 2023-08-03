<template>
  <q-dialog v-model="otpVerificationStore.openOtpRegistrationVerificationDialog" persistent>
    <q-card class="relative-position">
      <div class="right-cros q-pa-sm"  @click="otpVerificationStore.closeOtpRegistationVerificationDialogManager">
        <q-icon name="close" />
      </div>
    <q-card-section class="text-center">
      <q-img class="otp-receive-image" src="/images/otp-receive-image.svg"/>
    </q-card-section>
    <q-card-section class="text-center">
      <div class="fs-24 text-bold">
        Verification code
      </div>
      <div class="fs-16">
        We have sent a verification code to your mobile number
      </div>
    </q-card-section>
    <q-card-section>
      <div style="display: flex; flex-direction: row; justify-content: center;">
        <v-otp-input
          ref="otpInput"
          v-model:value="otpVerificationStore.otpInput"
          input-classes="otp-input"
          separator="-"
          :num-inputs="4"
          :should-auto-focus="true"
          input-type="letter-numeric"
          :conditionalClass="['one', 'two', 'three', 'four']"
          @on-change="handleOnChange"
          @on-complete="handleOnComplete"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div class="flex justify-center">
        <q-btn label="Verify" color="primary" @click="otpVerificationStore.verifyOtpCodeWhileRegistration"/>
      </div>
    </q-card-section>
  </q-card>
    <!-- <button @click="clearInput()">Clear Input</button>
    <button @click="fillInput('2929')">Fill Input</button> -->
  </q-dialog>
</template>
<script setup >
import { ref } from "vue";
import VOtpInput from "vue3-otp-input";
const dialogmodel = ref(true)
const otpInput = ref(null);
const bindModal = ref("");


import { useOtpVerificationStore } from "src/stores/auth/verifyPhone";

const otpVerificationStore = useOtpVerificationStore();

const handleOnComplete = (value) => {
  console.log("OTP completed: ", value);
};

const handleOnChange = (value) => {
  console.log("OTP changed: ", value);
};

const clearInput = () => {
  otpInput.value?.clearInput();
};

const fillInput = (value) => {
  console.log(value);
  otpInput.value?.fillInput(value);
};
</script>
<style >
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.otp-input input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}

.otp-receive-image{
  width: 200px;
}
.right-cros{
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
}
</style>
