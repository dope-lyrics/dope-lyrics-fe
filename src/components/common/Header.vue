<template>
  <header class="header">
    <nav>
      <ChangeLanguage />
      <RouterLink to="/Add">{{ t("homepage.header.add") }}</RouterLink>
      <a v-if="store.user" @click="handleLogout">{{
        t("homepage.header.logout")
      }}</a>
      <RouterLink v-else to="/login">{{
        t("homepage.header.login")
      }}</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { store } from "@/store/store";
import { logout } from "@/api/api";
import { useI18n } from "vue-i18n";
import ChangeLanguage from "@/components/ChangeLanguage.vue";

const { t } = useI18n();
const router = useRouter();

function handleLogout() {
  logout({
    onSuccess: () => {
      router.push({ name: "Home" });
    },
    onError: () => {
      alert("Error occurred");
    },
  });
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  nav {
    display: flex;
    background-color: #d5a9a263;
    padding: 24px;
    justify-content: flex-end;
    gap: 24px;
    border: 1px solid #3095d378;

    > a {
      font-weight: bold;
      text-decoration: none;
      color: #990011ff;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
