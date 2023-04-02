<template>
  <div class="container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: flex-start;
  height: 100vh;

  @include mobileOrTablet {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }

  .left {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    padding-bottom: 30px;

    @include mobileOrTablet {
      width: 100%;
      padding-bottom: 24px;
    }
  }
  .right {
    width: 50%;
    height: 100%;

    @include mobileOrTablet {
      width: 100%;
      height: 30%;
    }
  }
}
</style>
