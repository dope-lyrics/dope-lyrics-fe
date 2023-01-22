import { reactive } from "vue";

type User = {
  user: null | {
    email: string;
  };
  requestedFrom: string;
};

export const store: User = reactive({
  user: null,
  requestedFrom: "",
});
