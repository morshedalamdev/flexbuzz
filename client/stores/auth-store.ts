import { getUser, RootUserType } from "@/lib/token-validator";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";

interface AuthStoreType {
  user: RootUserType | null;
  setUser: (token: string) => void;
  clearUser: () => void;
}

export const authStore = create<AuthStoreType>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (token: string) => {
        const user = getUser(token);
        set({ user: user });
      },

      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);