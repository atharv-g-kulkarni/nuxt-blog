import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if(import.meta.client){
    const token = localStorage.getItem("token");
    if (token) {
      authStore.login({ token });
    } else {
      authStore.logout();
    }
  }
});
