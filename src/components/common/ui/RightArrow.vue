<template>
  <div class="right-arrow" @click="$emit('click')">
    <svg
      height="24"
      width="24"
      id="Layer_1"
      style="enable-background: new 0 0 512 512"
      version="1.1"
      viewBox="0 0 512 512"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <polygon
        points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineEmits(["click"]);
</script>

<style scoped lang="scss">
.right-arrow {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
</style>
