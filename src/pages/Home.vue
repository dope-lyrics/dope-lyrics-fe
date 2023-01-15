<template>
  <div>
    <h1>Home</h1>
    <div>Fetch status : {{ fetchStatus }}</div>
    <div>
      <div v-for="lyric in lyricsData">
        {{ lyric.lyric }}
      </div>
    </div>

    <section :style="{ marginTop: '50px' }">
      <label for="">Find by mood</label>
      <input type="text" @input="handleMood" />
      <div>
        <button @click="findByMood">Search</button>
      </div>
      <div>
        <div v-for="filteredLyric in lyricsByMood">
          {{ filteredLyric }}
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { fetchLyrics } from "@/api/api";
import axios from "@/axios/axios";
import { onMounted, ref, reactive } from "vue";

const lyricsData = ref<any>([]);
const fetchStatus = ref("");
const moodSearchInput = ref("");
const lyricsByMood = reactive<any[]>([]);

onMounted(() => {
  fetchLyrics({
    successCallback: (response) => {
      lyricsData.value = response;
      fetchStatus.value = "success";
    },
    errorCallback: (error) => {
      fetchStatus.value = error.toString();
      fetchStatus.value = "fail";
    },
  });
});

function handleMood(event: any) {
  moodSearchInput.value = event.target.value;
}
async function findByMood() {
  const response = await axios.get("lyrics/" + moodSearchInput.value);
  console.log(response);
}
</script>
<style lang=""></style>
