<template>
  <div>
    <div class="reset-password-details-container">
      <div class="pf-v5-l-flex pf-m-column">
        <div class="pf-v5-l-flex__item"><h1>Reset Password</h1></div>
        <div class="pf-v5-l-flex__item">
          <form class="pf-v5-c-form" @submit.prevent="handleSubmit">
            <div class="pf-v5-c-form__group-control">
              <span class="pf-v5-c-form-control pf-m-required">
                <input
                  id="new-password"
                  v-model="newPassword"
                  :minlength="8"
                  required
                  type="password"
                  name="new-password"
                  placeholder="Enter new password"
                />
              </span>
            </div>
            <div class="pf-v5-c-form__group-control">
              <span class="pf-v5-c-form-control pf-m-required">
                <input
                  id="confirm-password"
                  v-model="confirmPassword"
                  :minlength="8"
                  required
                  type="password"
                  name="confirm-password"
                  placeholder="Confirm new password"
                />
              </span>
            </div>
            <div class="pf-v5-c-form__group pf-m-action">
              <div class="pf-v5-c-form__actions">
                <button
                  class="pf-v5-c-button pf-m-primary submit-button"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-if="errorMessage">
        <rh-alert v-if="errorMessage" state="success" variant="alternate">
          <h3>{{ errorMessage }}</h3>
        </rh-alert>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const newPassword = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

const handleSubmit = async () => {
  errorMessage.value = "";
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match.";
    return;
  }

  try {
    const { message: responseMessage } = await $fetch("/api/auth/reset", {
      method: "POST",
      body: {
        token: route.params.token,
        newPassword: newPassword.value,
      },
    });

    errorMessage.value = responseMessage;
    setTimeout(() => {
      router.push("/login");
    }, 3000);
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
.reset-password-details-container {
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  border-radius: 5px;
  padding: 30px;
  height: auto;
  width: 400px;
}

.reset-password-details-container h1 {
  font-family: "Red Hat Mono", monospace;
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 20px;
}

.submit-button {
  background-color: #000000;
  font-size: 20px;
  height: 50px;
  width: 170px;
  margin-bottom: 15px;
}

.submit-button:hover {
  border: 1px solid #000000;
  background-color: #fff;
  color: #000;
}

.reset-password-details-container p {
  text-align: center;
  margin-top: 20px;
}
</style>
