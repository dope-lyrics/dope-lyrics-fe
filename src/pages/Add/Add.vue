<template>
  <div class="add-lyrics-page">
    <TwoColumnLayout>
      <template #left>
        <form class="add-lyrics-form" @submit.prevent="handleSubmit">
          <TopLink to="/"> {{ t("common.backToHome") }} </TopLink>

          <WelcomeMessage
            :title="t('add.addLyrics')"
            :description="t('add.description')"
          />

          <FormInput
            :label="t('add.form.singer')"
            type="text"
            name="singer"
            @focus="handleFocus"
            @change="handleChange"
            :inputRef="inputRefs.singer"
            :errors="errors.singer"
          />

          <FormInput
            :label="t('add.form.songName')"
            type="text"
            name="song"
            @focus="handleFocus"
            @change="handleChange"
            :inputRef="inputRefs.song"
            :errors="errors.song"
          />

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

          <FormSuccessMessage
            :show="showSuccessMessage"
            :message="t('add.message.success')"
          />
          <FormErrorMessage :message="errorMessage" />
          <FormButton>{{ t("add.form.button.save") }}</FormButton>
        </form>
      </template>
      <template #right>
        <div class="right-side">
          <FormImage alt="add image" :src="addImage" /></div
      ></template>
    </TwoColumnLayout>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { LyricAPI } from "@/api/lyric/lyric";
import { AddSchema, AddSchemaFormType } from "@/pages/Add/types";
import { VF } from "@/utils/validateForm.js";
import FormButton from "@/components/common/ui/FormButton.vue";
import { useI18n } from "vue-i18n";
import { useQuery } from "@tanstack/vue-query";
import { timeAsMs } from "@/utils/time";
import FormImage from "@/components/common/ui/FormImage.vue";
import TwoColumnLayout from "@/layouts/TwoColumnLayout.vue";
import TopLink from "@/components/common/TopLink.vue";
import WelcomeMessage from "@/components/common/WelcomeMessage.vue";
import FormErrorMessage from "@/components/common/ui/FormErrorMessage.vue";
import FormSuccessMessage from "@/components/common/ui/FormSuccessMessage.vue";
import FormInput from "@/components/common/ui/FormInput.vue";
import addImage from "@/assets/images/add-lyrics-image.jpg";

const { t } = useI18n();

const { data: moods } = useQuery({
  queryKey: ["moods"],
  queryFn: () => LyricAPI.fetchMoods(),
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

const errorMessage = ref<null | string>(null);
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

  LyricAPI.add({
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
  h3 {
    font-weight: 500;
  }

  .add-lyrics-form {
    padding: 3rem;
    max-width: 800px;

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
    textarea {
      height: 8rem;
      width: 100%;
    }
    select {
      width: 100%;
      height: 40px;
    }
  }

  .right-side {
    height: 100%;
  }
}
</style>
