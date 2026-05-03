import { create } from 'zustand';
import type { User } from '@/types';
import { CURRENT_USER } from '@/lib/mock-data';
import {
  login as authLogin,
  logout as authLogout,
  signup as authSignup,
  type LoginInput,
  type SignupInput,
} from '@/lib/auth';
import { getRefreshToken } from '@/lib/token';
import { getUser } from '@/lib/token-validator';
import { usePostStore } from '@/store/post-store';

interface AuthState {
  currentUser: User;
  isAuthenticated: boolean;
  authError: string | null;
  login: (input: LoginInput) => Promise<boolean>;
  signup: (input: SignupInput) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User['profile']> & { username?: string; email?: string }) => void;
}

function resolveInitialUser(): User {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    const decoded = getUser(refreshToken);
    if (decoded) {
      return {
        ...CURRENT_USER,
        id: decoded.sub,
        username: decoded.username,
        email: decoded.email,
      };
    }
  }
  return CURRENT_USER;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: resolveInitialUser(),
  isAuthenticated: !!getRefreshToken(),
  authError: null,

  login: async (input: LoginInput): Promise<boolean> => {
    set({ authError: null });
    const result = await authLogin(input);
    if (!result.success) {
      set({ authError: result.message });
      return false;
    }
    const decoded = getUser(result.accessToken);
    if (decoded) {
      set((state) => ({
        currentUser: {
          ...state.currentUser,
          id: decoded.sub,
          username: decoded.username,
          email: decoded.email,
        },
      }));
    }
    set({ isAuthenticated: true });
    return true;
  },

  signup: async (input: SignupInput): Promise<boolean> => {
    set({ authError: null });
    const result = await authSignup(input);
    if (!result.success) {
      set({ authError: result.message });
      return false;
    }
    const decoded = getUser(result.accessToken);
    if (decoded) {
      set((state) => ({
        currentUser: {
          ...state.currentUser,
          id: decoded.sub,
          username: decoded.username,
          email: decoded.email,
        },
      }));
    }
    set({ isAuthenticated: true });
    return true;
  },

  logout: () => {
    authLogout();
    set({ isAuthenticated: false, currentUser: CURRENT_USER, authError: null });
  },

  updateProfile: (updates: Partial<User['profile']> & { username?: string; email?: string }) => {
    set((state) => ({
      currentUser: {
        ...state.currentUser,
        username: updates.username ?? state.currentUser.username,
        email: updates.email ?? state.currentUser.email,
        profile: { ...state.currentUser.profile, ...updates },
      },
    }));
    // Sync denormalised user data inside posts/comments
    const { id } = get().currentUser;
    usePostStore.getState().syncUserInPosts(id, updates);
  },
}));
