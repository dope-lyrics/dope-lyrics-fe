import { reactive } from "vue";

type User = {
  user: null | {
    username: string;
  };
  redirectTo: string;
};

export const store: User = reactive({
  user: null,
  redirectTo: "",
});
