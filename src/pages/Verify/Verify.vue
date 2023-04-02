n<template>
  <main class="verify-page">
    <div class="content">
      <h2><i>Dope Lyrics</i></h2>
      <p>{{ t("verify.description1") }}</p>
      <p>
        {{ t("verify.haveIssue") }}
        <a href="mailto:dope.lyrics.info@gmail.com"
          >dope.lyrics.info@gmail.com</a
        >
      </p>
      <button type="button" class="btn-verify" @click="verifyAccount">
        {{ t("verify.verify") }}
      </button>
    </div>
  </main>
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
    @confirm="handleCloseSuccessModal"
  />
</template>

<script setup lang="ts">
import { UserAPI } from "@/api/user/user";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Modal from "@/components/modals/Modal.vue";

const { t } = useI18n();

const router = useRouter();
const route = useRoute();
const code = route.params?.code as string;

const errorModal = reactive({
  show: false,
  description: "",
});

const successModal = reactive({
  show: false,
  description: "",
});

const verifyAccount = () => {
  UserAPI.verify({
    code: code,
    onSuccess: (data) => {
      successModal.show = true;
      successModal.description = t("verify.result.success");
    },
    onError: (error) => {
      errorModal.show = true;
      errorModal.description = error;
    },
  });
};
const handleCloseSuccessModal = () => {
  router.push({ name: "Home" });
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
