<template>
  <div>
    <div class="sign-up-details-container">
      <div class="pf-v5-l-flex pf-m-column">
        <div class="pf-v5-l-flex__item"><h1>Sign up</h1></div>
        <div class="pf-v5-l-flex__item">
          <form class="pf-v5-c-form" @submit.prevent="handleSubmit">
            <div class="pf-v5-c-form__group-control">
              <span class="pf-v5-c-form-control pf-m-required">
                <input
                  id="form-vertical-username"
                  v-model="username"
                  required
                  type="text"
                  name="form-vertical-username"
                  placeholder="Username"
                  class=""
                />
              </span>
            </div>
            <div class="pf-v5-c-form__group-control">
              <span class="pf-v5-c-form-control pf-m-required">
                <input
                  id="form-vertical-email"
                  v-model="email"
                  required
                  type="text"
                  name="form-vertical-name"
                  placeholder="E-mail"
                  class=""
                />
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
                />
              </span>
            </div>
            <div class="pf-v5-c-form__group pf-m-action">
              <div class="pf-v5-c-form__actions">
                <button
                  class="pf-v5-c-button pf-m-primary submit-button"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="pf-v5-l-flex__item">
          <p>
            Already have an account? <NuxtLink to="/login">Login Here</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const username = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const handleSubmit = async () => {
  try {
    const response = await axios.post("api/auth/signup", {
      username: username.value,
      email: email.value,
      password: password.value,
    });
    console.log("Signup Successful", response.data);
    router.push("/login");
  } catch (error) {
    console.log("Signup Failed", error.response.data);
  }
};
</script>

<style scoped>
.sign-up-details-container {
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  border-radius: 5px;
  padding: 30px;
  height: 450px;
  width: 400px;
}

.sign-up-details-container h1 {
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

.sign-up-details-container p {
  text-align: center;
  margin-top: 20px;
}
</style>
