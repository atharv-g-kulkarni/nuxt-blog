<template>
  <div class="login-container">
    <div class="pf-v5-l-grid pf-m-gutter">
      <div class="pf-v5-l-grid__item pf-m-6-col pf-m-12-row">
        <img src="../assets/images/loginImage.avif" >
      </div>
      <div
        class="pf-v5-l-grid__item pf-m-6-col pf-m-12-row login-right-container"
      >
        <LoginDetails />
        <!-- <SignUpDetails/> -->
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.login-container {
  width: 100%;
}

.login-container img {
  width: 100%;
  height: 93vh;
  object-fit: cover;
}

.login-right-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
