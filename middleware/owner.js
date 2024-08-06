import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "~/stores/auth.js";
export default defineNuxtRouteMiddleware(async (to,from) => {
  const authStore = useAuthStore();
  if (import.meta.client) {
    const token = localStorage.getItem("token");
    if (to.params.id && token) {
      const data = jwtDecode(token);
      const userId = data.userId.toString();
      const blogId = to.params.id;
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
    // else{
    //   authStore.unsetOwner();
    // }
  }
});
