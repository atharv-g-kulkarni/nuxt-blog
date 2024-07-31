<template>
  <div class="reset-password-container">
    <div class="pf-v5-l-grid pf-m-gutter">
      <div class="pf-v5-l-grid__item pf-m-6-col pf-m-12-row">
        <img src="../../assets/images/loginImage.avif" />
      </div>
      <div
        class="pf-v5-l-grid__item pf-m-6-col pf-m-12-row reset-password-right-container"
      >
        <ResetPasswordDetails />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.reset-password-container {
  width: 100%;
}

.reset-password-container img {
  width: 100%;
  height: 93vh;
  object-fit: cover;
}

.reset-password-right-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
