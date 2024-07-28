<template>
  <div class="card-main-container">
    <p>
      <span><i class="fa fa-user" /></span> Author
    </p>
    <div class="pf-v5-l-grid">
      <div class="pf-v5-l-grid__item pf-m-8-col blog-heading-container">
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          of
        </h1>
      </div>
      <div class="pf-v5-l-grid__item pf-m-4-col pf-m-2-row">
        <img src="../assets/images/loginImage.avif" alt="Blog image" />
      </div>
      <div class="pf-v5-l-grid__item pf-m-8-col">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
          expedita earum nisi sit veritatis praesentium iusto saepe optio
          blanditiis repudiandae
        </p>
      </div>

      <div class="pf-v5-l-grid__item pf-m-5-col">
        <div class="pf-v5-l-flex">
          <div class="pf-v5-l-flex__item">Jul 11</div>
          <div class="pf-v5-l-flex__item">2.4K</div>
          <div class="pf-v5-l-flex__item"><i class="fa fa-comments" />100</div>
        </div>
      </div>
      <div class="pf-v5-l-grid__item pf-m-6-col">
        <div class="pf-v5-l-flex pf-m-justify-content-flex-end">
          <div class="pf-v5-l-flex__item">
            <i class="fa fa-minus-circle" />
          </div>
          <div class="pf-v5-l-flex__item"><i class="fa fa-thumbtack" /></div>
          <div class="pf-v5-l-flex__item"><i class="fa fa-list" /></div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script setup></script>

<style scoped>
.card-main-container {
  width: 100%;
  margin-top: 20px;
}

.card-main-container img {
  height: 160px;
  width: 260px;
  margin-bottom: 10px;
}

.card-main-container hr {
  border-color: #ffffff;
  width: 95%;
  margin-top: 20px;
}

.card-main-container span{
  margin-right: 10px
}

.blog-heading-container {
  --pf-v5-global--FontWeight--normal: none;
  font-size: 30px;
  font-weight: 900;
  line-height: 35px;
}
</style>
