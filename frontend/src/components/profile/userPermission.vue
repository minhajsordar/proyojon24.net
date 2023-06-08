<template>
  <div class="q-gutter-sm">
    <q-radio
      v-model="adminUserType"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      val="superAdmin"
      label="Super Admin"
    />
    <q-radio
      v-model="adminUserType"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      val="admin"
      label="Admin"
    />
    <q-radio
      v-model="adminUserType"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      val="division"
      label="Division Admin"
    />
    <q-radio
      v-model="adminUserType"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      val="district"
      label="District Admin"
    />
    <q-radio
      v-model="adminUserType"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      val="subDistrict"
      label="Sub District Admin"
    />
    <q-radio
      v-model="adminUserType"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      val="union"
      label="Union Admin"
    />
    <q-radio
      v-model="adminUserType"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
      val="self"
      label="None"
    />
    <q-btn class="q-ml-lg" :label="$t('confirm')" size="sm" dense color="positive" @click="userPermissionManager" />
  </div>
</template>
<script setup>
import { useAuthStore } from "src/stores/auth/authStore";
import { ref } from "vue";
const adminUserType = ref(null);
const authStore = useAuthStore()

const props = defineProps({
  user: {
    type: Object,
  },
});
const userPermissionManager =()=>{
  if(adminUserType.value){
    authStore.updateUserPermission(props.user._id,adminUserType.value)
  }
}
</script>
