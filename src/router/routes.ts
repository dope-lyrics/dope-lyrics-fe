import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Login from "@/pages/Login/Login.vue";
import Add from "@/pages/Add.vue";
import AlreadyLoggedIn from "@/pages/AlreadyLoggedIn.vue";
import NotFound from "@/pages/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    alias: "/home",
    meta: { requiresAuth: false },
  },
  {
    path: "/about",
    name: "About",
    component: About,
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
