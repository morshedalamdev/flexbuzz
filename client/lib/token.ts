const TOKEN_KEY = {
  ACCESS: "access_token",
  REFRESH: "refresh_token",
} as const;

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const isClient = (): boolean => typeof window !== "undefined";

const setCookie = (key: string, value: string): void => {
  if (!isClient()) return;

  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
};

const getCookie = (key: string): string | null => {
  if (!isClient()) return null;

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
  if (!isClient()) return;

  document.cookie = `${key}=; path=/; max-age=0; samesite=lax`;
};

const getFromLocalStorage = (key: string): string | null => {
  if (!isClient()) return null;
  return localStorage.getItem(key);
};

const setInLocalStorage = (key: string, value: string): void => {
  if (!isClient()) return;
  localStorage.setItem(key, value);
};

const removeFromLocalStorage = (key: string): void => {
  if (!isClient()) return;
  localStorage.removeItem(key);
};

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

// STORE TOKEN in localStorage for persistence across sessions
export const storeToken = (token: TokenType) => {
  setInLocalStorage(TOKEN_KEY.ACCESS, token.accessToken);
  setInLocalStorage(TOKEN_KEY.REFRESH, token.refreshToken);
  setCookie(TOKEN_KEY.ACCESS, token.accessToken);
  setCookie(TOKEN_KEY.REFRESH, token.refreshToken);
};

// GET TOKEN
export const getToken = (): TokenType | null => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken || !refreshToken) return null;

  return { accessToken, refreshToken };
};

export const getAccessToken = (): string | null => {
  return getFromLocalStorage(TOKEN_KEY.ACCESS) ?? getCookie(TOKEN_KEY.ACCESS);
};

export const getRefreshToken = (): string | null => {
  return (
    getFromLocalStorage(TOKEN_KEY.REFRESH) ?? getCookie(TOKEN_KEY.REFRESH)
  );
};

// UPDATE TOKEN
export const updateAccessToken = (newToken: string): void => {
  setInLocalStorage(TOKEN_KEY.ACCESS, newToken);
  setCookie(TOKEN_KEY.ACCESS, newToken);
};

// DELETE TOKEN
export const deleteToken = (): void => {
  removeFromLocalStorage(TOKEN_KEY.ACCESS);
  removeFromLocalStorage(TOKEN_KEY.REFRESH);
  deleteCookie(TOKEN_KEY.ACCESS);
  deleteCookie(TOKEN_KEY.REFRESH);
};

export const deleteAccessToken = (): void => {
  removeFromLocalStorage(TOKEN_KEY.ACCESS);
  deleteCookie(TOKEN_KEY.ACCESS);
};

export const deleteRefreshToken = (): void => {
  removeFromLocalStorage(TOKEN_KEY.REFRESH);
  deleteCookie(TOKEN_KEY.REFRESH);
};
