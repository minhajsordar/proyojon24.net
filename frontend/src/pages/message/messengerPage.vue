<template>
  <q-layout view="lHh Lpr lFf" container style="height: 100vh" class="shadow-2">
    <q-header elevated :class="$q.dark.isActive ? 'bg-primary' : 'bg-accent'">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Proyojon24</q-toolbar-title>
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

const myRooms = useLocalStorage("myrooms", {});
const loginUser = useLocalStorage("proyojonloginuser", {});

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
  roomStore.myRooms = "m"
})
onBeforeMount(() => {
  authStore.checkLogin();
});

</script>
<style lang="scss" scoped>
.menu-list .q-item {
  border-radius: 0 32px 32px 0;
}
</style>
