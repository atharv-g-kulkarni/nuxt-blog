<template>
    <div class="sign-up-container">
      <div class="pf-v5-l-grid pf-m-gutter">
        <div class="pf-v5-l-grid__item pf-m-6-col pf-m-12-row">
          <img src="../assets/images/loginImage.avif" >
        </div>
        <div
          class="pf-v5-l-grid__item pf-m-6-col pf-m-12-row sign-up-right-container"
        >
          <SignUpDetails/>
        </div>
      </div>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .sign-up-container {
    width: 100%;
    overflow: hidden;
  }
  
  .sign-up-container img {
    width: 100%;
    height: 93vh;
    object-fit: cover;
  }
  
  .sign-up-right-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  