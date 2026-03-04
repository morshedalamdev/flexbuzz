const TOKEN_KEY = {
  ACCESS: "access_token",
  REFRESH: "refresh_token",
} as const;

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

// PREVENTS crash during SSR when window is not defined
// const isClient = (): boolean => typeof window !== "undefined";

// STORE TOKEN in localStorage for persistence across sessions
export const storeToken = (token: TokenType) => {
  localStorage.setItem(TOKEN_KEY.ACCESS, token.accessToken);
  localStorage.setItem(TOKEN_KEY.REFRESH, token.refreshToken);
};

// GET TOKEN
export const getToken = (): TokenType | null => {
  const accessToken = localStorage.getItem(TOKEN_KEY.ACCESS);
  const refreshToken = localStorage.getItem(TOKEN_KEY.REFRESH);

  if (!accessToken || !refreshToken) return null;

  return { accessToken, refreshToken };
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY.ACCESS);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY.REFRESH);
};

// UPDATE TOKEN
export const updateAccessToken = (newToken: string): void => {
  localStorage.setItem(TOKEN_KEY.ACCESS, newToken);
};

// DELETE TOKEN
export const deleteToken = (): void => {
  localStorage.removeItem(TOKEN_KEY.ACCESS);
  localStorage.removeItem(TOKEN_KEY.REFRESH);
};

export const deleteAccessToken = (): void => {
  localStorage.removeItem(TOKEN_KEY.ACCESS);
};

export const deleteRefreshToken = (): void => {
  localStorage.removeItem(TOKEN_KEY.REFRESH);
};
