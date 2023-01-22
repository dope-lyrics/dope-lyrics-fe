import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Login from "@/pages/Login/Login.vue";
import Add from "@/pages/Add.vue";
import { store } from "@/store/store";
import AlreadyLoggedIn from "@/pages/AlreadyLoggedIn.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/about",
      name: "About",
      component: About,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/add",
      name: "Add",
      component: Add,
    },
    {
      path: "/alreadyLoggedIn",
      name: "AlreadyLoggedIn",
      component: AlreadyLoggedIn,
    },
  ],
});

router.beforeEach((to, from) => {
  console.log("before each store.requestedFrom : ", store.requestedFrom);
  const isAuthenticated = store.user;

  // if user already logged in, redirect to /login
  // We might delete it later
  if (to.name === "Login" && isAuthenticated) {
    return { name: "AlreadyLoggedIn" };
  }

  // if user is not logged in, redirect to login
  if (to.name === "Add" && !isAuthenticated) {
    store.requestedFrom = to.name as string;
    return { name: "Login" };
  }

  // validated, go on.
  return true;
});

export { router };
