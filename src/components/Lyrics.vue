<template>
  <div class="lyrics-container">
    <LeftArrow @click="handlePrev" />
    <div class="lyric-content">
      <Lyric
        v-for="(item, index) in lyricsData"
        key="item.id"
        :singer="item.singer"
        :mood="item.mood"
        :language="item.language"
        :song="item.song"
        :lyric="item.lyric"
        :owner="item?.owner"
        :ref="(el) => handleRef(el, index)"
      />
    </div>
    <RightArrow @click="handleNext" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchLyrics } from "@/api/api";
import LeftArrow from "@/components/common/ui/LeftArrow.vue";
import RightArrow from "@/components/common/ui/RightArrow.vue";
import Lyric from "@/components/Lyric.vue";
import type { LyricProp } from "@/components/Lyric.vue";

const lyricsData = ref<LyricProp[]>([]);
const selectedLyricIndex = ref(0);
const lyricRefs = ref<any>([]);

function handleRef(el: any, index: number) {
  lyricRefs.value[index] = el.lyricRef;
}

onMounted(() => {
  fetchLyrics({
    onSuccess: (response) => {
      lyricsData.value = response;
      console.log("Lyrics data: ", JSON.stringify(response, null, 2));
    },
    onError: (error) => {},
  });
});

function handlePrev() {
  if (selectedLyricIndex.value === 0) {
    selectedLyricIndex.value = lyricsData.value.length - 1;
    (
      lyricRefs.value.at(selectedLyricIndex.value) as HTMLElement
    ).scrollIntoView();
    return;
  }

  selectedLyricIndex.value -= 1;

  (lyricRefs.value.at(selectedLyricIndex.value) as HTMLElement).scrollIntoView({
    behavior: "smooth",
  });
}

function handleNext() {
  if (selectedLyricIndex.value === lyricsData.value.length - 1) {
    selectedLyricIndex.value = 0;
    (
      lyricRefs.value.at(selectedLyricIndex.value) as HTMLElement
    ).scrollIntoView();
    return;
  }

  selectedLyricIndex.value += 1;

  (lyricRefs.value.at(selectedLyricIndex.value) as HTMLElement).scrollIntoView({
    behavior: "smooth",
  });
}
</script>
<style lang="scss" scoped>
.lyrics-container {
  display: flex;
  padding-left: 48px;
  padding-right: 48px;
  position: relative;
  align-items: center;
  margin-top: 50px;

  @include mobile {
    margin-top: 20px;
  }

  .lyric-content {
    display: flex;
    overflow: hidden;
  }
}
</style>
