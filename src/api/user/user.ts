import axios, { axiosPrivate } from "@/axios/axios";
import { store } from "@/store/store";
import { CookieManager } from "@/utils/CookieManager";
import jwt_decode from "jwt-decode";
import type { ApiResponse } from "@/api/types";
import type { LoginSchemaType } from "@/pages/Login/types";
import type { RegisterSchemaType } from "@/pages/Register/types";

type Login = {
  payload: LoginSchemaType;
} & ApiResponse;

type Register = {
  payload: RegisterSchemaType;
} & ApiResponse;

type LoginVerifyResponse = {
  data: {
    user: any;
    accessToken: string;
    refreshToken: string;
  };
  error: string;
};

type VerifyParameters = ApiResponse & {
  code: string;
};

async function register({ payload, onError, onSuccess }: Register) {
  try {
    const response = await axios.post<{
      data: { message: string };
      error: string;
    }>("/register", payload);

    const data = response.data?.data;

    if (onSuccess) onSuccess(data.message);
  } catch (error: any) {
    console.error(error);
    if (onError) onError(error.response?.data?.error || error.message);
  }
}

async function login({ payload, onError, onSuccess }: Login) {
  try {
    const response = await axios.post<LoginVerifyResponse>("/login", payload);

    const data = response?.data?.data;

    storeLoginInfo(data);

    if (onSuccess) onSuccess(data);
  } catch (error: any) {
    console.error(error);
    if (onError) onError(error?.response?.data?.error || error);
  }
}

async function logout({ onError }: ApiResponse) {
  try {
    await axiosPrivate.post("/logout");

    CookieManager.remove.clearAll();

    store.user = null;
  } catch (error) {
    console.error(error);
    if (onError) onError(error);
  }
}

async function token(
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string } | undefined> {
  try {
    const newTokens = await axios.post<any>("/token", {
      token: refreshToken,
    });

    if (newTokens.data) {
      CookieManager.set.accessToken(newTokens.data.data.accessToken);

      const decodedRefreshToken: { exp: number } = jwt_decode(
        newTokens.data.data.refreshToken
      );
      const refreshTokenExpDate = new Date(decodedRefreshToken.exp * 1000);
      CookieManager.set.refreshToken(newTokens.data.data.refreshToken, {
        expires: refreshTokenExpDate,
      });
    }

    return newTokens.data;
  } catch (error: any) {
    console.error(error);
    if (error?.response?.data?.redirect) {
      CookieManager.remove.clearAll();
      window.location.href = error?.response?.data?.redirect || "/";
    }
  }
}

async function verify({ code, onError, onSuccess }: VerifyParameters) {
  try {
    const response = await axios.post<LoginVerifyResponse>(`/verify/${code}`);
    const data = response?.data.data;
    storeLoginInfo(data);

    if (onSuccess) onSuccess(data);
  } catch (error: any) {
    if (onError) {
      onError(error?.response?.data?.error || (error as Error).message);
    }
  }
}

const storeLoginInfo = (data: LoginVerifyResponse["data"]) => {
  CookieManager.set.accessToken(data.accessToken);

  const decodedRefreshToken: { exp: number } = jwt_decode(data.refreshToken);
  const refreshTokenExpDate = new Date(decodedRefreshToken.exp * 1000);

  CookieManager.set.refreshToken(data.refreshToken, {
    expires: refreshTokenExpDate,
  });

  store.user = data?.user;

  if (store.user) {
    CookieManager.set.user(store.user, {
      expires: refreshTokenExpDate,
    });
  }
};

const UserAPI = { register, login, logout, token, verify };

export { UserAPI };
