import type { LoginSchemaType } from "@/pages/Login/types";
import type { AddPayloadType } from "@/pages/Add/types";

type Callback = (arg?: any) => void;

export type ApiResponse = {
  onError?: Callback;
  onSuccess?: Callback;
};

type Login = {
  payload: LoginSchemaType;
} & ApiResponse;

type Add = {
  payload: AddPayloadType;
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
