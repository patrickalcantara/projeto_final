import axios from "axios";
import { getToken, logout } from "./auth";

const baseApi = (baseURL) => {
  const api = axios.create({
    baseURL: baseURL,
  });

  api.interceptors.request.use(async (config) => {
    const token = getToken();

    if (token) {
      config.headers["x-access-token"] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        logout();
        window.location = "/login";
      }
      return Promise.reject(error.response);
    }
  );

  return api;
};

export default baseApi;
