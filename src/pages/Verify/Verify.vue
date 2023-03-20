<template>
  <div>Verify</div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";

const router = useRoute();
const code = router.params?.code;

watch(router.params, () => {
  console.log("router: ", router);
});
</script>

<style lang="scss" scoped></style>
