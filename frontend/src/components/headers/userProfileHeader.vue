<template>
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn v-if="!($q.screen.gt.sm)" icon="visibility" round dense flat size="19px" color="white" class="q-mr-sm" no-caps />

        <!-- <q-select
          ref="search" dark dense standout use-input hide-selected
          class="GL__toolbar-select"
          color="black" :stack-label="false" label="Search or jump to..."
          v-model="text" :options="filteredOptions" @filter="filter"
          style="width: 300px"
        >

          <template v-slot:append>
            <img src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg">
          </template>

          <template v-slot:no-option>
            <q-item>
              <q-item-section>
                <div class="text-center">
                  <q-spinner-pie
                    color="grey-5"
                    size="24px"
                  />
                </div>
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              class="GL__select-GL__menu-link"
            >
              <q-item-section side>
                <q-icon name="collections_bookmark" />
              </q-item-section>
              <q-item-section>
              </q-item-section>
              <q-item-section side :class="{ 'default-type': !scope.opt.type }">
                <q-btn outline dense no-caps text-color="blue-grey-5" size="12px" class="bg-grey-1 q-px-sm">
                  {{ scope.opt.type || 'Jump to' }}
                  <q-icon name="subdirectory_arrow_left" size="14px" />
                </q-btn>
              </q-item-section>
            </q-item>
          </template>
        </q-select> -->

        <div v-if="$q.screen.gt.sm" class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap cursor-pointer">
          <!-- <span class="text-white" @click="router.push('/locations')" >
            {{$t('headermenus.locations')}}
          </span> -->
          <router-link to="/locations" active-class="text-white">{{$t('headermenus.locations')}}</router-link>
          <!-- <span class="text-white" @click="router.push('/users')">
            {{$t('headermenus.users')}}
          </span> -->
          <router-link to="/users" active-class="text-white">{{$t('headermenus.users')}}</router-link>
          <!-- <span class="text-white" @click="router.push('/services')">
            {{$t('headermenus.services')}}
          </span> -->
          <router-link to="/services" active-class="text-white">{{$t('headermenus.services')}}</router-link>
        </div>

        <q-space />

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <!-- <q-btn
            v-if="$q.screen.gt.xs"
            dense
            flat
            round
            size="sm"
            icon="notifications"
          /> -->
          <q-btn dense flat>
            <div class="row items-center no-wrap">
              <q-icon name="language" size="20px" />
              {{$t('language')}}
              <q-icon
                name="arrow_drop_down"
                size="16px"
                style="margin-left: -2px"
              />
            </div>
            <q-menu auto-close>
              <q-list dense style="min-width: 140px">

                <q-item clickable class="GL__menu-link" @click="languageStore.switchToBn">
                  <q-item-section>বাংলা</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link" @click="languageStore.switchToEn">
                  <q-item-section>English</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn dense flat>
            <div class="row items-center no-wrap">
              <q-icon name="add" size="20px" />
              <q-icon
                name="arrow_drop_down"
                size="16px"
                style="margin-left: -2px"
              />
            </div>
            <q-menu auto-close>
              <q-list dense style="min-width: 140px">
                <q-item clickable class="GL__menu-link">
                  <q-item-section>{{$t('headermenus.addnew_users')}}</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>{{$t('headermenus.addnew_services')}}</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>{{$t('location.addnew_division')}}</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>{{$t('location.addnew_district')}}</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>{{$t('location.addnew_subdistrict')}}</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>{{$t('location.addnew_union')}}</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>{{$t('location.addnew_ward')}}</q-item-section>
                </q-item>
                <!-- <q-separator />
                <q-item-label header>This location</q-item-label>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>New issue</q-item-section>
                </q-item> -->
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn dense flat no-wrap>
            <q-avatar rounded size="20px">
              <img src="https://cdn.quasar.dev/img/avatar1.jpg" />
            </q-avatar>
            <q-icon name="arrow_drop_down" size="16px" />

            <q-menu auto-close>
              <q-list dense style="min-width: 140px">
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div><strong>{{ authStore?.loginUserInfo?.name.bn }}</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable class="GL__menu-link-status">
                  <q-item-section>
                    <div>
                      <q-icon name="account_circle" color="blue-9" size="18px" />
                      {{ authStore.loginUserInfo?.isSuperAdmin ? 'Super Admin': authStore.loginUserInfo?.isAdmin? 'Admin' : 'Service Provider'}}
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable class="GL__menu-link" @click="router.push('/profile')">
                  <q-item-section>{{$t('usermenus.profile')}}</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link" @click="router.push('/help')">
                  <q-item-section>{{$t('usermenus.help')}}</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link"  @click="router.push('/settings')">
                  <q-item-section>{{$t('usermenus.settings')}}</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link" @click="logoutFunc">
                  <q-item-section>{{$t('usermenus.signout')}}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>

</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useLocalStorage } from "@vueuse/core";
import { useAuthStore } from "src/stores/auth/authStore";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
const languageStore =useLanguageStore()
const authStore = useAuthStore();
const router = useRouter()
const logoutFunc =()=>{
  authStore.logoutFunc()
  router.push('/login')
}
const stringOptions = [
  "quasarframework/quasar",
  "quasarframework/quasar-awesome",
];
const text = ref("");
const options = ref(null);
const filteredOptions = ref([]);
const search = ref(null); // $refs.search
function filter(val, update) {
  if (options.value === null) {
    // load data
    setTimeout(() => {
      options.value = stringOptions;
      search.value.filter("");
    }, 2000);
    update();
    return;
  }
  if (val === "") {
    update(() => {
      filteredOptions.value = options.value.map((op) => ({ label: op }));
    });
    return;
  }
  update(() => {
    filteredOptions.value = [
      {
        label: val,
        type: "In this repository",
      },
      {
        label: val,
        type: "All GitHub",
      },
      ...options.value
        .filter((op) => op.toLowerCase().includes(val.toLowerCase()))
        .map((op) => ({ label: op })),
    ];
  });
}
</script>

<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden
    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible
  &__toolbar-link
    a
      color: rgb(209, 233, 255)
      text-decoration: none
      &:hover
        opacity: 0.7
  &__menu-link:hover
    background: #0366d6
    color: white
  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important
  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9
  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
