<template>
  <div>
    <div class="header-main-container">
      <div class="pf-v5-l-grid pf-m-gutter header-grid-container">
        <div
          class="pf-v5-l-grid__item pf-m-2-col pf-m-2-col-on-xs pf-m-2-col-on-sm pf-m-2-col-on-md pf-m-2-col-on-lg"
        >
          <NuxtLink to="/" class="title-link">FridayBlog</NuxtLink>
        </div>
        <div
          class="pf-v5-l-grid__item pf-m-7-col pf-m-3-col-on-xs pf-m-3-col-on-sm pf-m-5-col-on-md pf-m-6-col-on-lg"
        >
          <input id="fname" placeholder="Search" type="text" />
          <i class="fa fa-search search-icon" />
        </div>
        <div
          class="pf-v5-l-grid__item pf-m-3-col pf-m-7-col-on-xs pf-m-7-col-on-sm pf-m-5-col-on-md pf-m-4-col-on-lg"
        >
          <div
            class="pf-v5-l-flex pf-m-justify-content-flex-end pf-m-align-items-center"
          >
            <div class="pf-v5-l-flex__item menu-item">
              <i class="fa fa-pencil-alt" />
              <p>Write</p>
            </div>
            <div class="pf-v5-l-flex__item menu-item">
              <i class="fa fa-bell" />
            </div>
            <div class="pf-v5-l-flex__item menu-item">
              <div class="pf-v5-l-flex">
                <template v-if="!authStore.isLoggedIn">
                  <div class="pf-v5-l-flex__item">
                    <NuxtLink to="/login" class="auth-item"
                      ><button class="pf-v5-c-button pf-m-tertiary">
                        Login
                      </button></NuxtLink
                    >
                  </div>
                  <div class="pf-v5-l-flex__item">
                    <NuxtLink to="/signup"
                      ><button class="pf-v5-c-button pf-m-tertiary">
                        Signup
                      </button></NuxtLink
                    >
                  </div>
                </template>
                <template v-else>
                  <div class="pf-v5-l-flex__item" @click="handleLogout">
                    <NuxtLink to="/"
                      ><button class="pf-v5-c-button pf-m-tertiary">
                        Logout
                      </button></NuxtLink
                    >
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="errorMessage">
      <TheAlert :error-message="errorMessage" />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "#app";

const errorMessage = ref("");
const router = useRouter();
const authStore = useAuthStore();

definePageMeta({
  middleware: ["auth"],
});

const handleLogout = async () => {
  errorMessage.value = "";
  try {
    await $fetch("/api/auth/logout", {
      method: "POST",
    });
    authStore.logout();
    localStorage.removeItem("token");
    errorMessage.value = "Logout Sccessful";
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error?.data?.message || error?.message);
  }
};
</script>

<style scoped>
.header-main-container {
  height: 70px;
  padding: 0px 40px;
  background-color: #fff;
  border-bottom: solid 1px #f2f2f2;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 2;
}

.title-link {
  font-family: "Red Hat Mono", monospace;
  font-weight: 500;
  font-size: 30px;
  cursor: pointer;
  text-decoration: none;
  color: #000000;
}

.title-link:hover {
  text-decoration: none;
}

.header-main-container input {
  margin: 3px 0px 0px 10px;
  padding-left: 15px;
  height: 40px;
  border: solid 1px #f2f2f2;
  background-color: #f2f2f2;
  border-radius: 20px;
  width: 400px;
}

.search-icon {
  display: none;
}

.header-main-container i {
  font-size: 20px;
}

.header-grid-container {
  width: 100%;
}

.menu-item {
  text-align: center;
}

.menu-item:hover {
  cursor: pointer;
}

.menu-item p {
  color: #000000;
}

.menu-item button:hover {
  color: #fff;
  background-color: #000000;
}

.auth-item {
  color: #000000;
  font-size: 20px;
}

.auth-item:hover {
  font-weight: 500;
  text-decoration: none;
}

@media screen and (max-width: 1180px) {
  .header-main-container input {
    display: none;
  }

  .search-icon {
    display: block;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
  }
}
</style>
