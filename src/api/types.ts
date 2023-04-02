type Callback = (arg?: any) => void;

export type ApiResponse = {
  onError?: Callback;
  onSuccess?: Callback;
};
