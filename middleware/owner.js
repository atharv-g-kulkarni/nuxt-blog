import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "~/stores/auth.js";
export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();
  if (import.meta.client) {
    const route = useRoute()
    const token = localStorage.getItem("token");
    if (route.params.id && token) {
      const data = jwtDecode(token);
      const userId = data.userId.toString();
      const blogId = route.params.id;
      const response = await $fetch(`/api/blogs/createblog/${blogId}`, {
        method: "GET",
      });
      const ownerId = response.createdBy.toString();
      if (ownerId === userId) {
        authStore.setOwner();
      }
      else{
        authStore.unsetOwner();
      }
    }
    else{
      authStore.unsetOwner();
    }
  }
});
