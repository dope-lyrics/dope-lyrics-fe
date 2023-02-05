import { createI18n } from "vue-i18n";
import { en, tr } from "@/locales";
import { CookieManager } from "@/utils/CookieManager";

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

const initLocaleFromCookie = () => {
  if (CookieManager.get.lang()) {
    i18n.global.locale.value = CookieManager.get.lang();
    return;
  }

  CookieManager.set.lang(i18n.global.locale.value);
};

initLocaleFromCookie();

const localizationMessages =
  i18n.global.messages.value[CookieManager.get.lang()];

export { i18n, localizationMessages };
