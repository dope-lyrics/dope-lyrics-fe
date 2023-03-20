<template>
  <div class="link-bottom">
    {{ label }}
    <RouterLink class="link" :to="to">
      <slot></slot>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps<{
  label: string;
  to: string;
}>();
</script>

<style lang="scss">
.link-bottom {
  font-size: 24px;
  font-weight: 700;
  padding: 48px;
  margin-top: auto;

  .link {
    color: #3b82f6;
  }

  @include mobileOrTablet {
    font-size: 1.25rem;
  }
}
</style>
