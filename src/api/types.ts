type Callback = (arg?: any) => void;

type LoginPayload = {
  email: string;
  password: string;
};
type Login = {
  payload: LoginPayload;
  errorCallback?: Callback;
  successCallback?: Callback;
};

type AddPayload = {
  lyric: string;
  singer: string;
  mood: string;
};
type Add = {
  payload: AddPayload;
  errorCallback?: Callback;
  successCallback?: Callback;
};

type Token = {
  refreshToken: string;
  errorCallback?: Callback;
  successCallback?: Callback;
};

export type { Login, Add, Token };
