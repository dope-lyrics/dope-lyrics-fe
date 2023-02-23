import Cookies from "js-cookie";
import { Languages } from "@/types/common";

const COOKIES = {
  access_token: "access_token",
  refresh_token: "refresh_token",
  user: "user",
  lang: "lang",
} as const;
const { access_token, refresh_token, user, lang } = COOKIES;

const CookieManager = {
  get: {
    accessToken: () => {
      return Cookies.get(access_token);
    },
    refreshToken: () => {
      return Cookies.get(refresh_token);
    },
    user: (): null | { username: string } => {
      if (typeof Cookies.get(user) === "string") {
        return JSON.parse(Cookies.get(user) as string);
      }
      return null;
    },
    lang: () => {
      return Cookies.get(lang) as Languages;
    },
  },
  set: {
    accessToken: (
      value: string,
      options?: Cookies.CookieAttributes | undefined
    ) => {
      Cookies.set(access_token, value, options);
    },
    refreshToken: (
      value: string,
      options?: Cookies.CookieAttributes | undefined
    ) => {
      Cookies.set(refresh_token, value, options);
    },
    user: (value: any, options: Cookies.CookieAttributes | undefined) => {
      Cookies.set(user, JSON.stringify(value), options);
    },
    lang: (value: Languages) => {
      Cookies.set(lang, value);
    },
  },
  remove: {
    accessToken: function () {
      Cookies.remove(access_token);
    },
    refreshToken: function () {
      Cookies.remove(refresh_token);
    },
    user: function () {
      Cookies.remove(user);
    },
    clearAll: function () {
      this.accessToken();
      this.refreshToken();
      this.user();
    },
  },
};

export { CookieManager };
