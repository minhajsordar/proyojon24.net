<template>
  <div class="app-content content"
  @keypress.enter="resetPassword">
    <div class="content-wrapper">
      <div class="content-body">
        <div class="auth-wrapper auth-basic q-px-md">
          <div class="auth-inner q-my-md">
            <!-- Login basic -->
            <q-card class="card q-mb-none">
              <div class="gradient-bg"></div>
              <div class="card-body">
                <div class="brand-logo">
                  <h2 class="brand-text text-primary ms-1">Proyojon24</h2>
                </div>

                <h5 class="card-title q-mb-xs">
                  Get One Time Password
                </h5>
                <p class="card-text q-mb-xs">
                  Enter phone number associated with your account
                </p>

                <div class="auth-login-form q-mt-xs" novalidate="novalidate">
                  <div class="q-mb-md">
                    <div>
                      <label for="login-email" class="form-label">Phone</label>
                    </div>
                    <div>
                      <q-input
                        ref="phoneEl"
                        class="full-width"
                        v-model="resetPasswordStore.phone"
                        type="text"
                        placeholder="phone/email"
                        outlined
                        dense
                        :rules="[mobileNoBd]"
                      />
                    </div>
                  </div>
                  <button
                    class="btn btn-primary w-100 waves-effect waves-float waves-light"
                    tabindex="4"
                    @click="resetPassword"
                  >
                    Get Verification Code
                  </button>
                </div>
              </div>
            </q-card>
            <!-- /Login basic -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMeta } from "quasar";
import { ref, onMounted } from "vue";
import { useResetPasswordStore } from "src/stores/auth/passwordResetStore";
import {  mobileNoBd, required } from "src/global_js/utils";
import { useRouter } from "vue-router";
const router = useRouter();
const resetPasswordStore = useResetPasswordStore()

const phoneEl = ref(null);

const resetPassword = ()=>{
  phoneEl.value.validate()
  if(phoneEl.value.hasError){
    return
  }
  resetPasswordStore.getResetPassword()
}

const metaData = {
  // sets document title
  title: "Login Page",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - Proyojon24.net`,

  // meta tags
  meta: {
    description: { name: "description", content: "Page 1" },
    keywords: {
      name: "keywords",
      content: "proyojon24 services service-provider",
    },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle} - Proyojon24.net`;
      },
    },
  },
};

useMeta(metaData);
</script>
<style scoped lang="scss">
h2,
h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  color: #5e5873;
}
h2 {
  font-size: calc(1.2964rem + 0.5568vw);
}
@media (min-width: 1200px) {
  h2 {
    font-size: 1.714rem;
  }
}
h4 {
  font-size: calc(1.2536rem + 0.0432vw);
}
@media (min-width: 1200px) {
  h4 {
    font-size: 1.286rem;
  }
}
p {
  margin-top: 0;
  margin-bottom: 1rem;
}
small {
  font-size: 0.857rem;
}
a {
  color: #009ef7;
  text-decoration: none;
}
a:hover {
  color: rgb(98, 157, 228);
  text-decoration: none;
}
svg {
  vertical-align: middle;
}
.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1;
  color: #6e6b7b;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.786rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.358rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, background 0s,
    border 0s;
}
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}
.btn:hover {
  color: #6e6b7b;
}
.btn:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(0, 158, 247, 0.25);
}
.btn:disabled {
  pointer-events: none;
  opacity: 0.65;
}
.btn-primary {
  color: #fff;
  background-color: $primary;
  border-color: $primary;
}
.btn-primary:hover {
  color: #fff;
  background-color: $primary;
  border-color: $primary;
}
.btn-primary:focus {
  color: #fff;
  background-color: $primary;
  border-color: $primary;
  box-shadow: 0 0 0 0.25rem rgba(0, 158, 247, 0.5) 0 0 0 0.5rem
    rgba(0, 158, 247, 0.8) 0 0 0 0.75rem rgba(0, 158, 247, 1);
}
.btn-primary:active {
  color: #fff;
  background-color: $primary;
  border-color: $primary;
}
.btn-primary:active:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 158, 247, 0.5) 0 0 0 0.5rem
    rgba(0, 158, 247, 0.8) 0 0 0 0.75rem rgba(0, 158, 247, 1);
}
.btn-primary:disabled {
  color: #fff;
  background-color: #009ef7;
  border-color: #009ef7;
}
.card {
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  // border: 2px solid rgba(0, 158, 247, 0.125);
  border-radius: 0.428rem;
}
.card-body {
  flex: 1 1 auto;
  padding: 1.5rem 1.5rem;
}
.d-flex {
  display: flex !important;
}
.w-100 {
  width: 100% !important;
}
.justify-content-center {
  justify-content: center !important;
}
.justify-content-between {
  justify-content: space-between !important;
}
.my-2 {
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
}
.mt-2 {
  margin-top: 1.5rem !important;
}
.mb-0 {
  margin-bottom: 0 !important;
}
.mb-1 {
  margin-bottom: 1rem !important;
}
.mb-2 {
  margin-bottom: 1.5rem !important;
}
.ms-1 {
  margin-left: 1rem !important;
}
.px-2 {
  padding-right: 1.5rem !important;
  padding-left: 1.5rem !important;
}
.text-center {
  text-align: center !important;
}
a:focus {
  outline: none;
}
.btn {
  box-shadow: none;
  font-weight: 500;
}
.btn:focus,
.btn:active {
  outline: none;
  box-shadow: none;
}
.btn:not(:disabled):not(.disabled):active:focus {
  box-shadow: none !important;
}
.btn .feather {
  vertical-align: bottom;
}
.header-navbar-shadow {
  display: none;
}
.navbar-floating .header-navbar-shadow {
  display: block;
  background: linear-gradient(
    180deg,
    rgba(248, 248, 248, 0.95) 44%,
    rgba(248, 248, 248, 0.46) 73%,
    rgba(255, 255, 255, 0)
  );
  padding-top: 2.2rem;
  background-repeat: repeat;
  width: 100%;
  height: 102px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
}
.card {
  margin-bottom: 2rem;
  box-shadow: 0 4px 24px 0 rgba(0, 158, 247, 0.1);
  transition: all 0.3s ease-in-out, background 0s, color 0s, border-color 0s;
}
.card .card-title {
  font-weight: 500;
  font-size: 1.285rem;
}
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .card-body {
    min-height: 1px;
  }
}
.cursor-pointer {
  cursor: pointer;
}
a:hover {
  cursor: pointer;
}
.btn-primary {
  border-color: $primary !important;
  background-color: $primary !important;
  color: #fff !important;
}
.btn-primary:focus,
.btn-primary:active {
  color: #fff;
  background-color: #006dad !important;
}
.btn-primary:hover:not(.disabled):not(:disabled) {
  box-shadow: 0 8px 25px -8px rgba(230, 6, 255, 0.536);
}
.btn-primary:not(:disabled):not(.disabled):active:focus {
  box-shadow: none;
}
.bordered-layout .card {
  border: 1px solid #ebe9f1;
  box-shadow: none;
}
.vertical-overlay-menu .content {
  margin-left: 0;
}
.auth-wrapper {
  display: flex;
  flex-basis: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  width: 100%;
}
.auth-wrapper .auth-inner {
  width: 100%;
}
.auth-wrapper.auth-basic {
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.auth-wrapper.auth-basic .auth-inner {
  position: relative;
}

.auth-wrapper.auth-basic .auth-inner {
  max-width: 400px;
}
.auth-wrapper .brand-logo {
  display: flex;
  justify-content: center;
  margin: 1rem 0 2rem 0;
}
.auth-wrapper .brand-logo .brand-text {
  font-weight: 600;
}
.auth-wrapper .auth-footer-btn .btn {
  padding: 0.6rem !important;
}
.auth-wrapper .auth-footer-btn .btn:not(:last-child) {
  margin-right: 1rem;
}
.auth-wrapper .auth-footer-btn .btn:focus {
  box-shadow: none;
}
@media (max-height: 825px) and (max-width: 991.98px) {
  .auth-wrapper .auth-inner {
  }
}
</style>
