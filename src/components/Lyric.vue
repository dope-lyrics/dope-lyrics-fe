<template>
  <div class="lyric-item" ref="lyricRef">
    <div class="lyric-content">
      <div>
        <p class="lyric">{{ lyric }}</p>
        <p class="singer">{{ singer }}</p>
        <p class="song">{{ song }}</p>
      </div>
      <div class="lyric-footer">
        <div>
          <div class="lyric-footer-title">mood</div>
          <div class="lyric-footer-description">{{ mood }}</div>
        </div>
        <div>
          <div class="lyric-footer-title">written by</div>
          <div class="lyric-footer-description">
            {{ owner?.email || "author" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

export type LyricProp = {
  singer: string;
  mood: string;
  language: "en" | "tr";
  song: string;
  lyric: string;
  owner: {
    email: string;
  };
};

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
      align-items: flex-end;
      padding: 16px 16px 16px 16px;
      border: 1px solid #80808054;
      border-radius: 4px;
    }
    .lyric {
      font-size: 16px;
      font-weight: bold;
      font-family: "Kalam", cursive;
    }
    .singer {
      font-size: 12px;
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
