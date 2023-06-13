<template>
  <div class="q-virtual-scroll__content" tabindex="-1">
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
            :src="
              authStore.loginUserInfo._id !== message.sender._id
                ? message.sender?.profileImage
                : message.receipent?.profileImage
            "
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
              {{ message.sender.name[languageStore.language] }}
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
                        date1,
                        message.updatedAt,
                        /* optional */ unit
                      )
                    "
                  >
                    <span
                      v-if="
                        date.getDateDiff(
                          new Date(date1),
                          message.updatedAt,
                          'hour'
                        ) == 0
                      "
                    >
                      {{
                        date.getDateDiff(
                          date1,
                          message.updatedAt,
                          "minute"
                        )
                      }}
                      minute ago
                    </span>
                    <span v-else>
                      {{
                        date.getDateDiff(date1, message.updatedAt, "hour")
                      }}
                      hour ago
                    </span>
                  </span>
                  <span v-else>
                    {{
                      date.getDateDiff(date1, message.updatedAt, unit)
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
  </div>
</template>
<script setup>
import { date } from "quasar";
import { useAuthStore } from "src/stores/auth/authStore";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useMessageStore } from "src/stores/message/messageStore";

const date1 = new Date();
const date2 = new Date(2017, 3, 8);
const unit = "days";
const diff = date.getDateDiff(new Date(), date2, "days");
const messageStore = useMessageStore();
const authStore = useAuthStore();
const languageStore = useLanguageStore();
</script>
