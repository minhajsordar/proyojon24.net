<template>
  <div class="flex justify-between items-center permission-width">
    <q-select

      v-model="adminUserType"
      :options="options"
      :option-label="(item) => item === null ? 'Null value' : item.label"
      dense
      outlined
      options-dense
      style="width: 220px"
    >
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item
          v-bind="itemProps"
          class="flex justify-between"
          style="border-top: 1px solid rgba(0, 0, 0, 0.12)"
        >
          <q-item-section side>
            {{ opt.label }}
          </q-item-section>
          <q-item-section side>
            <q-checkbox
              :model-value="selected"
              @update:model-value="toggleOption(opt)"
              size="sm"
            />
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <div>
      <q-btn
        class="q-ml-md"
        :label="$t('confirm')"
        size="sm"
        dense
        color="positive"
        @click="userPermissionManager"
      />
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from "src/stores/auth/authStore";
import { ref } from "vue";
const options = [
  {
    label: "Super Admin",
    value: "superAdmin",
  },
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Division Admin",
    value: "division",
  },
  {
    label: "District Admin",
    value: "district",
  },
  {
    label: "Sub District Admin",
    value: "subDistrict",
  },
  {
    label: "Union Admin",
    value: "union",
  },
  {
    label: "None",
    value: "self",
  },
];
const adminUserType = ref(options.filter(opt=>opt.value == props.user.permission)[0]);
const authStore = useAuthStore();

const props = defineProps({
  user: {
    type: Object,
  },
});
const userPermissionManager = () => {
  if (adminUserType.value.value) {
    authStore.updateUserPermission(props.user._id, adminUserType.value.value);
  }
};
</script>
<style scoped>
.permission-width{
  width: 300px !important;
}
</style>
