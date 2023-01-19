<template>
  <div class="left-arrow" @click="$emit('click')">
    <svg
      height="24"
      width="24"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <polygon
        points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 "
      />
    </svg>
  </div>
</template>
<script setup lang="ts">
defineEmits(["click"]);
</script>

<style scoped lang="scss">
.left-arrow {
  position: absolute;
  left: 10px;
  cursor: pointer;
}
</style>
