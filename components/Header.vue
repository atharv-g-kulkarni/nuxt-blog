<template>
    <div>
      <div class="header-main-container">
        <div class="pf-v5-l-grid pf-m-gutter header-grid-container">
          <div class="pf-v5-l-grid__item pf-m-1-col">
            <NuxtLink to="/"><h1>FridayBlog</h1></NuxtLink>
          </div>
          <div class="pf-v5-l-grid__item pf-m-8-col">
            <input id="fname" placeholder="Search" type="text" />
          </div>
          <div class="pf-v5-l-grid__item pf-m-3-col">
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
                      <NuxtLink to="/login"><p>Login</p></NuxtLink>
                    </div>
                    <div class="pf-v5-l-flex__item">
                      <NuxtLink to="/signup"><p>Signup</p></NuxtLink>
                    </div>
                  </template>
                  <template v-else>
                    <div class="pf-v5-l-flex__item" @click="handleLogout">
                      <NuxtLink to="/"><p>Logout</p></NuxtLink>
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
  
  .header-main-container h1 {
    font-family: "Playwrite AR", cursive;
    font-weight: 600;
    font-size: 30px;
    cursor: pointer;
    text-decoration: none;
    color: #000000;
  }
  
  .header-main-container input {
    margin: 3px 0px 0px 10px;
    padding-left: 15px;
    height: 40px;
    border: solid 1px #f2f2f2;
    background-color: #f2f2f2;
    border-radius: 20px;
    width: 30%;
  }
  
  .header-main-container i {
    font-size: 20px;
  }

  .header-grid-container{
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
  </style>
  