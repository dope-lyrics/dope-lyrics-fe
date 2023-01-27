<template>
  <div class="button-container">
    <button @click="$emit('click')">
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits(["click"]);
</script>

<style lang="scss" scoped>
.button-container {
  text-align: center;
  margin: 1rem 0.2rem 1rem 0.2rem;

  button {
    display: block;
    margin: 1rem auto;
    height: 3rem;
    width: 100%;
    border: none;
    border-radius: 30px;
    background-color: #3b82f6;
    cursor: pointer;
    color: #fff;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
