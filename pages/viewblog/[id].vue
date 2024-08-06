<template>
  <div class="pf-v5-c-content container">
    <div v-show="blogImage" class="blog-detail-view">
      <img :src="blogImage" alt="blog-image" class="blog-image" />
      <div class="blog-title-section pf-v5-l-flex">
        <h1>{{ blogTitle }}</h1>
        <div class="pf-v5-l-flex__item pf-m-align-right">
          <rh-button
            v-show="auth.isOwner"
            variant="tertiary"
            class="edit-button"
            @click="navigateToEditPage"
          >
            <i class="fa fa-pencil-alt" />
          </rh-button>
        </div>
      </div>
      <hr />
      <section>
        <p>
          {{ blogStrory }}
        </p>
      </section>
    </div>
    <div v-show="!blogImage" class="blog-detail-view">
      <div class="pf-v5-c-skeleton pf-m-height-lg"></div>
      <br />
      <div class="pf-v5-c-skeleton"></div>
      <br />
      <div class="pf-v5-c-skeleton pf-m-width-25"></div>
      <br />
      <div class="pf-v5-c-skeleton pf-m-width-50"></div>
      <br />
      <div class="pf-v5-c-skeleton pf-m-width-75"></div>
    </div>
  </div>
</template>

<script setup>
import "@rhds/elements/rh-button/rh-button.js";
import { useAuthStore } from "~/stores/auth.js";
const auth = useAuthStore();
const blogTitle = ref();
const blogStrory = ref();
const blogImage = ref();
const route = useRoute();
const id = route.params.id;
$fetch(`/api/blogs/createblog/${id}`, {
  method: "GET",
})
  .then((response) => {
    blogTitle.value = response.title;
    blogStrory.value = response.story;
    blogImage.value = response.titleImage;
  })
  .catch((error) => {
    console.log(error);
  });
const navigateToEditPage = () => {
  navigateTo(`/createblog/${id}`);
};
</script>

<style scoped>
.container {
  max-width: 1440px;
  margin: auto;
  display: flex;
  justify-content: center;
}

.blog-detail-view {
  width: 70%;
  padding: 32px;
  white-space: pre-wrap;
}

.blog-detail-view h1{ 
  margin:20px 0px;
}

.blog-detail-view p{ 
  font-size:20px;
}

.blog-image {
  width: 100%;
  max-height: 300px;
}

.edit-button {
  white-space: nowrap;
}

.edit-button::part(button) {
  --_tertiary-border-color: white;
}

@media screen and (max-width: 992px) {
  .blog-detail-view {
    width: 100%;
  }
}
</style>
