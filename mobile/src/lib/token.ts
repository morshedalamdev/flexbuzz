const TOKEN_KEY = {
  ACCESS: "access_token",
  REFRESH: "refresh_token",
} as const;

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const setCookie = (key: string, value: string): void => {
  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
};

const getCookie = (key: string): string | null => {
  const encodedKey = `${key}=`;
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith(encodedKey)) {
      return decodeURIComponent(trimmedCookie.slice(encodedKey.length));
    }
  }

  return null;
};

const deleteCookie = (key: string): void => {
  document.cookie = `${key}=; path=/; max-age=0; samesite=lax`;
};

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

export const storeToken = (token: TokenType): void => {
  setCookie(TOKEN_KEY.ACCESS, token.accessToken);
  setCookie(TOKEN_KEY.REFRESH, token.refreshToken);
};

export const getToken = (): TokenType | null => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken || !refreshToken) return null;

  return { accessToken, refreshToken };
};

export const getAccessToken = (): string | null => {
  return getCookie(TOKEN_KEY.ACCESS);
};

export const getRefreshToken = (): string | null => {
  return getCookie(TOKEN_KEY.REFRESH);
};

export const updateAccessToken = (newToken: string): void => {
  setCookie(TOKEN_KEY.ACCESS, newToken);
};

export const deleteToken = (): void => {
  deleteCookie(TOKEN_KEY.ACCESS);
  deleteCookie(TOKEN_KEY.REFRESH);
};

export const deleteAccessToken = (): void => {
  deleteCookie(TOKEN_KEY.ACCESS);
};

export const deleteRefreshToken = (): void => {
  deleteCookie(TOKEN_KEY.REFRESH);
};
