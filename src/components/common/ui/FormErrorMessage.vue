<template>
  <div v-show="message" class="form-error-message">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string | null }>();
</script>

<style lang="scss" scoped>
.form-error-message {
  font-size: 14px;
  font-weight: bold;
  border: 2px solid #ef4444;
  color: #ef4444;
  padding: 24px;
  margin: 40px 0;

  @include mobile {
    margin: 20px 0;
  }
}
</style>
