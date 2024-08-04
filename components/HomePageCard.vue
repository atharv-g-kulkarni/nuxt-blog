<template>
  <div>
    <NuxtLink
      v-for="item in blogs"
      :key="item._id"
      :to="`/viewblog/${item._id}`"
      class="card-main-container"
      ><div>
        <p>
          <span><i class="fa fa-user" /></span> {{ item.createdBy }}
        </p>
        <div class="pf-v5-l-grid">
          <div class="pf-v5-l-grid__item pf-m-8-col blog-heading-container">
            <h1>
              {{ item.title }}
            </h1>
          </div>
          <div class="pf-v5-l-grid__item pf-m-4-col pf-m-2-row">
            <img :src="item.titleImage" alt="Blog image" />
          </div>
          <div class="pf-v5-l-grid__item pf-m-8-col blog-story-container">
            <p>
              {{ item.headline }}
            </p>
          </div>
        </div>
        <hr /></div
    ></NuxtLink>
  </div>
</template>

<script setup>
const blogs = ref([]);
const error = ref(null);
const fetchBlogs = async () => {
  try {
    const response = await $fetch("/api", {
      method: "GET",
    });
    blogs.value = response.blogs;
  } catch (err) {
    console.error(err);
    error.value = "Failed to fetch blogs. Please try again later.";
  }
};

fetchBlogs();
</script>

<style scoped>
.card-main-container {
  width: 100%;
  margin-top: 20px;
  text-decoration: none;
  color: #000;
}

.card-main-container img {
  height: 160px;
  width: 270px;
  margin-bottom: 10px;
}

.card-main-container hr {
  border-color: #ffffff;
  width: 95%;
  margin-top: 20px;
}

.card-main-container span {
  margin-right: 10px;
}

.blog-heading-container {
  --pf-v5-global--FontWeight--normal: none;
  font-size: 30px;
  font-weight: 900;
  line-height: 35px;
  margin-top: 5px;
  white-space: pre-wrap;
}

.blog-story-container {
  width: 95%;
  white-space: pre-wrap;
}
</style>
