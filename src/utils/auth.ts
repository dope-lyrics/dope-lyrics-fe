import { store } from "@/store/store";

function Auth() {
  let isAuthenticated = false;

  if (store.user) isAuthenticated = true;
  else {
    const userInLocalStorage = localStorage.getItem("user");
    if (userInLocalStorage) {
      isAuthenticated = true;
      store.user = JSON.parse(userInLocalStorage);
    }
  }

  return {
    isAuthenticated,
  };
}

export { Auth };
