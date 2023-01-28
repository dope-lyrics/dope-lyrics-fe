import { createApp } from "vue";
import { router } from "@/router/router";
import App from "./App.vue";
import { i18n } from "@/i18n";

const app = createApp(App);

app.use(router);
app.use(i18n);
app.mount("#app");

// Now the app has started!
