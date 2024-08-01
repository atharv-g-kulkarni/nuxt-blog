<template>
  <div class="pf-v5-c-content container">
    <div v-show="blogImage" class="blog-detail-view">
      <img :src="blogImage" alt="blog-image" class="blog-image">
      <div class="blog-title-section pf-v5-l-flex">
        <h2>{{ blogTitle }}</h2>
        <div class="pf-v5-l-flex__item pf-m-align-right">
          <rh-button
            variant="tertiary"
            class="edit-button"
            @click="navigateToEditPage"
          >
            <i class="fa fa-pencil-alt" />
          </rh-button>
        </div>
      </div>
      <hr>
      <section>
        <p>
          {{ blogStrory }}
        </p>
      </section>
    </div>
    <div v-show="!blogImage" class="blog-detail-view">
      <div class="pf-v5-c-skeleton pf-m-height-lg"></div>
      <br>
      <div class="pf-v5-c-skeleton"></div>
      <br>
      <div class="pf-v5-c-skeleton pf-m-width-25"></div>
      <br>
      <div class="pf-v5-c-skeleton pf-m-width-50"></div>
      <br>
      <div class="pf-v5-c-skeleton pf-m-width-75"></div>
    </div>
  </div>
</template>

<script setup>
import "@rhds/elements/rh-button/rh-button.js";
const blogTitle = ref();
const blogStrory = ref();
const blogImage = ref();
const router = useRouter();
const id = "66ab3efa1b5b64f968b976b9";
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
  router.push(`/createblog/${id}`);
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
  width: 50%;
  padding: 32px;
  white-space: pre-wrap;
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

@media screen and (max-width: 900px) {
  .blog-detail-view {
    width: 100%;
  }
}
</style>
