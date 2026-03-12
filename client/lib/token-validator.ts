import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp: number;
  [key: string]: unknown;
};

export function isTokenValid(token: string): boolean {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime + 10;
  } catch {
    return false;
  }
}

export interface UserType {
  sub: string;
  username: string;
  email: string;
};

export function getUser(token: string): UserType | null {
  const decoded = jwtDecode<UserType>(token);
  if (!decoded) return null;

  return {
    sub: decoded.sub,
    username: decoded.username,
    email: decoded.email,
  };
}
