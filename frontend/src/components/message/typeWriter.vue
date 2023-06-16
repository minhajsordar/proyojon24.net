<template>
  <div class="relative-position q-pa-sm text-black">
    <div ref="inputTextEl" style="width: calc(100% - 50px)">
      <q-input
        v-model="messageStore.messageContent"
        @update:model-value="updateShowWidth"
        :type="inputTypeTextarea ? 'textarea' : 'text'"
        outlined
        dense
        counter
        maxlength="1000"
      />
    </div>
    <div
    class="absolute-top-right"
    style="width: 50px; height: 100%"
    @click="sendMessageManager"
    >
      <div
        style="
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        "
      >
        <q-icon
          class="fs-32 "
          :class="[$q.screen.gt.sm?'text-primary':'text-green']"
          name="send"
          style="margin-top: -19px"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { dom } from "quasar";
import { useMessageStore } from "src/stores/message/messageStore";

const messageStore = useMessageStore()

const { height, width } = dom;

const inputTypeTextarea = ref(false);
const inputTextEl = ref(null);

const updateShowWidth = () => {
  if (width(inputTextEl.value) / messageStore.messageContent.length <= 6.6) {
    inputTypeTextarea.value = true;
  } else {
    inputTypeTextarea.value = false;
  }
};
const sendMessageManager =()=>{
  if(messageStore.messageContent.length == 0){
    return
  }
  messageStore.createMessage()
  inputTypeTextarea.value = false
}
</script>
