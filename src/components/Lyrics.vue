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
import { ref, onMounted, watch } from "vue";
import { fetchLyrics } from "@/api/api";
import LeftArrow from "@/components/common/ui/LeftArrow.vue";
import RightArrow from "@/components/common/ui/RightArrow.vue";
import Lyric from "@/components/Lyric.vue";
import type { LyricProp } from "@/components/Lyric.vue";

const lyricsData = ref<LyricProp[]>([]);
const selectedLyricIndex = ref(0);
const lyricRefs = ref<any>([]);

// related to pagination
const hasMore = ref(false);
const pagination = ref({
  page: 0, // 0 index based pagination
  limit: 10,
});
const lastFetchedIndex = ref(0);
//

onMounted(() => {
  fetchData();
});

watch(lastFetchedIndex, () => {
  if (
    (lastFetchedIndex.value + 1) % pagination.value.limit === 0 &&
    hasMore.value
  ) {
    fetchData(++pagination.value.page);
  }
});

function handleRef(el: any, index: number) {
  if (el) {
    lyricRefs.value[index] = el.lyricRef;
  }
}

function handlePrev() {
  if (selectedLyricIndex.value === 0) {
    selectedLyricIndex.value = lyricsData.value.length - 1;
    lyricRefs.value.at(selectedLyricIndex.value).scrollIntoView();
    return;
  }

  selectedLyricIndex.value -= 1;

  lyricRefs.value.at(selectedLyricIndex.value).scrollIntoView({
    behavior: "smooth",
  });
}

function handleNext() {
  if (selectedLyricIndex.value === lyricsData.value.length - 1) {
    selectedLyricIndex.value = 0;
    lyricRefs.value.at(selectedLyricIndex.value).scrollIntoView();
    return;
  }

  // to avoid not fetching data when going previous lyrics.
  if (selectedLyricIndex.value >= lastFetchedIndex.value) {
    lastFetchedIndex.value += 1;
  }

  selectedLyricIndex.value += 1;

  lyricRefs.value.at(selectedLyricIndex.value).scrollIntoView({
    behavior: "smooth",
  });
}

function fetchData(page?: number) {
  let _page = page || pagination.value.page;
  fetchLyrics({
    pagination: {
      page: _page.toString(),
      limit: pagination.value.limit.toString(),
    },
    onSuccess: (response) => {
      lyricsData.value = lyricsData.value.concat(response?.lyrics);
      hasMore.value = response?.hasMore;
    },
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
