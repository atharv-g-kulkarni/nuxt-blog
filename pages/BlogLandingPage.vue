<template>
  <div class="container">
    <div class="home-main-container">
      <div class="pf-v5-l-flex for-you-section">
        <div class="pf-v5-l-flex__item"><i class="fa fa-plus" /></div>
        <div class="pf-v5-l-flex__item"><p>For you</p></div>
      </div>
      <hr>
      <div class="content-container">
        <HomePageCard />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  max-width: 1440px;
  margin: auto;
}

.home-main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  align-self: center;
  max-width: 70%;
  padding: 32px
}

.home-main-container hr {
  border-color: #ffffff;
  width: 95%;
  margin-top: 20px;
}

.for-you-section {
  margin-top: 20px;
  font-weight: 600;
}

.for-you-section i:hover{
  cursor: pointer;
}

.content-container {
  margin-top: 50px;
}

@media screen and (max-width: 992px) {
  .home-main-container {
    max-width: 100%;
  }
}
</style>
