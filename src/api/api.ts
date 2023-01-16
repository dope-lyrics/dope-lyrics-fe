import axios, { axiosPrivate } from "@/axios/axios";
import Cookies from "js-cookie";
import type { Login, Add, Token, FetchLyrics } from "@/api/types";

async function login({ payload, errorCallback, successCallback }: Login) {
  try {
    const response = await axios.post<{
      accessToken: string;
      refreshToken: string;
    }>("/login", payload);
    Cookies.set("access_token", response.data.accessToken);
    Cookies.set("refresh_token", response.data.refreshToken);
    if (successCallback) successCallback(response);
  } catch (error) {
    console.error(error);
    if (errorCallback) errorCallback(error);
  }
}

async function token({
  refreshToken,
  errorCallback,
  successCallback,
}: Token): Promise<{ accessToken: string; refreshToken: string } | undefined> {
  try {
    const response = await axios.post<any>("/token", {
      token: refreshToken,
    });
    console.log(response);

    if (successCallback) successCallback(response);

    return response.data;
  } catch (error) {
    console.error(error);
    if (errorCallback) errorCallback();
  }
}

async function add({ payload, errorCallback, successCallback }: Add) {
  try {
    const response = await axiosPrivate.post("lyrics/add", payload);
    console.log("add response : ", add);
    if (successCallback) successCallback(response);
  } catch (error) {
    console.error(error);
    if (errorCallback) errorCallback();
  }
}

async function fetchLyrics({ errorCallback, successCallback }: FetchLyrics) {
  try {
    const response = await axios.get<any>("/lyrics");
    if (successCallback) successCallback(response?.data?.data);
  } catch (error) {
    if (errorCallback) errorCallback(error);
  }
}

export { login, add, token, fetchLyrics };
