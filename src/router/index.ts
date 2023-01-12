import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Login from "@/pages/Login.vue";
import Add from "@/pages/Add.vue";

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
  ],
});

export { router };
