<template>
  <div class="add-lyrics-page">
    <div class="left-side">
      <form class="add-lyrics-form" @submit.prevent="handleSubmit">
        <RouterLink class="link" to="/">{{
          t("common.backToHome")
        }}</RouterLink>
        <div class="add-lyrics-content">
          <h2>{{ t("add.addLyrics") }}</h2>
          <h3>{{ t("add.description") }}</h3>
        </div>

        <div class="add-lyrics-singer" :ref="inputRefs.singer">
          <label>{{ t("add.form.singer") }}</label>
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
          <label>{{ t("add.form.songName") }}</label>
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
          <label>{{ t("add.form.mood") }}</label>
          <select
            v-if="moods && moods?.length > 0"
            name="mood"
            @change="handleChange"
            @focus="handleFocus"
          >
            <option value="">{{ t("common.form.select.choose") }}</option>
            <option v-for="mood in moods" :value="mood.key">
              {{ mood.value }}
            </option>
          </select>
          <div v-show="errors.mood" class="form-error-field">
            {{ errors.mood }}
          </div>
        </div>

        <div class="add-lyrics-song-lyrics" :ref="inputRefs.lyric">
          <label>{{ t("add.form.lyrics") }}</label>
          <textarea
            type="text"
            name="lyric"
            @input="handleChange"
            @focus="handleFocus"
            :value="formData.lyric"
            maxlength="144"
          ></textarea>
          <div v-show="errors.lyric" class="form-error-field">
            {{ errors.lyric }}
          </div>
        </div>

        <div class="add-lyrics-song-language" :ref="inputRefs.language">
          <label>{{ t("add.form.language") }}</label>
          <select name="language" @change="handleChange" @focus="handleFocus">
            <option value="">{{ t("common.form.select.choose") }}</option>
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
          </select>
          <div v-show="errors.language" class="form-error-field">
            {{ errors.language }}
          </div>
        </div>

        <div
          class="login-form-success-message"
          :class="{ show: showSuccessMessage }"
        >
          {{ t("add.message.success") }}
        </div>

        <div v-show="errorMessage" class="login-form-error-message">
          {{ errorMessage }}
        </div>
        <FormButton>{{ t("add.form.button.save") }}</FormButton>
      </form>
    </div>
    <div class="right-side">
      <img src="@/assets/images/add-lyrics-image.jpg" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { API } from "@/api/api";
import { AddSchema, AddSchemaFormType } from "@/pages/Add/types";
import { VF } from "@/utils/validateForm.js";
import FormButton from "@/components/common/ui/FormButton.vue";
import { useI18n } from "vue-i18n";
import { useQuery } from "@tanstack/vue-query";
import { timeAsMs } from "@/utils/time";

const { t } = useI18n();

const { data: moods } = useQuery({
  queryKey: ["moods"],
  queryFn: () => API.fetchMoods(),
  staleTime: timeAsMs(10, "minutes"),
});

const initialData = {
  singer: "",
  song: "",
  lyric: "",
  language: "",
  mood: "",
};

let formData = ref({ ...initialData });

const errorMessage = ref<null | string[] | string[][]>(null);
const showSuccessMessage = ref(false);

const { validateForm, onFocus, errors, inputRefs } = VF<AddSchemaFormType>({
  formData: formData.value,
  schema: AddSchema,
});

function handleChange(event: Event) {
  const element = event.target as HTMLInputElement | HTMLSelectElement;

  // @ts-ignore
  formData.value[element.name] = element.value;
}

function handleFocus(event: Event) {
  onFocus(event);
}

function handleSubmit() {
  const { isFormValid } = validateForm();

  if (!isFormValid) return;

  const payload = {
    ...formData.value,
    lyric: formData.value.lyric.split("\n").map((line) => line.trim()),
  };

  API.add({
    payload: payload,
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
      select {
        width: 100%;
        height: 40px;
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
