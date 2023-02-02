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
import Cookies from "js-cookie";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { locale, fallbackLocale } = useI18n();
const currentLanguage = ref();

onMounted(() => {
  currentLanguage.value =
    Cookies.get("lang") || locale.value || fallbackLocale.value;
  locale.value = currentLanguage.value;
});

function handleChangeLanguage(event: Event) {
  currentLanguage.value = (event.target as HTMLSelectElement).value;
  locale.value = currentLanguage.value;
  Cookies.set("lang", currentLanguage.value);
}
</script>

<style lang="scss" scoped>
.change-language {
  margin-right: auto;
}
</style>
