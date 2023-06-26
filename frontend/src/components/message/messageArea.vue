<template>
  <q-scroll-area
    ref="scrollAreaRef"
    class="full-width q-px-sm"
    style="height: calc(100vh - 130px)"
  >
  <div class="flex justify-center q-mt-sm" v-if="messageList?.pages >= messageStore.nextPageNumber">
    <q-btn rounded outline label="load more" size="sm" :loading="messageStore.messageListLoading" @click="getPreviousMessagesList"/>
  </div>
  <div v-else  class="text-center text-grey-6 q-mt-sm">no more content to load</div>
    <div
      v-for="(message, index) in messageStore.messageList?.messages"
      :key="index"
    >
      <div
        class="q-message q-mx-sm"
        :class="[
          authStore.loginUserInfo._id !== message.sender._id
            ? 'q-message-sent'
            : 'q-message-received ',
        ]"
      >
        <div
          class="q-message-container row items-end no-wrap"
          :class="[
            authStore.loginUserInfo._id !== message.sender._id ? '' : 'reverse',
          ]"
        >
          <img
            class="q-message-avatar q-message-avatar--received"
            :src="web_root_url + message.sender?.profileImage"
            aria-hidden="true"
          />
          <div class="">
            <div
              class="q-message-name"
              :class="[
                authStore.loginUserInfo._id !== message.sender._id
                  ? 'q-message-name--received'
                  : 'q-message-name--sent',
              ]"
            >
              {{
                authStore.loginUserInfo._id !== message.sender._id
                  ? message.sender.name[languageStore.language]
                  : "me"
              }}
            </div>
            <div
              class="q-message-text"
              :class="[
                authStore.loginUserInfo._id !== message.sender._id
                  ? 'q-message-text--received bg-primary text-primary'
                  : 'q-message-text--sent',
              ]"
            >
              <div
                class="q-message-text-content"
                :class="[
                  authStore.loginUserInfo._id !== message.sender._id
                    ? 'q-message-text-content--received'
                    : 'q-message-text-content--sent',
                ]"
              >
                <div
                  :class="[
                    authStore.loginUserInfo._id !== message.sender._id
                      ? 'text-white'
                      : 'text-black',
                  ]"
                >
                  {{ message.content }}
                </div>
                <div
                  class="q-message-stamp"
                  :class="[
                    authStore.loginUserInfo._id !== message.sender._id
                      ? 'text-white'
                      : 'text-black',
                  ]"
                >
                  <span
                    v-if="
                      date.isSameDate(
                        new Date(),
                        message.updatedAt,
                        /* optional */ 'days'
                      )
                    "
                  >
                    <span
                      v-if="
                        date.getDateDiff(
                          new Date(),
                          message.updatedAt,
                          'hour'
                        ) == 0
                      "
                    >
                      {{
                        date.getDateDiff(
                          new Date(),
                          message.updatedAt,
                          "minute"
                        )
                      }}
                      minute ago
                    </span>
                    <span v-else>
                      {{
                        date.getDateDiff(new Date(), message.updatedAt, "hour")
                      }}
                      hour ago
                    </span>
                  </span>
                  <span v-else>
                    {{
                      date.getDateDiff(new Date(), message.updatedAt, "days")
                    }}
                    days ago</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { date, scroll } from "quasar";
import { useAuthStore } from "src/stores/auth/authStore";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useMessageStore } from "src/stores/message/messageStore";
import { useRoomsStore } from "src/stores/message/roomStore";
import { storeToRefs } from "pinia";
import { web_root_url } from "src/global_constant/root_url";
import { socket } from "src/socket/socket";

const messageStore = useMessageStore();
const { messageList } = storeToRefs(messageStore);
const authStore = useAuthStore();
const languageStore = useLanguageStore();
const scrollAreaRef = ref(null);
const getPreviousMessagesList = () => {
  messageStore.getPreviousMessages();
  // if (scrollAreaRef.value.getScrollPercentage().top == 0) {
  //   console.log("trigurring previous messages");
  //   setTimeout(() => {
  //   }, 3000);
  // }
};
const scrollToBottom = () => {
  scrollAreaRef.value.setScrollPercentage("vertical", 1.0, 100);
};
// watch(messageList, () => {
//   setTimeout(() => {
//     scrollToBottom();
//     console.log("watch effect");
//   }, 50);
// });
socket.on("new_message",(args)=>{
  setTimeout(() => {
    scrollToBottom();
    // console.log("watch effect");
  }, 50);
})
</script>
