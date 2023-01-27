<template>
  <header class="header">
    <nav>
      <template v-if="store.user">
        <a @click="handleLogout">Log out</a>
      </template>
      <template v-else>
        <RouterLink to="/login">Log in</RouterLink>
      </template>

      <RouterLink to="/Add">Add</RouterLink>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { store } from "@/store/store";
import { logout } from "@/api/api";

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
    background-color: #fcf6f5ff;
    padding: 24px;
    justify-content: flex-end;
    gap: 24px;
    > a {
      font-weight: bold;
      text-decoration: none;
      color: #990011ff;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
