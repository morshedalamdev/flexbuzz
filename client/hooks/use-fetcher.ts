import {
  deleteToken,
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
} from "@/lib/token";
import { isTokenValid } from "@/lib/token-validator";
import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";

type OptionsType = {
  method?: Method;
  payload?: unknown;
  params?: unknown;
};

export type FetcherResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

// REFRESH ACCESS TOKEN API CALL USING REFRESH TOKEN
const refreshTokenAPI = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken || !isTokenValid(refreshToken)) {
    deleteToken();
    return null;
  }

  try {
    const res = await axios.post(
      `${BASE_URL}/auth/refresh-token`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    const newAccessToken = res.data.accessToken;
    updateAccessToken(newAccessToken);
    return newAccessToken;
  } catch {
    deleteToken();
    return null;
  }
};
// GET VALID ACCESS TOKEN, REFRESHING IF EXPIRED
const getToken = async (): Promise<string | null> => {
  const accessToken = getAccessToken();
  if (accessToken && isTokenValid(accessToken)) return accessToken;

  console.warn("Access token expired. Refreshing token...");
  return await refreshTokenAPI();
};

export function useFetcher<T = undefined>(url: string) {
  const fetcher = async (
    options?: OptionsType,
  ): Promise<FetcherResponse<T>> => {
    const { method = "GET", payload, params } = options ?? {};
    // CHECK FOR TOKEN, BLOCKING UNAUTHORIZED REQUESTS TO PROTECTED ENDPOINTS
    const token = await getToken();
    if (!token && url !== "/auth/login" && url !== "/auth/register") {
      return {
        success: false,
        message: "Session expired. Please log in again.",
        data: null,
      };
    }

    // CONFIGURE AXIOS REQUEST
    const config = (t: string | null): AxiosRequestConfig => ({
      url: `${BASE_URL}${url}`,
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(t && { Authorization: `Bearer ${t}` }),
      },
      ...(payload !== undefined && { data: payload }),
      ...(params !== undefined && { params }),
    });

    // TRY API CALL, HANDLE TOKEN REFRESH ON 401, AND RETURN RESPONSE
    try {
      const response = await axios.request<T>(config(token));
      return {
        success: true,
        message: "",
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      // IF UNAUTHORIZED, TRY REFRESHING TOKEN AND RETRYING ONCE
      if (axiosError.response?.status === 401) {
        console.warn("Unauthorized. Attempting to refresh token...");
        const newToken = await refreshTokenAPI();
        // IF TOKEN REFRESHED, RETRY ORIGINAL REQUEST WITH NEW TOKEN
        if (newToken) {
          try {
            const retryResponse = await axios.request<T>(config(newToken));
            return {
              success: true,
              message: "",
              data: retryResponse.data,
            };
          } catch (retryError) {
            const retryAxiosError = retryError as AxiosError<{
              message?: string;
            }>;
            // IF RETRY ALSO FAILS, RETURN ERROR MESSAGE
            const retryErrorMessage =
              retryAxiosError.response?.data?.message ??
              retryAxiosError.message ??
              "An error occurred while fetching data after token refresh.";
            return {
              success: false,
              message: retryErrorMessage,
              data: null,
            };
          }
        }
        // IF TOKEN CANNOT BE REFRESHED, RETURN SESSION EXPIRED MESSAGE
        return {
          success: false,
          message: "Session expired. Please log in again.",
          data: null,
        };
      }
      // FOR OTHER ERRORS, RETURN ERROR MESSAGE
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
