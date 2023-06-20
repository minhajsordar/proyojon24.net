<template>
  <q-item clickable v-ripple @click="roomClickManager(room._id)">
    <q-item-section avatar>
      <q-avatar>
        <img
          v-if="room.participants[0].user._id !== authStore.loginUserInfo._id"
          :src="web_root_url + room.participants[0].user.profileImage"
        />
        <img v-else :src="web_root_url + room.participants[1].user.profileImage" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">
        <span
          v-if="room.participants[0].user._id !== authStore.loginUserInfo._id"
          >{{ room.participants[0].user.name[languageStore.language] }}</span
        >
        <span v-else>{{
          room.participants[1].user.name[languageStore.language]
        }}</span>
      </q-item-label>
      <q-item-label caption lines="2" v-if="room?.messages">
        {{ room?.messages?.content }}
      </q-item-label>
    </q-item-section>

    <q-item-section side top class="fs-10">
      <span
        v-if="date.isSameDate( new Date(), room?.updatedAt, /* optional */ unit)"
      >
        <span
          v-if="
            date.getDateDiff(new Date(), room?.updatedAt, 'hour') == 0
          "
        >
          {{ date.getDateDiff( new Date(), room?.updatedAt, "minute") }}
          minute ago
        </span>
        <span v-else>
          {{ date.getDateDiff( new Date(), room?.updatedAt, "hour") }}
          hour ago
        </span>
      </span>
      <span v-else>
        {{ date.getDateDiff( new Date(), room?.updatedAt, unit) }}
        days ago</span
      >
    </q-item-section>
  </q-item>
  <q-separator />
</template>
<script setup>
import { useAuthStore } from "src/stores/auth/authStore";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useRouter, useRoute } from "vue-router";
import { socket } from "src/socket/socket";

// room
import { useRoomsStore } from "src/stores/message/roomStore";
import { useMessageStore } from "src/stores/message/messageStore";
import { useLocalStorage } from "@vueuse/core";
import { web_root_url } from "src/global_constant/root_url";
import { date } from "quasar";

const date1 = new Date();
const date2 = new Date(2017, 3, 8);
const unit = "days";
const diff = date.getDateDiff(new Date(), date2, "days");

const myRooms = useLocalStorage("myrooms", {});
const loginUser = useLocalStorage("proyojonloginuser", {});

const roomStore = useRoomsStore();
const messageStore = useMessageStore();
const route = useRoute();

defineProps({
  room: Object,
});

const router = useRouter();
const authStore = useAuthStore();
const languageStore = useLanguageStore();

const roomClickManager = (id) => {
  router.push("/direct_message/" + id);

  messageStore.selectedRoom = id;
  for (let room of myRooms.value?.rooms) {
    if (room._id == id) {
      messageStore.selectedRoomUser2 = room.participants.filter(
        (e) => e.user._id !== loginUser.value._id
      )[0];
    }
  }
  messageStore.getMessages();
};

var audio = new Audio("/sounds/new_messenge_ton.mp3"); // path to file

socket.on("new_message", () => {
  roomStore.getMyRooms();
  messageStore.getMessages();
});

socket.on("receiving_new_message", (argument) => {
  console.log("receiving new message")
  audio.play();
});
</script>
