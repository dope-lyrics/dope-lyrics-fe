import Home from "@/pages/Home.vue";
import Login from "@/pages/Login/Login.vue";
import Add from "@/pages/Add/Add.vue";
import AlreadyLoggedIn from "@/pages/AlreadyLoggedIn.vue";
import NotFound from "@/pages/NotFound.vue";
import Verify from "@/pages/Verify/Verify.vue";
import Register from "@/pages/Register/Register.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    alias: "/home",
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/add",
    name: "Add",
    component: Add,
    meta: { requiresAuth: true },
  },
  {
    path: "/verify/:code",
    name: "Verify",
    component: Verify,
  },
  {
    path: "/alreadyLoggedIn",
    name: "AlreadyLoggedIn",
    component: AlreadyLoggedIn,
  },

  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    meta: { requiresAuth: false },
  },
];

const privateRoutes = ["Add"];

export { routes, privateRoutes };

/**  @see {@link https://router.vuejs.org/guide/advanced/meta.html}. */
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    // must be declared by every route
    requiresAuth: boolean;
  }
}
