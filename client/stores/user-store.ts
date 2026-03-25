import { useFetcher } from "@/hooks/use-fetcher";
import { StatusType, UserType } from "@/lib/types";
import { create } from "zustand";
import { useShowToast } from "@/hooks/use-show-toast";

interface UserStoreType {
  user: UserType | null;
  fetchUser: (id: string) => Promise<void>;
}

export const userStore = create<UserStoreType>((set, get) => ({
  user: null,

  fetchUser: async (id: string) => {
    const { fetcher } = useFetcher<UserType>(`/user/${id}`);

    try {
      const res = await fetcher();

      if (!res.success) {
        useShowToast(StatusType.ERROR, res.message || "Failed to fetch posts");
        throw new Error(res.message || "Failed to fetch posts");
      }

      set({ user: res.data });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  },
}));
