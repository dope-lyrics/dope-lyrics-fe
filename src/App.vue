<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import "./style.scss";
</script>

<template>
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
