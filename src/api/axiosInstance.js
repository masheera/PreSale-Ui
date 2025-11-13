// src/api/axiosInstance.js
import axios from "axios";

// Single source of truth for your API root (always ends with a trailing slash)
// export const BASE_URL = (
//   import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api"
// ).replace(/\/?$/, "/");

export const BASE_URL = "/api/";


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// Helpers
const getAccess = () => localStorage.getItem("access") || null;
const getRefresh = () => localStorage.getItem("refresh") || null;

// Attach access token if present
axiosInstance.interceptors.request.use((config) => {
  const token = getAccess();
  if (token && !config.headers?.Authorization) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

let isRefreshing = false;
let queue = [];
const flushQueue = (err, token = null) => {
  queue.forEach((p) => (token ? p.resolve(token) : p.reject(err)));
  queue = [];
};

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error?.config;
    const status = error?.response?.status;

    if (!original || original._retry) return Promise.reject(error);

    if (status === 401) {
      const refresh = getRefresh();
      if (!refresh) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        if (window.location.pathname !== "/login")
          window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((newAccess) => {
          original.headers = {
            ...(original.headers || {}),
            Authorization: `Bearer ${newAccess}`,
          };
          original._retry = true;
          return axiosInstance(original);
        });
      }

      isRefreshing = true;
      try {
        // use raw axios to avoid interceptor recursion
        const resp = await axios.post(`${BASE_URL}accounts/token/refresh/`, {
          refresh,
        });
        const newAccess = resp?.data?.access;
        if (!newAccess) throw new Error("No access token in refresh response");

        localStorage.setItem("access", newAccess);
        isRefreshing = false;
        flushQueue(null, newAccess);

        original.headers = {
          ...(original.headers || {}),
          Authorization: `Bearer ${newAccess}`,
        };
        original._retry = true;
        return axiosInstance(original);
      } catch (err) {
        isRefreshing = false;
        flushQueue(err, null);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        if (window.location.pathname !== "/login")
          window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;