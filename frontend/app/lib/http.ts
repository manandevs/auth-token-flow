import axios from "axios";
import { getApiOrigin } from "~/lib/api";
import { getToken } from "~/lib/token";

export const http = axios.create({
  baseURL: getApiOrigin(),
});

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

