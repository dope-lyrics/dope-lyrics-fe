<template>
  <VueFinalModal
    class="generic-modal"
    content-class="generic-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1
      class="generic-modal-title"
      :class="{ error: type === 'error', success: type === 'success' }"
    >
      {{ title }}
    </h1>
    <p class="generic-modal-description">{{ description }}</p>
    <button @click="emit('confirm')">{{ t("common.close") }}</button>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { VueFinalModal } from "vue-final-modal";
defineProps<{
  type: "error" | "success";
  title?: string;
  description?: string | null;
}>();

const emit = defineEmits(["confirm"]);
const { t } = useI18n();
</script>

<style lang="scss">
.generic-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.generic-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 600px;
}
.generic-modal-content > * + * {
  margin: 0.5rem 0;
}

.generic-modal-title {
  padding-bottom: 10px;
  &.error {
    color: #ef4444;
    border-bottom: 2px solid #ef4444;
  }
  &.success {
    color: green;
    border-bottom: 2px solid green;
  }
}

.generic-modal-description {
  font-size: 18px;
  @include mobile {
    font-size: 16px;
  }
}
.generic-modal-content h1 {
  font-size: 1.375rem;
}
.generic-modal-content button {
  margin: 30px 0 0 auto;
  padding: 12px;
  font-size: 15px;
  border: 1px solid gray;
  background: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
}
.dark .generic-modal-content {
  background: #000;
}
</style>
