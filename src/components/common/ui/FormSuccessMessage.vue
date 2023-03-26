<template>
  <div class="form-success-message" :class="{ show: show }">
    {{ message }}
  </div>
</template>
<script setup lang="ts">
defineProps<{ show: boolean; message: string }>();
</script>
<style lang="scss" scoped>
.form-success-message {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  border: 2px solid #22c55e;
  color: #22c55e;
  margin: 40px 0;
  opacity: 0;
  transition: opacity 1s, height 1s;
  height: 0;

  @include mobile {
    margin: 20px 0;
  }

  &.show {
    opacity: 1;
    height: 70px;
  }
}
</style>
