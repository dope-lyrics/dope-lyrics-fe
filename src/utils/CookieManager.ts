import Cookies from "js-cookie";
import { Languages } from "@/types/common";

type CookieTypes = "accessToken" | "refreshToken" | "lang";
type Tokens = Exclude<CookieTypes, "lang">;

type CookieManagerProps = {
  get: {
    [key in Tokens]: () => string | undefined;
  } & {
    lang: () => Languages;
  };
  set: {
    [key in Tokens]: (value: string) => void;
  } & {
    lang: (value: Languages) => void;
  };
  remove: {
    [key in Tokens]: () => void;
  };
};

const CookieManager: CookieManagerProps = {
  get: {
    accessToken: () => {
      return Cookies.get("access_token");
    },
    refreshToken: () => {
      return Cookies.get("refresh_token");
    },
    lang: () => {
      return Cookies.get("lang") as Languages;
    },
  },
  set: {
    accessToken: (value: string) => {
      Cookies.set("access_token", value);
    },
    refreshToken: (value: string) => {
      Cookies.set("refresh_token", value);
    },
    lang: (value: Languages) => {
      Cookies.set("lang", value);
    },
  },
  remove: {
    accessToken: () => {
      Cookies.remove("access_token");
    },
    refreshToken: () => {
      Cookies.remove("refres_token");
    },
  },
};

export { CookieManager };
