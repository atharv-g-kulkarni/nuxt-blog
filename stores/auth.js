import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: null,
    isOwner: false,
  }),
  actions: {
    login(userData) {
      this.isLoggedIn = true;
      this.user = userData;
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
    },
    setOwner() {
      this.isOwner = true;
    },
    unsetOwner() {
      this.isOwner = false;
    }
  },
});
