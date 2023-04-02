<template>
  <main class="verify-page">
    <div class="content">
      <h2><i>Dope Lyrics</i></h2>
      <p>You have to click button below to verify your account.</p>
      <p>
        If you have any issue, you can contact us via
        <a href="mailto:dope.lyrics.info@gmail.com"
          >dope.lyrics.info@gmail.com</a
        >
      </p>
      <button type="button" class="btn-verify" @click="verifyAccount">
        Verify now
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { UserAPI } from "@/api/user/user";
import { watch } from "vue";
import { useRoute } from "vue-router";

const router = useRoute();
const code = router.params?.code as string;

watch(router.params, () => {
  console.log("router: ", router);
});

const verifyAccount = () => {
  UserAPI.verify({
    code: code,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};
</script>

<style lang="scss" scoped>
.verify-page {
  background: #e69a8dff;

  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    max-width: 1024px;
    margin: auto;
    height: 100vh;
    padding: 24px;
    color: #5f4b8bff;
    gap: 20px;
    text-align: center;
    font-size: 20px;

    @include mobile {
      font-size: 18px;
    }
  }
  .btn-verify {
    padding: 24px;
    border: 0;
    cursor: pointer;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    background: #dc2626;
    font-weight: bold;
    margin-top: 24px;

    &:hover,
    &:focus {
      opacity: 0.7;
    }
  }
}
</style>
