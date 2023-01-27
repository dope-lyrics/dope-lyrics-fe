<template>
  <div class="home-container">
    <section class="heading">
      <h2>
        <div
          v-if="store?.user?.username"
          :style="{ fontWeight: 'bold', color: 'blue' }"
        >
          Hi {{ store?.user.username }}
        </div>
        Welcome to <i>Dope Lyrics</i>
      </h2>
      <h4>Share your favorite lyric with the world!</h4>
      <h4>And read theirs</h4>
    </section>
    <hr />

    <Lyrics />

    <section :style="{ marginTop: '60px' }">
      <RouterLink to="/login">LOGIN</RouterLink>

      <RouterLink to="/add">
        <h3>Start sharing the best lyrics of your pick!</h3>
      </RouterLink>
    </section>
  </div>
</template>
<script setup lang="ts">
import Lyrics from "@/components/Lyrics.vue";
import { store } from "@/store/store";
import { RouterLink } from "vue-router";
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
