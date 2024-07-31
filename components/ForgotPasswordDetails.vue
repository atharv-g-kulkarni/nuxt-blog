<template>
  <div>
    <div class="forgot-password-details-container">
      <div class="pf-v5-l-flex pf-m-column">
        <div class="pf-v5-l-flex__item"><h1>Forgot Password</h1></div>
        <div class="pf-v5-l-flex__item">
          <form class="pf-v5-c-form" @submit.prevent="handleSubmit">
            <div class="pf-v5-c-form__group-control">
              <span class="pf-v5-c-form-control pf-m-required">
                <input
                  id="email"
                  v-model="email"
                  required
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </span>
            </div>
            <div class="pf-v5-c-form__group pf-m-action">
              <div class="pf-v5-c-form__actions">
                <button
                  class="pf-v5-c-button pf-m-primary submit-button"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-if="errorMessage">
        <TheAlert :error-message="errorMessage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const errorMessage = ref("");
// const router = useRouter();

const handleSubmit = async () => {
  errorMessage.value = "";
  try {
    await $fetch("/api/auth/forgot", {
      method: "POST",
      body: {
        email: email.value,
      },
    });
    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.log(errorMessage)
    console.error(
      "Error sending password reset email:",
      errorMessage.value = error?.data?.message || error?.message
    );
  }
};
</script>

<style scoped>
.forgot-password-details-container {
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  border-radius: 5px;
  padding: 30px;
  height: auto;
  width: 400px;
}

.forgot-password-details-container h1 {
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

.forgot-password-details-container p {
  text-align: center;
  margin-top: 20px;
}
</style>
