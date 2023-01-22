<template>
  <header class="already-logged-in">
    <h1>You already logged in!</h1>
    <div>You will be redirected to homepage in 3 seconds</div>
    <div></div>
  </header>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push({ name: "Home" });
  }, 3000);
});
</script>
<style lang="scss" scoped>
.already-logged-in {
  max-width: 1024px;
  margin: 0 auto;
  padding: 24px;
}
</style>
