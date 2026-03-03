import { getAccessToken } from "@/lib/token";
import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";

type OptionsType = {
  method?: Method;
  payload?: unknown;
  params?: unknown;
};

type FetcherResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export function useFetcher<T = undefined>(url: string) {
  const fetcher = async (
    options?: OptionsType,
  ): Promise<FetcherResponse<T>> => {
    const { method = "GET", payload, params } = options ?? {};

    const token = getAccessToken();
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}${url}`,
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(payload !== undefined && { data: payload }),
      ...(params !== undefined && { params }),
    };

    try {
      const response = await axios.request<T>(config);
      return {
        success: true,
        message: "",
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ??
        axiosError.message ??
        "An error occurred while fetching data.";
      return {
        success: false,
        message: errorMessage,
        data: null,
      };
    }
  };

  return { fetcher };
}
