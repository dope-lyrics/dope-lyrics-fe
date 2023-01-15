<template>
  <div class="add-lyrics-page">
    <div class="left-side">
      <form class="add-lyrics-form" @submit.prevent="handleSubmit">
        <div class="add-lyrics-content">
          <h2>Add Lyrics</h2>
          <h3>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi,
            esse.
          </h3>
        </div>

        <div class="add-lyrics-song-name">
          <label>Song Name:</label>
          <input type="text" />
        </div>

        <div class="add-lyrics-song-type">
          <label>Song Type:</label>
          <input type="text" />
        </div>

        <div class="add-lyrics-song-lyrics">
          <label>Lyrics:</label>
          <textarea type="text" />
        </div>

        <div class="add-lyrics-button">
          <button>SAVE</button>
        </div>
      </form>
    </div>
    <div class="right-side">
      <img src="src/assets/images/add-lyrics-image.jpg" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { add } from "@/api/api";

function handleSubmit() {
  add({
    payload: {
      lyric: "The future is born, put the past in the casket",
      singer: "Lil Wayne",
      language: "en",
      mood: "banger",
    },
    errorCallback: (error) => {},
    successCallback: (response) => {},
  });
}
</script>
<style lang="scss" scoped>
.add-lyrics-page {
  display: flex;
  align-items: flex-start;
  height: 100vh;

  @include mobileOrTablet {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
  .left-side {
    width: 50%;
    margin-left: auto;
    margin-right: auto;

    @include mobileOrTablet {
      width: 100%;
    }
    .add-lyrics-form {
      padding: 3rem;
      width: 50%;
      margin: auto;
      @include mobileOrTablet {
        margin: 0;
        width: 100%;
      }
      label {
        display: block;
        font-size: 1rem;
        font-weight: 700;
        line-height: 2.5rem;
      }
      input {
        height: 2.5rem;
        width: 100%;
        margin: 0.5rem 0;
      }
      textarea {
        height: 20rem;
        width: 100%;
      }

      .add-lyrics-button {
        text-align: center;
        margin: 1rem 0.2rem 1rem 0.2rem;
        button {
          display: block;
          margin: 1rem auto;
          height: 3rem;
          width: 100%;
          border: none;
          border-radius: 30px;
          background-color: #3b82f6;
        }
      }
    }
  }
  .right-side {
    width: 50%;
    height: 100%;

    @include mobileOrTablet {
      width: 100%;
      height: 30%;
    }
    img {
      max-width: 100%;
      max-height: 100%;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
