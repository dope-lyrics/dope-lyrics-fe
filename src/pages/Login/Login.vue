<template>
  <div class="login-page">
    <TwoColumnLayout>
      <template #left>
        <form class="login-form" @submit.prevent="handleSubmit">
          <TopLink to="/"> {{ t("common.backToHome") }}</TopLink>

          <WelcomeMessage
            :title="t('login.welcomeBack')"
            :description="t('login.enterDetails')"
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
            :label="t('login.form.password')"
            type="password"
            name="password"
            @focus="handleFocus"
            @change="handleChange"
            :inputRef="inputRefs.password"
            :errors="errors.password"
          />

          <FormErrorMessage :message="errorMessage" />

          <FormButton>{{ t("login.form.login") }}</FormButton>
        </form>

        <BottomLink :label="t('login.dontHaveAccount')" to="/register">
          {{ t("login.register") }}
        </BottomLink>
      </template>
      <template #right>
        <div class="right">
          <FormImage
            src="/src/assets/images/login-horizontal.jpeg"
            alt="login image"
          />
        </div>
      </template>
    </TwoColumnLayout>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { UserAPI } from "@/api/user/user";
import { VF } from "@/utils/validateForm.js";
import { LoginSchema } from "@/pages/Login/types";
import type { LoginSchemaType } from "@/pages/Login/types";
import { useRouter, RouterLink, onBeforeRouteLeave } from "vue-router";
import { store } from "@/store/store";
import { privateRoutes } from "@/router/routes";
import FormButton from "@/components/common/ui/FormButton.vue";
import { useI18n } from "vue-i18n";
import TwoColumnLayout from "@/layouts/TwoColumnLayout.vue";
import FormInput from "@/components/common/ui/FormInput.vue";
import WelcomeMessage from "@/components/common/WelcomeMessage.vue";
import FormErrorMessage from "@/components/common/ui/FormErrorMessage.vue";
import BottomLink from "@/components/common/ui/BottomLink.vue";
import TopLink from "@/components/common/TopLink.vue";
import FormImage from "@/components/common/ui/FormImage.vue";

onBeforeRouteLeave((to, from) => {
  store.requestedFrom = "";
});

const router = useRouter();
const { t } = useI18n();

const formData = reactive({
  username: "",
  password: "",
  rememberMe: false,
});
const errorMessage = ref<string | null>(null);

const { validateForm, onFocus, errors, inputRefs } = VF<LoginSchemaType>({
  formData,
  schema: LoginSchema,
});

function navigate() {
  if (!store.requestedFrom) {
    router.push({ name: "Home" });
    return;
  }

  const requester = privateRoutes.find(
    (routeName) => routeName === store.requestedFrom
  );

  if (requester) {
    router.push({ name: requester });
  }
}

function handleSubmit() {
  const { isFormValid } = validateForm();

  if (!isFormValid) return;

  UserAPI.login({
    payload: formData,
    onSuccess: () => {
      navigate();
    },
    onError: (error: string) => {
      errorMessage.value = error;
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
.login-page {
  .login-form {
    padding: 3rem 3rem 0;
    max-width: 800px;

    @include mobileOrTablet {
      margin: 0;
      width: 100%;
    }
  }
  .right {
    height: 100%;
  }
}
</style>
