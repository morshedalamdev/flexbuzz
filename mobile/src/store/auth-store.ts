import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '@/types/auth';
import { deleteToken, storeToken, type TokenType as APIResponse } from '@/lib/token/token';
import { StatusType } from '@/types';
import { api } from '@/lib/api';
import { getUser, type RootUserType } from '@/lib/token/token-validator';
import { showToast } from '@/lib/show-toast';

interface AuthStateType {
  user: RootUserType | null;
  isPending: boolean;
  signup: ({ username, email, password }: SignupRequest) => Promise<SignupResponse>;
  login: ({ username, password }: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
}

export const useAuthStore = create<AuthStateType>()(
  persist(
    (set) => ({
      user: null,
      isPending: false,


      signup: async ({ username, email, password }: SignupRequest): Promise<SignupResponse> => {
        const { fetcher } = api<APIResponse>("/auth/register");
        set({ isPending: true });

        const res = await fetcher({
          method: "POST",
          payload: { username, email, password }
        });

        set({ isPending: false });
        if (!res.success || !res.data) {
          return {
            status: StatusType.ERROR,
            message: res?.message as unknown as string
          };
        }
        // Store tokens and set user
        storeToken({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        });
        // Store user info in state
        const user = getUser(res.data.accessToken);
        set({ user });

        return {
          status: StatusType.SUCCESS,
          message: "Signup successful!",
        };
      },

      login: async ({ username, password }: LoginRequest): Promise<LoginResponse> => {
        const { fetcher } = api<APIResponse>("/auth/login");
        set({ isPending: true });

        const res = await fetcher({
          method: "POST",
          payload: { username, password }
        });

        set({ isPending: false });
        if (!res.success || !res.data) {
          return {
            status: StatusType.ERROR,
            message: res?.message as unknown as string
          };
        }
        // Store tokens and set user
        storeToken({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        });
        // Store user info in state
        const user = getUser(res.data.accessToken);
        set({ user });

        return {
          status: StatusType.SUCCESS,
          message: "Login successful!",
        };
      },

      logout: () => {
        deleteToken();
        set({ user: null });
        showToast(StatusType.SUCCESS, "Logged out successfully.");

      }
    }),
    {
      name: 'flexbuzz-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user })
    }
  )
);
