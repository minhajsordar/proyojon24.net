<template>
  <div class="container-section-py-sm">
    <div class="inner-section">
      <div class="full-width">
        <div class="flex justify-between items-center">
          <div class="fs-24">Create Your Account</div>
          <div>
            Already member? <router-link to="/login">Sign In</router-link> here
          </div>
        </div>
        <q-card class="q-pa-md q-mt-md">
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-sm-6 col-xs-12 col-12">
                <div class="row q-col-gutter-xs">
                  <div class="col-12">
                    <q-input
                      ref="usernameEl"
                      v-model="registerStore.newUserInfo.username"
                      label="Username"
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
                      label="Email"
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
                      label="Password"
                      type="password"
                      stack-label
                      outlined
                      dense
                      :rules="[required]"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      ref="confirmPasswordEl"
                      v-model="registerStore.newUserInfo.password2"
                      label="Confirm Password"
                      type="password"
                      stack-label
                      outlined
                      dense
                      :rules="[required, registerStore.matchPassword]"
                    />
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xs-12 col-12">
                <div class="row q-col-gutter-xs">
                  <div class="col-12">
                    <q-input
                      ref="phoneEl"
                      v-model="registerStore.newUserInfo.phone"
                      label="Phone number"
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
                      label="Full name In Bangla"
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
                      label="Full name In English"
                      stack-label
                      outlined
                      dense
                      :rules="[required]"
                    />
                  </div>
                  <div class="col-12">
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
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { required, isEmail, mobileNoBd } from "src/global_js/utils";
import { useRegisterStore } from "src/stores/auth/registerStore";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const registerStore = useRegisterStore();
const usernameEl = ref(null);
const emailEl = ref(null);
const passwordEl = ref(null);
const confirmPasswordEl = ref(null);
const phoneEl = ref(null);
const fullnameBnEl = ref(null);
const fullnameEnEl = ref(null);
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
    console.log("failed");
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
  registerStore.registerNewUser();
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
