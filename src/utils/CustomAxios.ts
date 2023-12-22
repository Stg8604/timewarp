import { BACKEND_URL } from "@config/config";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  config.withCredentials = true;
  return config;
};

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest);
  return axiosInstance;
};

const axiosConfig: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});

const CustomAxios = setupInterceptorsTo(axiosConfig);

export default CustomAxios;
