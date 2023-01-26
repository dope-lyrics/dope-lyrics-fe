import type { LoginSchemaType } from "@/pages/Login/types";

type Callback = (arg?: any) => void;

type ApiResponse = {
  onError?: Callback;
  onSuccess?: Callback;
};

type Login = {
  payload: LoginSchemaType;
  onError: Callback;
  onSuccess?: Callback;
};

export type AddPayload = {
  singer: string;
  song: string;
  lyric: string;
  mood?: string;
  language: "en" | "tr";
};

type Add = {
  payload: AddPayload;
} & ApiResponse;

type Token = {
  refreshToken: string;
  onError?: Callback;
  onSuccess?: Callback;
};

type FetchLyrics = {
  pagination: {
    page: string;
    limit: string;
  };
} & ApiResponse;

export type { Login, Add, Token, FetchLyrics };
