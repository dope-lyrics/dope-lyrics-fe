<template>
  <div class="form-input" :ref="inputRef">
    <label>{{ label }}</label>
    <input
      :type="type"
      :name="name"
      @input="handleChange"
      @focus="handleFocus"
      :maxlength="maxlength"
    />
    <div v-show="errors" class="form-error-field">
      <div v-for="_err in errors">{{ _err }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<FormInputProps>();
const emit = defineEmits(["change", "focus"]);

type FormInputProps = {
  label: string;
  type: string;
  name: string;
  inputRef: any;
  errors: string[];
  maxlength?: string;
};

const handleChange = (event: Event) => {
  emit("change", event);
};
const handleFocus = (event: Event) => {
  emit("focus", event);
};
</script>

<style lang="scss" scoped>
.form-input {
  label {
    display: block;
    font-size: 1rem;
    font-weight: 700;
    line-height: 2.5rem;
  }
  input {
    height: 2.5rem;
    width: 100%;
    margin: 0.5rem 0;
  }
}
</style>
