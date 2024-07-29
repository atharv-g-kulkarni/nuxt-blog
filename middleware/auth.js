import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const token = localStorage.getItem("token");
  if (token) {
    authStore.login({ token });
  } else {
    authStore.logout();
  }
});
