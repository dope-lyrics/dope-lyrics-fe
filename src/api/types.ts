type Callback = (arg?: any) => void;

type ApiResponse = {
  errorCallback?: Callback;
  successCallback?: Callback;
};

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
  mood?: string;
  singer: string;
  language: "en" | "tr";
};

type Add = {
  payload: AddPayload;
} & ApiResponse;

type Token = {
  refreshToken: string;
  errorCallback?: Callback;
  successCallback?: Callback;
};

type FetchLyrics = {} & ApiResponse;

export type { Login, Add, Token, FetchLyrics };
