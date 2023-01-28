<template>
  <div class="home-container">
    <Header></Header>

    <section class="heading">
      <i18n-t keypath="homepage.welcome" tag="h3">
        <template v-slot:name>
          <i :style="{ color: '#ef4444' }">Dope Lyrics</i>
        </template>
        <template v-slot:title>
          <span :style="{ fontWeight: 'bold', color: 'blue' }">
            {{ store?.user?.username }}</span
          >
        </template>
      </i18n-t>
      <h4>{{ t("homepage.description") }}</h4>
    </section>
    <hr />

    <Lyrics />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Lyrics from "@/components/Lyrics.vue";
import Header from "@/components/common/Header.vue";
import { store } from "@/store/store";
const { t } = useI18n();
</script>
<style lang="scss" scoped>
.heading {
  padding: 0 24px;
  margin: 40px 0;

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
  padding-top: 66px;
}
</style>
