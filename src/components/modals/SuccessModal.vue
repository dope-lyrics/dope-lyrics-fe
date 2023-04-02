<template>
  <VueFinalModal
    class="modal"
    content-class="modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1>{{ title }}</h1>
    <slot />
    <button @click="emit('confirm')">Confirm</button>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
defineProps<{
  title?: string;
}>();

const emit = defineEmits(["confirm"]);
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 600px;
}
.modal-content > * + * {
  margin: 0.5rem 0;
}
.modal-content h1 {
  font-size: 1.375rem;
}
.modal-content button {
  margin: 0.25rem 0 0 auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
}
.dark .modal-content {
  background: #000;
}
</style>
