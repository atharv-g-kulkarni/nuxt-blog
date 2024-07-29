<template>
  <div>
    <div class="login-details-container">
      <div class="pf-v5-l-flex pf-m-column">
        <div class="pf-v5-l-flex__item"><h1>Login</h1></div>
        <div class="pf-v5-l-flex__item">
          <form class="pf-v5-c-form" @submit.prevent="handleSubmit">
            <div class="pf-v5-c-form__group-control">
              <span class="pf-v5-c-form-control pf-m-required">
                <input
                  id="form-vertical-name"
                  v-model="username"
                  required
                  type="text"
                  name="form-vertical-name"
                  placeholder="Username"
                  class=""
                >
              </span>
            </div>
            <div class="pf-v5-c-form__group-control">
              <span class="pf-v5-c-form-control pf-m-required">
                <input
                  id="form-vertical-password"
                  v-model="password"
                  required
                  type="password"
                  name="form-vertical-password"
                  placeholder="Password"
                >
              </span>
            </div>
            <div class="pf-v5-c-form__group pf-m-action">
              <div class="pf-v5-c-form__actions">
                <button
                  class="pf-v5-c-button pf-m-primary submit-button"
                  type="submit"
                >
                  Login
                </button>
                <button class="pf-v5-c-button pf-m-link">
                  Forgot Password
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="pf-v5-l-flex__item">
          <p>Need an account? <NuxtLink to="/signup">SignUp Here</NuxtLink></p>
        </div>
      </div>
      <div v-if="errorMessage">
        <TheAlert :error-message="errorMessage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleSubmit = async () => {
  errorMessage.value = "";
  try {
    const response = await axios.post("api/auth/login", {
      username: username.value,
      password: password.value,
    });

    authStore.login(response.data.user);
    localStorage.setItem("token", response.data.token);
    router.push("/");
  } catch (error) {
    errorMessage.value = error?.response?.statusText || error?.message;
  }
};
</script>

<style scoped>
.login-details-container {
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  border-radius: 5px;
  padding: 30px;
  height: auto;
  width: 400px;
}

.login-details-container h1 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
}

.submit-button {
  background-color: #000000;
  font-size: 20px;
  height: 50px;
  width: 170px;
}

.submit-button:hover {
  border: 1px solid #000000;
  background-color: #fff;
  color: #000;
}

.login-details-container p {
  text-align: center;
  margin-top: 20px;
}
</style>
