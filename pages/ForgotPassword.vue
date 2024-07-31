<template>
 <div class="forgot-password-container">
    <div class="pf-v5-l-grid pf-m-gutter">
      <div class="pf-v5-l-grid__item pf-m-6-col pf-m-12-row">
        <img src="../assets/images/loginImage.avif" >
      </div>
      <div
        class="pf-v5-l-grid__item pf-m-6-col pf-m-12-row forgot-password-right-container"
      >
      <ForgotPasswordDetails />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.forgot-password-container {
  width: 100%;
}

.forgot-password-container img {
  width: 100%;
  height: 93vh;
  object-fit: cover;
}

.forgot-password-right-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
