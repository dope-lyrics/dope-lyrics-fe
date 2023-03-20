<template>
  <div v-show="message" class="form-error-message">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string | null }>();
</script>

<style lang=""></style>
