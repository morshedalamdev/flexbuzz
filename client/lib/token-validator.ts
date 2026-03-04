import { jwtDecode } from "jwt-decode";

type DecodedToken = {
     exp: number;
     [key: string]: unknown;
}

export function isTokenValid(token: string): boolean {
     try {
         const decoded = jwtDecode<DecodedToken>(token);
         const currentTime = Date.now() / 1000;
         return decoded.exp > currentTime + 10;
     } catch {
          return false;
     }
}