import { createApp } from "vue";
import { router } from "@/router/router";
import App from "./App.vue";
import { i18n } from "@/i18n";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

const app = createApp(App);

export const queryClient = new QueryClient();

app.use(router);
app.use(i18n);
app.use(VueQueryPlugin);
app.mount("#app");
