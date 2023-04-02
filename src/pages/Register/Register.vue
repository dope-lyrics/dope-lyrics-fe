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
  <Modal
    type="error"
    v-model="errorModal.show"
    :title="t('register.modal.error.title')"
    :description="errorModal.description"
    @confirm="errorModal.show = false"
  />
  <Modal
    type="success"
    v-model="successModal.show"
    :title="t('register.modal.success.title')"
    :description="successModal.description"
    @confirm="successModal.show = false"
  />
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { VF } from "@/utils/validateForm.js";
import FormButton from "@/components/common/ui/FormButton.vue";
import { useI18n } from "vue-i18n";
import { RegisterSchema, RegisterSchemaType } from "@/pages/Register/types";
import FormInput from "@/components/common/ui/FormInput.vue";
import WelcomeMessage from "@/components/common/WelcomeMessage.vue";
import TwoColumnLayout from "@/layouts/TwoColumnLayout.vue";
import TopLink from "@/components/common/TopLink.vue";
import BottomLink from "@/components/common/ui/BottomLink.vue";
import FormImage from "@/components/common/ui/FormImage.vue";
import { UserAPI } from "@/api/user/user";
import Modal from "@/components/modals/Modal.vue";

const { t } = useI18n();

const errorModal = reactive({
  show: false,
  description: "",
});

const successModal = reactive({
  show: false,
  description: "",
});

const formData = reactive({
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
  rememberMe: false,
});

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
      successModal.show = true;
      successModal.description = message;
    },
    onError: (error) => {
      errorModal.show = true;
      errorModal.description = error;
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
