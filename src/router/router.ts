import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes";
import { Auth } from "@/utils/auth";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  const { isAuthenticated } = Auth();

  // if user already logged in, redirect to /alreadyLoggedIn
  // We might delete it later
  if (to.name === "Login" && isAuthenticated) {
    return { name: "AlreadyLoggedIn" };
  }

  if (to.name === "Register" && isAuthenticated) {
    return { name: "Home" };
  }

  /**
   *  if user is not logged in and wants to navigate to any private route, redirect to login first
   *  if login process is successful, navigate to requested url. (handled in Login.vue)
   *  @see Login.vue
   *
   */

  if (!isAuthenticated && to.meta.requiresAuth) {
    return { name: "Login", query: { redirect: to.path } };
  }

  // validated, go on.
  return true;
});

export { router };
