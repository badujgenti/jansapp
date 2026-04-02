import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { config } from "@/shared/constants/config";
import { secureStorage } from "@/shared/services/storage/secure-storage";
import { parseApiError } from "./error-handler";
import type { ApiResponse } from "@/shared/types/api.types";

const apiClient = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
}

apiClient.interceptors.request.use(
  async (requestConfig: InternalAxiosRequestConfig) => {
    const token = await secureStorage.get(config.storage.accessTokenKey);
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return apiClient(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = await secureStorage.get(
        config.storage.refreshTokenKey
      );

      if (!refreshToken) {
        throw new Error("No refresh token");
      }

      const { data } = await axios.post<
        ApiResponse<{ accessToken: string; refreshToken: string }>
      >(`${config.api.baseURL}/auth/refresh`, { refreshToken });

      const newAccessToken = data.data.accessToken;
      const newRefreshToken = data.data.refreshToken;

      await secureStorage.set(config.storage.accessTokenKey, newAccessToken);
      await secureStorage.set(config.storage.refreshTokenKey, newRefreshToken);

      processQueue(null, newAccessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      await secureStorage.remove(config.storage.accessTokenKey);
      await secureStorage.remove(config.storage.refreshTokenKey);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export async function apiGet<T>(
  url: string,
  params?: AxiosRequestConfig["params"]
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient.get<ApiResponse<T>>(url, { params });
    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
}

export async function apiPost<T>(
  url: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient.post<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
}

export async function apiPatch<T>(
  url: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient.patch<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
}

export async function apiDelete<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient.delete<ApiResponse<T>>(url);
    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
}

export { apiClient };
