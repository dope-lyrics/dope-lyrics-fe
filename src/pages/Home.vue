<template>
  <div class="home-container">
    <section class="heading">
      <h2>Welcome to <i>Dope Lyrics</i></h2>
      <h4>Share your favorite lyric with the world!</h4>
      <h4>And read theirs</h4>
    </section>
    <hr />

    <Lyrics />
  </div>
</template>
<script setup lang="ts">
import Lyrics from "@/components/Lyrics.vue";
</script>
<style lang="scss" scoped>
.heading {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    margin-bottom: 4px;
  }
  h4 {
    font-weight: 500;
  }
}

.home-container {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
