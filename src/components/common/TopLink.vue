<template>
  <RouterLink class="link" :to="to">
    <slot></slot>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps<{
  to: string;
}>();
</script>

<style lang="scss">
.link {
  color: #3b82f6;
  font-weight: bold;
}
</style>
