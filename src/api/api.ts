import axios, { axiosPrivate } from "@/axios/axios";
import type { Login, Add, Token, FetchLyrics, ApiResponse } from "@/api/types";
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

async function fetchLyrics({ pagination, onError, onSuccess }: FetchLyrics) {
  const searchParams = new URLSearchParams();
  searchParams.append("page", pagination.page || "1");
  searchParams.append("limit", pagination.limit || "10");

  try {
    const response = await axios.get<any>(`/lyrics?${searchParams.toString()}`);
    if (onSuccess) onSuccess(response?.data?.data);
  } catch (error) {
    if (onError) onError(error);
  }
}

export { login, logout, add, token, fetchLyrics };
