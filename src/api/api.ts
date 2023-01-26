import axios, { axiosPrivate } from "@/axios/axios";
import Cookies from "js-cookie";
import type { Login, Add, Token, FetchLyrics } from "@/api/types";

async function login({ payload, onError, onSuccess }: Login) {
  try {
    const response = await axios.post<{
      accessToken: string;
      refreshToken: string;
    }>("/login", payload);

    Cookies.set("access_token", response.data.accessToken);
    Cookies.set("refresh_token", response.data.refreshToken);

    if (onSuccess) onSuccess(response?.data);
  } catch (error: any) {
    console.error(error);
    if (onError) onError(error?.response?.data?.error || error);
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
  } catch (error) {
    console.error(error);
    if (onError) onError();
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

export { login, add, token, fetchLyrics };
