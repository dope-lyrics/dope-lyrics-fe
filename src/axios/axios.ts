import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { token } from "@/api/api";
import { AxiosRequestConfig } from "axios";

const commonConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    authorization: "",
  },
};

const a = axios.create(commonConfig);
const axiosPrivate = axios.create(commonConfig);

// a.interceptors.request.use(
//   async function (config) {
//     return config;
//   },
//   function (error) {
//     Promise.reject(error);
//   }
// );

// Add a request interceptor
axiosPrivate.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    // Do something before request is sent
    console.log("CONFIG: ", config);
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
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default a;
export { axiosPrivate };
