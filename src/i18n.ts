import { createI18n } from "vue-i18n";
import { en, tr } from "@/locales";

const messages = {
  en,
  tr,
};

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: "en", // set locale
  fallbackLocale: "tr", // set fallback locale
  messages, // set locale messages
});

export { i18n };

