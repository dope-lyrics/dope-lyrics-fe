<template><img class="form-image" :src="src" :alt="alt" /></template>

<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
}>();
</script>

<style lang="scss" scoped>
.form-image {
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
