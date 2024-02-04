<template>
  <select
    class="change-language"
    @change="handleChangeLanguage"
    :value="currentLanguage"
  >
    <option value="en">English</option>
    <option value="tr">Türkçe</option>
  </select>
</template>

<script setup lang="ts">
import { CookieManager } from "@/utils/CookieManager";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const currentLanguage = ref();

onMounted(() => {
  currentLanguage.value = CookieManager.getters.lang();
  locale.value = currentLanguage.value;
});

function handleChangeLanguage(event: Event) {
  currentLanguage.value = (event.target as HTMLSelectElement).value;
  locale.value = currentLanguage.value;

  CookieManager.setters.lang(currentLanguage.value);

  // Refresh the page to make sure the localization data is updated after changing the language.
  window.location.reload();
}
</script>

<style lang="scss" scoped>
.change-language {
  margin-right: auto;
}
</style>
