<template>
  <div class="welcome-message">
    <h2 class="title">{{ title }}</h2>
    <h3 class="description">{{ description }}</h3>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.75rem;
}
.description {
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 2rem;
}
</style>
