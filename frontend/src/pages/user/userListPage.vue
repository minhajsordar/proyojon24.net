<template>
  <div class="container-section-py-xs">
    <div class="inner-section">
      <div class="full-width">
        <q-card class="border-primary q-pa-md">
          <div>
            <div class="fs-18">{{ $t("headermenus.users") }}</div>
            <q-separator class="q-my-sm" />
            <q-markup-table
              flat
              bordered
              separator="cell"
              class="text-left"
            >
              <thead class="bg-blue-grey-2">
                <tr>
                  <th>{{ $t("serial") }}</th>
                  <th>{{ $t("name") }}</th>
                  <th v-if="authStore?.loginUserInfo?.permission == 'superAdmin'">{{ $t("registration_no") }}</th>
                  <th v-if="authStore?.loginUserInfo?.permission == 'superAdmin'">{{ $t("email") }}</th>
                  <th v-if="authStore?.loginUserInfo?.permission == 'superAdmin'">{{ $t("phone") }}</th>
                  <th v-if="authStore?.loginUserInfo?.permission == 'superAdmin'">{{ $t("joined_date") }}</th>
                  <th v-if="authStore?.loginUserInfo?.permission == 'superAdmin'">{{ $t("permission") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(user, index) in userList.users"
                  :key="index"
                  :class="{ 'bg-blue-grey-1': index % 2 != 0 }"
                >
                  <td>
                    {{ enToBnToEn(String(index+1), languageStore.language) }}
                  </td>
                  <td>
                    {{ user.name[languageStore.language] }}
                  <!-- <span v-if="user.permission == 'superAdmin'">(Super Admin)</span>
                  <span v-else-if="user.permission == 'admin'">(Admin)</span>
                  <span v-else>({{ user.permission }})</span> -->
                  </td>
                  <td style="width: 300px;" v-if="authStore?.loginUserInfo?.permission == 'superAdmin'">
                    {{ user.registrationNo }}
                  </td>
                  <td style="width: 300px;" v-if="authStore?.loginUserInfo?.permission == 'superAdmin'">
                    {{ user.email }}
                  </td>
                  <td style="width: 300px;" v-if="authStore?.loginUserInfo?.permission == 'superAdmin'">
                    {{ user.phone }}
                  </td>
                  <td style="width: 300px;" v-if="authStore?.loginUserInfo?.permission == 'superAdmin'">
                    {{ date.formatDate(user?.createdAt,'YYYY-MM-DD HH:mm:ss') }}
                  </td>
                  <td style="width: 300px;" v-if="authStore?.loginUserInfo?.permission == 'superAdmin'">
                    <userPermission :user="user"/>
                  </td>
                  <td>
                    <q-btn
                      class="q-ml-xs"
                      label="Send Message"
                      size="sm"
                      dense
                      color="primary"
                      @click="createRoomManager(user._id)"
                    />
                    <q-btn
                    v-if="authStore?.loginUserInfo?.permission == 'superAdmin'"
                      class="q-ml-xs"
                      :label="$t('delete')"
                      size="sm"
                      dense
                      color="negative"
                      @click="confirm(user.name[languageStore.language])"
                    />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useQuasar, useMeta, date } from "quasar";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useRoomsStore } from "src/stores/message/roomStore";
import { useUserStore } from "src/stores/user/userStore";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "src/stores/auth/authStore";
import { onMounted, ref } from "vue";
import { enToBnToEn } from "src/global_js/utils";
import { useRouter } from "vue-router";
import  userPermission  from "src/components/profile/userPermission.vue";
import { useLocalStorage } from "@vueuse/core";

 const myRooms = useLocalStorage('myrooms', {})

const roomStore = useRoomsStore()
const router = useRouter();
const authStore = useAuthStore();
const $q = useQuasar();
const { t } = useI18n();
const userStore = useUserStore();

const { userList } = storeToRefs(userStore);
const languageStore = useLanguageStore();
const adminUserType = ref('self')
const confirm = (data) => {
  $q.dialog({
    title: t("confirm"),
    message: t("confirm_delete_start") + data + t("confirm_delete_end"),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    console.log(">>>> OK");
  });
};
const createRoomManager = (id) => {
  for(let room of myRooms.value.rooms){
    if(room.participants[0].user._id == id || room.participants[1].user._id == id){
      router.push('direct_message/'+room._id)
      return
    }
  }
  roomStore.createRoom(id)
};
onMounted(() => {
  authStore.checkLogin();
  userStore.getUserList();
});
const metaData = {
  // sets document title
  title: "User List",
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
<style></style>
