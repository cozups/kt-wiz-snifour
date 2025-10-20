import { API_URL } from "@/constants/api-url";
import { apiLogger, styledConsole } from "@/lib";
import axios, { AxiosError } from "axios";

const isDev = import.meta.env.MODE === "development";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 요청 인터셉터 (Request Interceptor)
 * - 요청이 전송되기 전에 실행됩니다.
 * - 인증 토큰 추가와 같은 요청 전 처리 로직을 이곳에 작성합니다. (추후 구현시 이쪽에서 작성하심 돼요)
 * - 현재는 개발 환경에서 API 요청 정보를 로깅하는 기능을 포함합니다.
 */
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

/**
 * 응답 인터셉터 (Response Interceptor)
 * - 서버로부터 응답이 도착한 후 실행됩니다.
 * - 응답 데이터를 전처리하거나 로깅하는 데 사용됩니다.
 */
instance.interceptors.response.use(
  (res) => {
    const { status, config: reqData, data: resData } = res;
    if (isDev) apiLogger({ status, reqData, resData });
    return res;
  },
  async (error: AxiosError) => {
    try {
      const { response: res, config: reqData } = error || {};

      if (!res?.status) {
        throw new Error("response status is not exist");
      }

      const { status } = res;

      // 401 에러 처리 (인증에러)

      // 444 에러처리 등 (토큰 등)

      if (isDev) {
        apiLogger({ status, reqData, resData: error, method: "error" });
      }

      // 여기서 error를 그대로 reject한 후
      // React Query의 meta에서 AxiosError를 받을 수 있습니다.
      return Promise.reject(error);
    } catch (e) {
      styledConsole({
        //
        method: "error",
        topic: "UN_HANDLED",
        title: "axios-interceptor",
        data: e,
      });
      return Promise.reject(error);
    }
  }
);

export default instance;
