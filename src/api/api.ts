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
    if (onSuccess) onSuccess(response);
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
    console.log(response);

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
    console.log("add response : ", add);
    if (onSuccess) onSuccess(response);
  } catch (error) {
    console.error(error);
    if (onError) onError();
  }
}

async function fetchLyrics({ onError, onSuccess }: FetchLyrics) {
  try {
    const response = await axios.get<any>("/lyrics");
    if (onSuccess) onSuccess(response?.data?.data);
  } catch (error) {
    if (onError) onError(error);
  }
}

export { login, add, token, fetchLyrics };
