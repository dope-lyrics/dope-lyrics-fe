<template>
  <div class="lyrics-container">
    <span v-if="isLoading">{{ t("common.loading") }}</span>
    <span v-else-if="isError"
      >{{ t("common.error") }}: {{ error?.message }}</span
    >

    <template v-else-if="lyricData">
      <LeftArrow @click="handlePrev" />
      <div class="lyrics-content">
        <Lyric
          v-for="(item, index) in lyricData"
          :key="item._id"
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
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { fetchLyrics } from "@/api/api";
import LeftArrow from "@/components/common/ui/LeftArrow.vue";
import RightArrow from "@/components/common/ui/RightArrow.vue";
import Lyric from "@/components/Lyric.vue";
import type { LyricProp } from "@/components/Lyric.vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { queryClient } from "@/main";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const selectedLyricIndex = ref(0);
const lyricRefs = ref<any>([]);
const lyricData = ref<LyricProp[]>([]);
const hasMore = ref(false);

onMounted(() => {
  lyricData.value = queryClient.getQueryData(["lyrics"]) || [];
});

const pagination = ref({
  page: 0, // 0 index based pagination
  limit: 10,
});
const lastFetchedIndex = ref(0);

const { isLoading, isError, data, error, fetchNextPage } = useInfiniteQuery<
  Awaited<ReturnType<typeof fetchLyrics>>,
  { message: string }
>({
  refetchInterval: 10000 * 60,
  staleTime: 5000,
  queryKey: ["lyrics"],
  queryFn: () =>
    fetchLyrics({
      page: pagination.value.page,
      limit: pagination.value.limit,
    }),
  getNextPageParam: (lastPage, allPages) => {
    hasMore.value = lastPage.hasMore;
    return lastPage.hasMore || undefined;
  },
});

watch(lastFetchedIndex, () => {
  if (
    (lastFetchedIndex.value + 1) % pagination.value.limit === 0 &&
    hasMore.value
  ) {
    fetchNextPage({
      pageParam: {
        page: ++pagination.value.page,
        limit: pagination.value.limit,
      },
    });
  }
});

watch(data, () => {
  const pages = data.value?.pages;

  if (!pages) return;

  lyricData.value =
    pagination.value.page === 0
      ? pages[0].data
      : [...lyricData.value, ...pages.at(-1)?.data];

  // update cache
  queryClient.setQueryData(["lyrics"], () => lyricData.value);
});

function handleRef(el: any, index: number) {
  if (el) {
    lyricRefs.value[index] = el.lyricRef;
  }
}

function handlePrev() {
  if (selectedLyricIndex.value === 0) {
    selectedLyricIndex.value = lyricData.value.length - 1;
    lyricRefs.value.at(selectedLyricIndex.value).scrollIntoView();
    return;
  }

  selectedLyricIndex.value -= 1;

  lyricRefs.value.at(selectedLyricIndex.value).scrollIntoView({
    behavior: "smooth",
  });
}

function handleNext() {
  if (selectedLyricIndex.value === lyricData.value.length - 1) {
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

  .lyrics-content {
    display: flex;
    overflow: hidden;
    width: 100%;
  }
}
</style>
