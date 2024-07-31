<template>
  <div class="pf-v5-c-content">
    <div class="create-form-section">
      <form
        id="create-form"
        class="create-blog-form"
        @submit.prevent="formSubmit"
      >
        <div>
          <label for="blot-title-span"><h2>Title</h2></label>
          <span id="blot-title-span" class="pf-v5-c-form-control">
            <textarea
              v-model="currentTitle"
              :minlength="5"
              :maxlength="100"
              class="blog-title"
              name="textarea-standard"
              aria-label="Standard textarea example"
              required
            />
          </span>
        </div>
        <div>
          <label for="blog-story-span"><h2>Your Story...</h2></label>
          <span id="blog-story-span" class="pf-v5-c-form-control">
            <textarea
              v-model="currentStory"
              :minlength="20"
              :maxlength="200"
              class="blog-story"
              name="textarea-standard"
              aria-label="Standard textarea example"
              required
            />
          </span>
        </div>
        <div>
          <div class="image-input-box">
            <input
              id="blog-image"
              name="imageUpload"
              type="file"
              zl
              @change="handleFileChange"
            >
          </div>
          <div v-if="currentImageSrc" class="preview-blog-image">
            <img :src="currentImageSrc" alt="blog-image" >
          </div>
          <div v-else class="alt-preview-blog-image">
            <h3>preview your image here</h3>
          </div>
        </div>
      </form>
      <div class="blog-button-section">
        <div class="blog-button-group">
          <rh-button v-if="props.id" type="submit" form="create-form"
            >Update</rh-button
          >
          <rh-button v-if="props.id" type="button" danger @click="deleteBlog"
            >Delete</rh-button
          >
          <rh-button v-else type="submit" form="create-form">Publish</rh-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@patternfly/patternfly/patternfly.css";
import "@rhds/elements/rh-button/rh-button.js";
const props = defineProps({
  id: String,
});
const router = useRouter();
const currentImageSrc = ref(null);
const currentTitle = ref();
const currentStory = ref();
if (props.id) {
  $fetch(`/api/blogs/createblog/${props.id}`, {
    method: "GET",
  })
    .then((response) => {
      if (response?.statusCode) router.push("/pagenotfound");
      currentTitle.value = response?.title;
      currentStory.value = response?.story;
      currentImageSrc.value =
        response?.titleImage === "null" ? undefined : response?.titleImage;
    })
    .catch((error) => {
      console.log(error);
    });
}
const handleFileChange = async (event) => {
  const reader = new FileReader();
  const selectedImage = event.target.files[0];
  const pattern = new RegExp("image/*");
  const typeResult = pattern.test(selectedImage.type);
  if (typeResult) {
    reader.readAsDataURL(selectedImage);
    reader.onloadend = () => {
      currentImageSrc.value = reader.result;
    };
  } else {
    currentImageSrc.value = null;
    document.getElementById("blog-image").value = null;
    alert("upload image only");
  }
};
const formSubmit = async () => {
  const formdata = new FormData();
  const headline = currentStory.value.substring(0, 15) + "...";
  formdata.append("title", currentTitle.value);
  formdata.append("headline", headline);
  formdata.append("story", currentStory.value);
  formdata.append("titleImage", currentImageSrc.value);
  formdata.append("createdBy", "atharv");
  const formatedData = Object.fromEntries(formdata);
  try {
    let response;
    if (!props?.id) {
      response = await $fetch("/api/blogs/createblog", {
        method: "POST",
        body: formatedData,
      });
    } else {
      response = await $fetch(`/api/blogs/createblog/${props.id}`, {
        method: "PUT",
        body: formatedData,
      });
    }
    console.log(response);
    if (response?.statusCode === 200) {
      router.push("/");
      alert(response?.statusMessage);
    } else {
      alert(response?.statusMessage);
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteBlog = async (event) => {
  event.preventDefault();
  try {
    const response = await $fetch(`/api/blogs/createblog/${props.id}`, {
      method: "DELETE",
    });
    if (response?.statusCode === 200) {
      router.push("/");
      alert(response?.statusMessage);
    } else {
      alert(response?.statusMessage);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.create-form-section {
  max-width: 1440px;
  width: 50%;
  margin: auto;
}

.create-blog-form > div {
  margin-top: 32px;
}

.blog-title {
  min-height: 60px;
}

.blog-story {
  min-height: 180px;
}

.preview-blog-image {
  display: flex;
  min-height: 220px;
  max-width: 220px;
  justify-content: center;
  align-items: center;
}

.preview-blog-image > img {
  padding: 10px;
  max-width: 200px;
}

.alt-preview-blog-image {
  display: flex;
  min-height: 220px;
  align-items: center;
}

.blog-button-section {
  display: flex;
}

.blog-button-group {
  display: flex;
  justify-content: space-between;
  min-width: 200px;
}

@media screen and (max-width: 900px) {
  .create-form-section {
    width: 100%;
    padding: 32px;
  }
}
</style>
