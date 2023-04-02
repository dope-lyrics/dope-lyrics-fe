<script setup lang="ts">
import { RouterView } from "vue-router";
import { ModalsContainer } from "vue-final-modal";
import "./style.scss";
</script>

<template>
  <div>
    <RouterView />
    <ModalsContainer />
  </div>
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
