<template>
  <q-layout view="lHh Lpr lFf" container style="height: 100vh" class="shadow-2">
    <q-header elevated  :class="[$q.screen.gt.sm?'bg-accent-public':'bg-red-8']">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>{{ messageStore.selectedRoomUser2 ? messageStore.selectedRoomUser2?.user?.name[languageStore.language] : 'Select user.' }}</q-toolbar-title>
        <q-btn flat dense
        @click="$router.push('/users')"
        >{{ $t('headermenus.users') }}</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="300" :breakpoint="500">
      <q-scroll-area class="fit">
        <q-list bordered class="rounded-borders" style="max-width: 350px">
          <q-item-label header>Messages List</q-item-label>
          <div v-if="roomStore.myRoomList">
            <div v-for="(room, index) in roomStore.myRoomList?.rooms" :key="index">
              <roomsView :room="room" />
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page >
        <messageArea />
      </q-page>
    </q-page-container>
    <q-footer elevated class="bg-white">
      <typeWriter />
    </q-footer>
  </q-layout>
</template>
<script setup>
import typeWriter from "src/components/message/typeWriter.vue";
import messageArea from "src/components/message/messageArea.vue";
import roomsView from "src/components/message/roomsView.vue";
import { ref, onBeforeMount, onMounted } from "vue";
import { dom } from "quasar";
// room
import { useRoomsStore } from "src/stores/message/roomStore";
import { useAuthStore } from "src/stores/auth/authStore";
import { useRoute } from "vue-router";
import { useMessageStore } from "src/stores/message/messageStore";
import { isObjEmpty } from "src/global_js/utils";
import { useLocalStorage } from "@vueuse/core";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { socket } from "src/socket/socket";


const myRooms = useLocalStorage("myrooms", {});
const loginUser = useLocalStorage("proyojonloginuser", {});

const languageStore = useLanguageStore();
const roomStore = useRoomsStore();
const messageStore = useMessageStore();
const authStore = useAuthStore();
const route = useRoute();
const { height, width } = dom;

const drawer = ref(false);

if (!isObjEmpty(route.params)) {
  messageStore.selectedRoom = route.params.id;
  for (let room of myRooms.value?.rooms) {
    if (room._id == route.params.id) {
       messageStore.selectedRoomUser2 = room.participants.filter(e=>e.user._id !== loginUser.value._id)[0]

    }
  }
  messageStore.getMessages()
}
onMounted(()=>{
  roomStore.getMyRooms();
})
onBeforeMount(() => {
  authStore.checkLogin();
});
socket.on("new_message",(args)=>{
  // messageStore.getMessages()
  // console.log("new message",args._doc)
  messageStore.messageList?.messages?.unshift(args._doc)
})
</script>
<style lang="scss" scoped>
.menu-list .q-item {
  border-radius: 0 32px 32px 0;
}
</style>
