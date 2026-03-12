import { getUser, UserType } from "@/lib/token-validator";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStoreType {
  user: UserType | null;
  setUser: (token: string) => void;
  clearUser: () => void;
}

export const userStore = create<UserStoreType>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (token: string) => {
        const user = getUser(token);
        set({ user });
      },

      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
