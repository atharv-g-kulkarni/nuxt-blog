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
                  :minlength="8"
                  required
                  type="text"
                  name="form-vertical-name"
                  placeholder="Username"
                  class=""
                />
              </span>
            </div>
            <div class="pf-v5-c-form__group-control">
              <span class="pf-v5-c-form-control pf-m-required">
                <input
                  id="form-vertical-password"
                  v-model="password"
                  :minlength="8"
                  required
                  type="password"
                  name="form-vertical-password"
                  placeholder="Password"
                />
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
                <NuxtLink to="/forgotpassword"
                  ><button
                    class="pf-v5-c-button pf-m-tertiary forgot-password-button"
                    type="submit"
                  >
                    Forgot Password
                  </button></NuxtLink
                >
              </div>
            </div>
          </form>
        </div>
        <div class="pf-v5-l-flex__item account-container">
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

const username = ref("");
const password = ref("");
const errorMessage = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const handleSubmit = async () => {
  errorMessage.value = "";
  try {
    const { user, token } = await $fetch("api/auth/login", {
      method: "POST",
      body: {
        username: username.value,
        password: password.value,
      },
    });

    authStore.login(user);
    localStorage.setItem("token", token);
    router.push("/");
  } catch (error) {
    if (error.response) {
      errorMessage.value = error.response._data.message;
      setTimeout(() => {
        errorMessage.value = false;
      }, 3000);
    } else {
      errorMessage.value = "An unexpected error occurred. Please try again.";
    }
  }
};
</script>

<style scoped>
.login-details-container {
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  border-radius: 5px;
  padding: 30px;
  width: 400px;
}

.login-details-container h1 {
  font-family: "Red Hat Mono", monospace;
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 20px;
}

.submit-button {
  background-color: #000000;
  font-size: 20px;
  height: 50px;
  width: 155px;
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

.forgot-password-button {
  font-size: 17px;
  height: 50px;
  width: 155px;
}

.forgot-password-button:hover {
  background-color: #000;
  color: #fff;
}

.account-container{
  margin-bottom: 15px;
}
</style>
