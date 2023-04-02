import { createApp } from "vue";
import { router } from "@/router/router";
import App from "./App.vue";
import { i18n } from "@/i18n";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'



const app = createApp(App);

export const queryClient = new QueryClient();
const vfm = createVfm();

app.use(router);
app.use(i18n);
app.use(VueQueryPlugin);
app.use(vfm);
app.mount("#app");
