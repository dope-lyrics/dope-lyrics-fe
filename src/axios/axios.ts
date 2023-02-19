import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";
import { API } from "@/api/api";
import { i18n } from "@/i18n";
import { CookieManager } from "@/utils/CookieManager";
import { convertSecondsToMs } from "@/utils/time";

const commonConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: convertSecondsToMs(10),
  headers: {
    authorization: "",
  },
};

const a = axios.create(commonConfig);
const axiosPrivate = axios.create(commonConfig);

a.interceptors.request.use(
  async function (config: any) {
    config.headers["Accept-Language"] =
      CookieManager.get.lang() || i18n.global.locale.value;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.request.use(
  async function (config: any) {
    // Do something before request is sent
    if (!CookieManager.get.accessToken()) {
      return config;
    }

    const currentDate = new Date();
    const decodedToken: { exp: number } = jwt_decode(
      CookieManager.get.accessToken() as string
    );

    const isTokenExpired = decodedToken.exp * 1000 < currentDate.getTime();

    if (isTokenExpired) {
      const newTokens = await API.token({
        refreshToken: CookieManager.get.refreshToken() || "",
      });

      if (newTokens) {
        CookieManager.set.accessToken(newTokens.accessToken);
        CookieManager.set.refreshToken(newTokens.refreshToken);
      }
    }
    config.headers[
      "authorization"
    ] = `Bearer ${CookieManager.get.accessToken()}`;

    config.headers["Accept-Language"] =
      CookieManager.get.lang() || i18n.global.locale.value;

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
