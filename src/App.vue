<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: space-between;
  max-width: 1024px;
  margin: auto;

  a {
  }
}
</style>
