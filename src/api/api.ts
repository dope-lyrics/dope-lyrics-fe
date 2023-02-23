import axios, { axiosPrivate } from "@/axios/axios";
import type { Login, Add, Token, ApiResponse } from "@/api/types";
import { store } from "@/store/store";
import { CookieManager } from "@/utils/CookieManager";
import jwt_decode from "jwt-decode";

async function login({ payload, onError, onSuccess }: Login) {
  try {
    const response = await axios.post<{
      accessToken: string;
      refreshToken: string;
      user: any;
    }>("/login", payload);

    CookieManager.set.accessToken(response.data.accessToken);

    const decodedRefreshToken: { exp: number } = jwt_decode(
      response.data.refreshToken
    );
    const refreshTokenExpDate = new Date(decodedRefreshToken.exp * 1000);

    CookieManager.set.refreshToken(response.data.refreshToken, {
      expires: refreshTokenExpDate,
    });

    store.user = response?.data?.user;

    if (store.user) {
      CookieManager.set.user(store.user, {
        expires: refreshTokenExpDate,
      });
    }

    if (onSuccess) onSuccess(response?.data);
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

async function token({
  refreshToken,
}: Token): Promise<{ accessToken: string; refreshToken: string } | undefined> {
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

async function add({ payload, onError, onSuccess }: Add) {
  try {
    const response = await axiosPrivate.post("lyrics/add", payload);
    if (onSuccess) onSuccess(response);
  } catch (error: any) {
    console.error(error);
    if (onError) onError(error?.response?.data?.error || error);
  }
}

async function fetchLyrics(queryKey: any) {
  const { page, limit } = queryKey;

  const searchParams = new URLSearchParams();

  searchParams.append("page", page.toString() ?? "0");
  searchParams.append("limit", limit.toString() ?? "10");

  try {
    let response = await axios.get<any>(`/lyrics?${searchParams.toString()}`);

    if (response?.data?.data?.lyrics) {
      return {
        data: response.data.data.lyrics,
        hasMore: response.data.data.hasMore,
      };
    }

    throw new Error("No Data");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function fetchMoods() {
  try {
    let response = await axios.get<{
      data: [{ [key: string]: string }];
    }>("/lyrics/moods");
    return response?.data?.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

const API = { login, logout, add, token, fetchLyrics, fetchMoods };

export { API };
