import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";
import { i18n } from "@/i18n";
import { CookieManager } from "@/utils/CookieManager";
import { timeAsMs } from "@/utils/time";
import { UserAPI } from "@/api/user/user";

const commonConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: timeAsMs(20, "seconds"),
  headers: {
    authorization: "",
  },
};

const a = axios.create(commonConfig);
const axiosPrivate = axios.create(commonConfig);

a.interceptors.request.use(
  async function (config: any) {
    config.headers["Accept-Language"] =
      CookieManager.getters.lang() || i18n.global.locale.value;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.request.use(
  async function (config: any) {
    if (!CookieManager.getters.accessToken()) {
      return;
    }

    if (!CookieManager.getters.refreshToken()) {
      CookieManager.remove.clearAll();

      window.location.href = "/";
      return;
    }

    const currentDate = new Date();
    const decodedToken: { exp: number } = jwt_decode(
      CookieManager.getters.accessToken() as string
    );

    const isTokenExpired = decodedToken.exp * 1000 < currentDate.getTime();

    if (isTokenExpired) {
      await UserAPI.token(CookieManager.getters.refreshToken() as string);
    }
    config.headers[
      "authorization"
    ] = `Bearer ${CookieManager.getters.accessToken()}`;

    config.headers["Accept-Language"] =
      CookieManager.getters.lang() || i18n.global.locale.value;

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
