<template>
  <div>
    <h1>Add</h1>
    <button @click="handleClick">Call add api</button>
    <p>Api status: {{ status }}</p>
  </div>
</template>
<script setup lang="ts">
import { add } from "@/api/api";
import { ref } from "vue";

const status = ref<any>(null);

function handleClick() {
  add({
    payload: {
      lyric: "Ya sev, ister vazgeç beklentiler sadece üzer",
      singer: "Athena",
      language: "tr",
    },
    errorCallback: (error) => {
      status.value = error;
    },
    successCallback: (response) => {
      status.value = "Success";
    },
  });
}
</script>
<style lang="scss"></style>
