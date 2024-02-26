<template>
  <div class="form-input" :ref="props.inputRef">
    <label :for="`input-${props.name}`">{{ label }}</label>
    <input
      :id="`input-${props.name}`"
      :type="props.type"
      :name="props.name"
      @input="handleChange"
      @focus="handleFocus"
      :maxlength="props.maxlength"
    />
    <div
      v-if="props.errors.length > 0"
      class="form-error-field"
      :class="{ [props.name]: props.name }"
    >
      <div v-for="_err in props.errors">{{ _err }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<FormInputProps>();
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
