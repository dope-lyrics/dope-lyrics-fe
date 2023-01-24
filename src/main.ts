import { createApp } from "vue";
import { router } from "@/router/router";
import App from "./App.vue";

createApp(App).use(router).mount("#app");

// Now the app has started!
