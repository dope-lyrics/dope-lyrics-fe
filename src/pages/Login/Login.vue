<template>
  <div class="login-page">
    <div class="left-side">
      <form class="login-form" @submit.prevent="handleSubmit">
        <RouterLink class="link" to="/">Go to Home</RouterLink>

        <div class="login-form-content">
          <h2>Welcome back</h2>
          <h3>Enter your details below</h3>
        </div>
        <div class="login-form-username" :ref="inputRefs.username">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            @input="handleChange"
            @focus="handleFocus"
          />
          <div v-show="errors.username" class="form-error-field">
            {{ errors.username }}
          </div>
        </div>
        <div class="login-form-password" :ref="inputRefs.password">
          <div class="login-form-password-subtitles">
            <label>Password:</label>
          </div>
          <input
            type="password"
            name="password"
            @input="handleChange"
            @focus="handleFocus"
          />
          <div v-show="errors.password" class="form-error-field">
            {{ errors.password }}
          </div>
        </div>

        <div v-show="errorMessage" class="login-form-error-message">
          {{ errorMessage }}
        </div>

        <FormButton>Log In</FormButton>
      </form>
    </div>
    <div class="right-side">
      <img src="@/assets/images/login-horizontal.jpeg" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, Ref } from "vue";
import { login } from "@/api/api";
import { VF } from "@/utils/validateForm.js";
import { LoginSchema } from "@/pages/Login/types";
import type { LoginSchemaType } from "@/pages/Login/types";
import { useRouter, RouterLink, onBeforeRouteLeave } from "vue-router";
import { store } from "@/store/store";
import { privateRoutes } from "@/router/router";
import FormButton from "@/components/common/ui/FormButton.vue";

onBeforeRouteLeave((to, from) => {
  store.requestedFrom = "";
});

const router = useRouter();

const formData = reactive({
  username: "",
  password: "",
  rememberMe: false,
});
const errors = reactive({
  username: "",
  password: "",
});

const inputRefs: { [key: string]: Ref<HTMLDivElement | undefined> } = {
  username: ref<HTMLDivElement>(),
  password: ref<HTMLDivElement>(),
};

const errorMessage = ref<null | string[] | string[][]>(null);

const { validateForm, onFocus } = VF<LoginSchemaType>({
  formData,
  schema: LoginSchema,
  inputRefs,
  reactiveErrors: errors,
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

  login({
    payload: formData,
    onSuccess: (data) => {
      store.user = data.user;
      navigate();
    },
    onError: (error) => {
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

    .login-form {
      padding: 3rem;
      width: 50%;
      margin: auto;

      @include mobileOrTablet {
        margin: 0;
        width: 100%;
      }

      .link {
        color: #3b82f6;
        font-weight: bold;
      }

      .login-form-content {
        h2 {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.75rem;
        }
        h3 {
          font-size: 1.25rem;
          font-weight: 400;
          letter-spacing: 0.3px;
          line-height: 2rem;
        }
      }
      .login-form-username {
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
      }
      .login-form-password {
        .login-form-password-subtitles {
          display: flex;
          justify-content: space-between;
          label {
            display: block;
            font-size: 1rem;
            font-weight: 700;
            line-height: 2.5rem;
          }
          span {
            a {
              font-size: 0.875rem;
              font-weight: 400;
              line-height: 1rem;
              color: #3b82f6;
            }
          }
        }
        input {
          height: 2.5rem;
          width: 100%;
          margin: 0.5rem 0;
        }
      }
      .login-form-checkbox {
        display: flex;
        margin: 1rem 0.2rem 1rem 0.2rem;
        label {
          color: #110f24;
          font-size: 1rem;
          line-height: 1.5rem;
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
