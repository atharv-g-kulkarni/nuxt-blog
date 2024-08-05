<template>
  <div class="alert-group">
    <div
      v-show="alertMessage"
      class="pf-v5-c-alert pf-m-info pf-m-inline"
      aria-label="Inline information alert"
    >
      <div class="pf-v5-c-alert__icon">
        <i class="fas fa-fw fa-info-circle" aria-hidden="true" />
      </div>
      <p class="pf-v5-c-alert__title">
        <span class="pf-v5-screen-reader">Info alert:</span>
        upload image only
      </p>
    </div>
    <div
      v-show="!auth.isLoggedIn || (!auth.isOwner && props.id)"
      class="pf-v5-c-alert pf-m-info pf-m-inline"
      aria-label="Inline information alert"
    >
      <div class="pf-v5-c-alert__icon">
        <i class="fas fa-fw fa-info-circle" aria-hidden="true" />
      </div>
      <p v-if="!auth.isLoggedIn" class="pf-v5-c-alert__title">
        <span class="pf-v5-screen-reader">Info alert:</span>
        Login to create blogs
      </p>
      <p v-else-if="!auth.isOwner && props.id" class="pf-v5-c-alert__title">
        <span class="pf-v5-screen-reader">Info alert:</span>
        You are not authorized person
      </p>
    </div>
    <div
      v-show="statusMessage"
      class="pf-v5-c-alert pf-m-success pf-m-inline"
      aria-label="Success alert"
    >
      <div class="pf-v5-c-alert__icon">
        <i class="fas fa-fw fa-cog" aria-hidden="true" />
      </div>
      <p class="pf-v5-c-alert__title">
        <span class="pf-v5-screen-reader">Success alert:</span>
        {{ statusMessage }}
      </p>
    </div>
    <div
      v-show="errorMessage"
      class="pf-v5-c-alert pf-m-danger pf-m-inline"
      aria-label="Inline danger alert"
    >
      <div class="pf-v5-c-alert__icon">
        <i class="fas fa-fw fa-exclamation-circle" aria-hidden="true" />
      </div>
      <p class="pf-v5-c-alert__title">
        <span class="pf-v5-screen-reader">Danger alert:</span>
        {{ errorMessage }}
      </p>
    </div>
  </div>
  <div
    v-show="(auth.isOwner && props.id) || (auth.isLoggedIn && !props.id)"
    class="pf-v5-c-content container"
  >
    <div class="sub-container">
      <div v-show="currentTitle || !props.id" class="create-form-section">
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
                :maxlength="500"
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
                :maxlength="2000"
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
                accept="image/*"
                @change="handleFileChange"
              />
            </div>
            <div v-if="currentImageSrc" class="preview-blog-image">
              <img :src="currentImageSrc" alt="blog-image" />
            </div>
            <div v-else class="alt-preview-blog-image">
              <h3>preview your image here</h3>
            </div>
          </div>
        </form>
        <div class="blog-button-section">
          <div class="blog-button-group">
            <rh-button
              v-if="auth.isOwner && props.id"
              type="submit"
              form="create-form"
              >Update</rh-button
            >
            <rh-button
              v-if="auth.isOwner && props.id"
              type="button"
              danger
              @click="deleteBlog"
              >Delete</rh-button
            >
            <rh-button
              v-else
              type="submit"
              form="create-form"
              class="publish-btn"
              >Publish</rh-button
            >
          </div>
        </div>
        <pf-modal variant="small">
          {{ statusMessage }}
        </pf-modal>
      </div>
      <div v-show="!currentTitle && props.id" class="create-form-section">
        <div class="create-blog-form">
          <div>
            <div class="pf-v5-c-skeleton pf-m-width-25"></div>
            <div class="pf-v5-c-skeleton"></div>
          </div>
          <div>
            <div class="pf-v5-c-skeleton pf-m-width-25"></div>
            <div class="pf-v5-c-skeleton pf-m-height-lg"></div>
          </div>
          <div class="pf-v5-c-skeleton pf-m-square pf-m-width-md"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@rhds/elements/rh-button/rh-button.js";
import { useAuthStore } from "~/stores/auth.js";
import { jwtDecode } from "jwt-decode";
const auth = useAuthStore();
const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});
const currentImageSrc = ref(null);
const currentTitle = ref();
const currentStory = ref();
const userId = ref();
const alertMessage = ref(false);
const statusMessage = ref();
const errorMessage = ref();
if (auth.isLoggedIn && import.meta.client) {
  const token = localStorage.getItem("token");
  if (token) {
    const data = jwtDecode(token);
    userId.value = data.userId;
  }
}
if (props.id) {
  $fetch(`/api/blogs/createblog/${props.id}`, {
    method: "GET",
  })
    .then((response) => {
      if (response?.statusCode) navigateTo("/pagenotfound");
      currentTitle.value = response?.title;
      currentStory.value = response?.story;
      currentImageSrc.value =
        response?.titleImage === "null" ? undefined : response?.titleImage;
      userId.value = response?.createdBy;
    })
    .catch((error) => {
      console.log(error);
    });
}
const autoCloseToast = () => {
  setTimeout(() => {
    if (statusMessage.value || errorMessage.value) {
      statusMessage.value = null;
      errorMessage.value = null;
      navigateToHome();
    }
    alertMessage.value = false;
  }, 1000);
};
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
    alertMessage.value = true;
    autoCloseToast();
  }
};
const navigateToHome = () => {
  setTimeout(() => {
    navigateTo("/");
  }, 1000);
};
const formSubmit = async () => {
  const formdata = new FormData();
  const headline =
    currentStory.value.substring(0, currentStory.value.length / 2) + "...";
  formdata.append("title", currentTitle.value);
  formdata.append("headline", headline);
  formdata.append("story", currentStory.value);
  formdata.append("titleImage", currentImageSrc.value);
  formdata.append("createdBy", userId.value);
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
    if (response?.statusCode === 200) {
      statusMessage.value = response?.statusMessage;
    } else {
      errorMessage.value = response?.statusMessage;
    }
    autoCloseToast();
  } catch (error) {
    errorMessage.value = error;
    autoCloseToast();
  }
};
const deleteBlog = async (event) => {
  event.preventDefault();
  try {
    const response = await $fetch(`/api/blogs/createblog/${props.id}`, {
      method: "DELETE",
    });
    if (response?.statusCode === 200) {
      statusMessage.value = response?.statusMessage;
    } else {
      errorMessage.value = response?.statusMessage;
    }
    autoCloseToast();
  } catch (error) {
    errorMessage.value = error;
    autoCloseToast();
  }
};
</script>

<style scoped>
.container {
  max-width: 1440px;
  margin: auto;
}

.sub-container {
  display: flex;
  justify-content: center;
}

.alert-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: -11;
}

.pf-v5-c-alert {
  width: 100%;
}

.create-form-section {
  width: 50%;
  padding: 32px;
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

.publish-btn::part(button) {
  background-color: #1a8917;
}

@media screen and (max-width: 900px) {
  .create-form-section {
    width: 100%;
  }
}
</style>
