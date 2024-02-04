import { store } from "@/store/store";
import { CookieManager } from "@/utils/CookieManager";

function Auth() {
  let isAuthenticated = false;
  
  const userInCookie = CookieManager.getters.user();

  if (userInCookie) {
    isAuthenticated = true;
  }

  store.user = userInCookie;

  return {
    isAuthenticated,
  };
}

export { Auth };
