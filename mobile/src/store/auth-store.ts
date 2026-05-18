import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '@/types/auth';
import { deleteToken, storeToken, type TokenType as APIResponse } from '@/lib/token/token';
import { StatusType } from '@/types';
import { api } from '@/lib/api';
import { getRootUser, type RootUserType } from '@/lib/token/token-validator';
import { showToast } from '@/lib/show-toast';
import { useUserStore } from './user-store';
import { usePostStore } from './post-store';

interface AuthStateType {
  rootUser: RootUserType | null;
  isLoading: boolean;
  signup: ({ username, email, password }: SignupRequest) => Promise<SignupResponse>;
  login: ({ username, password }: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
}

export const useAuthStore = create<AuthStateType>()(
  persist(
    (set) => ({
      rootUser: null,
      isLoading: false,


      signup: async ({ username, email, password }: SignupRequest) => {
        const { fetcher } = api<APIResponse>("/auth/register");
        set({ isLoading: true });

        const res = await fetcher({
          method: "POST",
          payload: { username, email, password }
        });

        set({ isLoading: false });
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
        const rootUser = getRootUser(res.data.accessToken);
        set({ rootUser });

        return {
          status: StatusType.SUCCESS,
          message: "Signup successful!",
        };
      },

      login: async ({ username, password }: LoginRequest) => {
        const { fetcher } = api<APIResponse>("/auth/login");
        set({ isLoading: true });

        const res = await fetcher({
          method: "POST",
          payload: { username, password }
        });

        set({ isLoading: false });
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
        const rootUser = getRootUser(res.data.accessToken);
        set({ rootUser });

        return {
          status: StatusType.SUCCESS,
          message: "Login successful!",
        };
      },

      logout: () => {
        deleteToken(); // Clear tokens from storage
        useUserStore.getState().clearCache(); // Clear user cache on logout
        usePostStore.getState().clearCache(); // Clear post cache on logout
        set({ rootUser: null }); // Clear user info from state
        showToast(StatusType.SUCCESS, "Logged out successfully.");

      }
    }),
    {
      name: 'flexbuzz-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ rootUser: state.rootUser })
    }
  )
);
