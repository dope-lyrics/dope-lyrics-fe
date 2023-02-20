import axios, { axiosPrivate } from "@/axios/axios";
import type { Login, Add, Token, ApiResponse } from "@/api/types";
import { store } from "@/store/store";
import { CookieManager } from "@/utils/CookieManager";

async function login({ payload, onError, onSuccess }: Login) {
  try {
    const response = await axios.post<{
      accessToken: string;
      refreshToken: string;
      user: any;
    }>("/login", payload);

    CookieManager.set.accessToken(response.data.accessToken);
    CookieManager.set.refreshToken(response.data.refreshToken);

    store.user = response?.data?.user;

    if (store.user) localStorage.setItem("user", JSON.stringify(store.user));

    if (onSuccess) onSuccess(response?.data);
  } catch (error: any) {
    console.error(error);
    if (onError) onError(error?.response?.data?.error || error);
  }
}

async function logout({ onError, onSuccess }: ApiResponse) {
  try {
    axiosPrivate.post<any>("/logout").finally(() => {
      CookieManager.remove.accessToken();
      CookieManager.remove.refreshToken();

      localStorage.removeItem("user");

      store.user = null;
    });

    if (onSuccess) onSuccess();
  } catch (error) {
    console.error(error);
    if (onError) onError(error);
  }
}

async function token({
  refreshToken,
  onError,
  onSuccess,
}: Token): Promise<{ accessToken: string; refreshToken: string } | undefined> {
  try {
    const response = await axios.post<any>("/token", {
      token: refreshToken,
    });

    if (onSuccess) onSuccess(response);

    return response.data;
  } catch (error) {
    console.error(error);
    if (onError) onError();
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
