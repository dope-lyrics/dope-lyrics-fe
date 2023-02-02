import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { token } from "@/api/api";
import { i18n } from "@/i18n";

const commonConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    authorization: "",
  },
};

const a = axios.create(commonConfig);
const axiosPrivate = axios.create(commonConfig);

a.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    // @ts-ignore
    config.headers["Accept-Language"] =
      Cookies.get("lang") || i18n.global.locale.value;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    // Do something before request is sent
    if (!Cookies.get("access_token")) {
      return config;
    }

    const currentDate = new Date();
    const decodedToken: { exp: number } = jwt_decode(
      Cookies.get("access_token") as string
    );
    const isTokenExpired = decodedToken.exp * 1000 < currentDate.getTime();

    if (isTokenExpired) {
      const newTokens = await token({
        refreshToken: Cookies.get("refresh_token") || "",
      });

      if (newTokens) {
        Cookies.set("access_token", newTokens.accessToken);
        Cookies.set("refresh_token", newTokens.refreshToken);
      }
    }
    // @ts-ignore
    config.headers["authorization"] = `Bearer ${Cookies.get("access_token")}`;
    // @ts-ignore
    config.headers["Accept-Language"] =
      Cookies.get("lang") || i18n.global.locale.value;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

type ApiResponse = any;

const api = (axios: AxiosInstance) => {
  return {
    get: <T extends ApiResponse>(
      url: string,
      config: AxiosRequestConfig = {}
    ) => {
      return axios.get<T>(url, config);
    },
    delete: <T extends ApiResponse>(
      url: string,
      config: AxiosRequestConfig = {}
    ) => {
      return axios.delete<T>(url, config);
    },
    put: <T extends ApiResponse>(
      url: string,
      body: unknown,
      config: AxiosRequestConfig = {}
    ) => {
      return axios.put<T>(url, body, config);
    },
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
      return axios.patch<T>(url, body, config);
    },
    post: <T extends ApiResponse>(
      url: string,
      body?: unknown,
      config: AxiosRequestConfig = {}
    ) => {
      return axios.post<T>(url, body, config);
    },
  };
};

const _axiosPrivate = api(axiosPrivate);

export default api(a);
export { _axiosPrivate as axiosPrivate };
