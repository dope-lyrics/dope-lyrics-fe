<template>
  <div id="loginPage">
    <div class="left-side">
      <form class="login-form" @submit.prevent="handleSubmit">
        <div class="login-form-content">
          <h2>Welcome back</h2>
          <h3>Enter your details below</h3>
        </div>
        <div class="login-form-email">
          <span>Email:</span>
          <input name="email" type="text" @input="handleChange" />
        </div>
        <div class="login-form-password">
          <div class="login-form-password-subtitles">
            <span>Password:</span>
            <span>
              <a href="#">Forgot password?</a>
            </span>
          </div>
          <input type="password" name="password" @input="handleChange" />
        </div>
        <div class="login-form-checkbox">
          <input name="rememberMe" type="checkbox" @input="handleChange" />
          <span>Remember Me</span>
        </div>
        <div class="login-form-bottom">
          <button>Log In</button>
          <span>Don't have an account? </span>
          <a href="#">Sign Up</a>
        </div>
      </form>
    </div>
    <div class="right-side">
      <img src="@/assets/images/login-horizontal.jpeg" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import axios from "@/axios/axios";
import { login } from "@/api/api";

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const formValues: FormValues = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

function handleSubmit() {
  const payload = {
    email: formValues.email,
    password: formValues.password,
  };
  login({
    payload,
  });
}

function handleChange(event: Event) {
  const element = event.target as HTMLInputElement;

  // @ts-ignore
  formValues[element.name] =
    element.type === "checkbox" ? element.checked : element.value;
}
</script>
<style lang="scss">
#loginPage {
  display: flex;
  background-color: #fff;
  align-items: flex-start;
  height: 100vh;

  @include mobile {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }

  .left-side {
    width: 50%;
    margin-left: auto;
    margin-right: auto;

    @include mobile {
      width: 100%;
    }

    .login-form {
      padding: 3rem;

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

      .login-form-email {
        span {
          display: block;
          font-size: 1rem;
          font-weight: 700;
          line-height: 2.5rem;
        }
        input {
          height: 2.5rem;
          min-width: 100%;
          min-width: 20rem;
        }
      }

      .login-form-password {
        .login-form-password-subtitles {
          display: flex;
          justify-content: space-between;
          span {
            display: block;
            font-size: 1rem;
            font-weight: 700;
            line-height: 2.5rem;
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
          min-width: 20rem;
        }
      }

      .login-form-checkbox {
        display: flex;
        margin: 1rem 0.2rem 1rem 0.2rem;
        span {
          color: #110f24;
          font-size: 1rem;
          line-height: 1.5rem;
        }
      }

      .login-form-bottom {
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
        span {
          opacity: 0.4;
          color: #110f24;
          font-size: 1rem;
          line-height: 1.5rem;
          overflow-x: hidden;
        }
        a {
          color: #3b82f6;
        }
      }
    }
  }

  .right-side {
    width: 50%;
    height: 100%;

    @include mobile {
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
