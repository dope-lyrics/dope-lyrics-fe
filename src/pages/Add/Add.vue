<template>
  <div class="add-lyrics-page">
    <div class="left-side">
      <form class="add-lyrics-form" @submit.prevent="handleSubmit">
        <RouterLink class="link" to="/">Go to Home</RouterLink>
        <div class="add-lyrics-content">
          <h2>Add Lyrics</h2>
          <h3>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi,
            esse.
          </h3>
        </div>

        <div class="add-lyrics-singer" :ref="inputRefs.singer">
          <label>Singer:</label>
          <input
            type="text"
            name="singer"
            @input="handleChange"
            @focus="handleFocus"
            :value="formData.singer"
          />
          <div v-show="errors.singer" class="form-error-field">
            {{ errors.singer }}
          </div>
        </div>
        <div class="add-lyrics-song-name" :ref="inputRefs.song">
          <label>Song Name:</label>
          <input
            type="text"
            name="song"
            @input="handleChange"
            @focus="handleFocus"
            :value="formData.song"
          />
          <div v-show="errors.song" class="form-error-field">
            {{ errors.song }}
          </div>
        </div>

        <div class="add-lyrics-mood" :ref="inputRefs.mood">
          <label>Mood:</label>
          <input
            type="text"
            name="mood"
            @input="handleChange"
            @focus="handleFocus"
            :value="formData.mood"
          />
          <div v-show="errors.mood" class="form-error-field">
            {{ errors.mood }}
          </div>
        </div>

        <div class="add-lyrics-song-lyrics" :ref="inputRefs.lyric">
          <label>Lyrics:</label>
          <textarea
            type="text"
            name="lyric"
            @input="handleChange"
            @focus="handleFocus"
            :value="formData.lyric"
          ></textarea>
          <div v-show="errors.lyric" class="form-error-field">
            {{ errors.lyric }}
          </div>
        </div>

        <div class="add-lyrics-song-language" :ref="inputRefs.language">
          <label>Language:</label>
          <select
            name="language"
            @change="handleChange"
            :value="formData.language"
          >
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
          </select>
          <!-- <div v-show="errors.language" class="form-error-field">
            {{ errors.language }}
          </div> -->
        </div>

        <div
          class="login-form-success-message"
          :class="{ show: showSuccessMessage }"
        >
          Lyric has been added successfully!
        </div>

        <div v-show="errorMessage" class="login-form-error-message">
          {{ errorMessage }}
        </div>
        <FormButton>Save</FormButton>
      </form>
    </div>
    <div class="right-side">
      <img src="src/assets/images/add-lyrics-image.jpg" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, Ref } from "vue";
import { RouterLink } from "vue-router";
import { add } from "@/api/api";
import { AddSchema, AddSchemaType } from "@/pages/Add/types";
import { VF } from "@/utils/validateForm.js";
import FormButton from "@/components/common/ui/FormButton.vue";

const initialData = {
  singer: "",
  song: "",
  lyric: "",
  language: "tr",
  mood: "",
};

let formData = ref({ ...initialData });

const errors = reactive({
  singer: "",
  song: "",
  lyric: "",
  language: "tr",
  mood: "",
});

const inputRefs: { [key: string]: Ref<HTMLDivElement | undefined> } = {
  singer: ref<HTMLDivElement>(),
  song: ref<HTMLDivElement>(),
  lyric: ref<HTMLDivElement>(),
  language: ref<HTMLDivElement>(),
  mood: ref<HTMLDivElement>(),
};

const errorMessage = ref<null | string[] | string[][]>(null);
const showSuccessMessage = ref(false);

const { validateForm, onFocus } = VF<AddSchemaType>({
  formData: formData.value,
  schema: AddSchema,
  inputRefs,
  reactiveErrors: errors,
});

function handleChange(event: Event) {
  const element = event.target as HTMLInputElement;
  // @ts-ignore
  formData.value[element.name] = element.value;
}

function handleFocus(event: Event) {
  onFocus(event);
}

function handleSubmit() {
  const { isFormValid } = validateForm();

  if (!isFormValid) return;

  add({
    payload: formData.value,
    onSuccess: (response) => {
      showSuccessMessage.value = true;

      // reset form
      formData.value = initialData;

      // hide success message after 3 seconds
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 3000);
    },
    onError: (error) => {
      errorMessage.value = error;
    },
  });
}
</script>
<style lang="scss" scoped>
.add-lyrics-page {
  display: flex;
  align-items: flex-start;
  height: 100vh;

  h3 {
    font-weight: 500;
  }

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
        height: 8rem;
        width: 100%;
      }
    }

    .link {
      color: #3b82f6;
      font-weight: bold;
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