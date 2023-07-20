import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { ref } from 'vue';
import { useI18n } from "vue-i18n";
export const suggestLanguage = useLocalStorage('proyojon24language', {})
export const useLanguageStore = defineStore('language store', () => {
  const $i18n = useI18n()
  const language = ref('bn')
  const switchToBn = () => {
    $i18n.locale.value = suggestLanguage.value = language.value = 'bn'
  }
  const switchToEn = () => {
    $i18n.locale.value = suggestLanguage.value = language.value = 'en'
  }
  return {
    language,
    switchToBn,
    switchToEn
  }
});
