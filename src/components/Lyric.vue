<template>
  <div class="lyric-item" ref="lyricRef">
    <div class="lyric-content">
      <div>
        <div v-if="lyric.length > 0" class="lyric">
          <p v-for="_lyric in lyric">{{ _lyric }}</p>
        </div>
        <p class="singer">{{ singer }}</p>
        <p class="song">{{ song }}</p>
      </div>
      <div class="lyric-footer">
        <div>
          <div class="lyric-footer-title">{{ t("homepage.lyrics.mood") }}</div>
          <div class="lyric-footer-description">{{ mood }}</div>
        </div>
        <div>
          <div class="lyric-footer-title">
            {{ t("homepage.lyrics.addedBy") }}
          </div>
          <div class="lyric-footer-description">
            {{ owner?.username || "author" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export type LyricProp = {
  _id?: string;
  singer: string;
  mood: string;
  language: "en" | "tr";
  song: string;
  lyric: string[];
  owner: {
    username: string;
  };
};

const { t } = useI18n();

const lyricRef = ref();

defineProps<LyricProp>();
defineExpose({ lyricRef });
</script>

<style lang="scss" scoped>
.lyric-item {
  display: flex;
  flex-basis: 100%;
  flex-shrink: 0;
  align-items: center;

  .lyric-content {
    width: 100%;

    > *:first-child {
      display: flex;
      flex-direction: column;
      min-height: 140px;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding: 16px 16px 16px 16px;
      border: 1px solid #80808054;
      border-radius: 4px;

      @include mobile {
        height: auto;
      }
    }
    .lyric {
      p {
        font-size: 16px;
        font-weight: bold;
        font-family: "Kalam", cursive;
      }
    }
    .singer {
      font-size: 12px;
      margin-top: 12px;

      &::before {
        content: "-";
      }
    }
    .song {
      font-size: 10px;
    }
  }
  .lyric-footer {
    display: flex;
    justify-content: space-between;

    .lyric-footer-title {
      font-size: 12px;
    }
    .lyric-footer-description {
      font-size: 12px;
      font-weight: bold;
    }
  }
}
</style>
