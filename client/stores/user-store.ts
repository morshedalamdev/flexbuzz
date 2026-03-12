import { getUser, RootUserType } from "@/lib/token-validator";
import { createJSONStorage, persist } from "zustand/middleware";
import { useFetcher } from "@/hooks/use-fetcher";
import { StatusType, UserType } from "@/lib/types";
import { create } from "zustand";
import { useShowToast } from "@/hooks/use-show-toast";

interface UserStoreType {
  user: RootUserType | null;
  currentUser: UserType | null;
  fetchCurrentUser: (id: string) => Promise<void>;
  setUser: (token: string) => void;
  clearUser: () => void;
}

export const userStore = create<UserStoreType>()(
  persist(
    (set, get) => ({
      user: null,
      currentUser: null,

      fetchCurrentUser: async (id: string) => {
        const { fetcher } = useFetcher<UserType>(`/user/${id}`);

        try {
          const res = await fetcher();

          if (!res.success) {
            useShowToast(
              StatusType.ERROR,
              res.message || "Failed to fetch posts",
            );
            throw new Error(res.message || "Failed to fetch posts");
          }

          set({ currentUser: res.data });
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      },
      
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
