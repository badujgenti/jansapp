import axios, { AxiosError } from "axios";
import type { ApiError } from "@/shared/types/api.types";

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "statusCode" in error
  );
}

export function parseApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    const responseData = axiosError.response?.data;

    if (responseData && isApiError(responseData)) {
      return responseData;
    }

    return {
      message: axiosError.message || "An unexpected error occurred",
      statusCode: axiosError.response?.status ?? 500,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }

  return {
    message: "An unexpected error occurred",
    statusCode: 500,
  };
}
