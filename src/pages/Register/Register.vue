<template>
  <div class="register-page">
    <TwoColumnLayout>
      <template #left>
        <form class="register-form" @submit.prevent="handleSubmit">
          <TopLink to="/">{{ t("common.backToHome") }}</TopLink>

          <WelcomeMessage
            :title="t('login.welcomeBack')"
            :description="t('register.enterDetails')"
          />
          <FormInput
            :label="t('login.form.username')"
            type="text"
            name="username"
            @focus="handleFocus"
            @change="handleChange"
            :inputRef="inputRefs.username"
            :errors="errors.username"
          />
          <FormInput
            :label="t('login.form.email')"
            type="text"
            name="email"
            @focus="handleFocus"
            @change="handleChange"
            :inputRef="inputRefs.email"
            :errors="errors.email"
          />
          <FormInput
            :label="t('login.form.password')"
            type="password"
            name="password"
            @focus="handleFocus"
            @change="handleChange"
            :inputRef="inputRefs.password"
            :errors="errors.password"
          />
          <FormInput
            :label="t('register.form.reEnterPassword')"
            type="password"
            name="passwordConfirm"
            @focus="handleFocus"
            @change="handleChange"
            :inputRef="inputRefs.passwordConfirm"
            :errors="errors.passwordConfirm"
          />

          <FormErrorMessage :message="errorMessage" />

          <FormButton> {{ t("register.form.submit") }}</FormButton>
        </form>

        <BottomLink :label="t('register.haveAccount')" to="/login">
          {{ t("register.login") }}
        </BottomLink>
      </template>
      <template #right>
        <div class="right">
          <figure>
            <FormImage
              alt="verify image"
              src="/src/assets/images/verify-page-pic.jpg"
            />
            <figcaption>
              <a href="https://unsplash.com/photos/z1d-LP8sjuI"
                >Unsplash @helloimnik</a
              >
            </figcaption>
          </figure>
        </div>
      </template>
    </TwoColumnLayout>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { VF } from "@/utils/validateForm.js";
import FormButton from "@/components/common/ui/FormButton.vue";
import { useI18n } from "vue-i18n";
import { RegisterSchema, RegisterSchemaType } from "@/pages/Register/types";
import FormInput from "@/components/common/ui/FormInput.vue";
import WelcomeMessage from "@/components/common/ui/WelcomeMessage.vue";
import TwoColumnLayout from "@/layouts/TwoColumnLayout.vue";
import TopLink from "@/components/common/ui/TopLink.vue";
import FormErrorMessage from "@/components/common/ui/FormErrorMessage.vue";
import BottomLink from "@/components/common/ui/BottomLink.vue";
import FormImage from "@/components/common/ui/FormImage.vue";
import { UserAPI } from "@/api/user/user";

const { t } = useI18n();

const formData = reactive({
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
  rememberMe: false,
});
const errorMessage = ref<null | string>(null);

const { validateForm, onFocus, errors, inputRefs } = VF<RegisterSchemaType>({
  formData,
  schema: RegisterSchema,
});

function handleSubmit() {
  const { isFormValid } = validateForm();

  if (!isFormValid) return;

  UserAPI.register({
    payload: formData,
    onSuccess: (message) => {
      alert(message);
    },
    onError: (error) => {
      console.log(error);
      alert(error);
    },
  });
}

function handleChange(event: Event) {
  const element = event.target as HTMLInputElement;

  // @ts-ignore
  formData[element.name] =
    element.type === "checkbox" ? element.checked : element.value;
}

function handleFocus(event: Event) {
  onFocus(event);
}
</script>

<style lang="scss" scoped>
.register-page {
  .register-form {
    padding: 3rem 3rem 0;
    max-width: 800px;

    @include mobileOrTablet {
      margin: 0;
      width: 100%;
    }
  }
  .right {
    height: 100%;
    figure {
      height: calc(100% - 26px);
      margin: 0;
      figcaption {
        text-align: center;
      }
    }
  }
}
</style>
