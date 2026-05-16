import { api } from "@/lib/api";
import { showToast } from "@/lib/show-toast";
import { StatusType } from "@/types";
import type { UserType } from "@/types/user";
import { create } from "zustand";

interface UserStateType {
  users: Map<string, UserType>;
  isLoading: boolean;
  getUserById: (userId: string) => Promise<UserType | null>;
  updateProfile: (profile: Partial<UserType>) => Promise<void>;
  clearCache: () => void;
}

export const useUserStore = create<UserStateType>((set, get) => ({
  users: new Map(),
  isLoading: false,

  getUserById: async (userId: string): Promise<UserType | null> => {
    // Check cache first
    const cached = get().users.get(userId);
    if (cached) return cached;

    // Fetch from API if not in cache
    const { fetcher } = api<UserType>(`/user/${userId}`);
    set({ isLoading: true });

    try {
      const res = await fetcher();

      if (!res.success) {
        showToast(StatusType.ERROR, res.message || "Failed to fetch user");
        return null;
      }

      // Cache the user
      set((state) => ({
        users: new Map(state.users).set(userId, res.data!),
      }));

      return res.data;
    } catch (error) {
      showToast(StatusType.ERROR, "Failed to fetch user");
      console.error("Error fetching user:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (profile: Partial<UserType>) => {
    const { fetcher } = api<UserType>(`/user/me`);
    set({ isLoading: true });

    try {
      const res = await fetcher({
        method: "PATCH",
        payload: profile,
      })

      if (!res.success || !res.data) {
        showToast(StatusType.ERROR, res.message || "Failed to update profile");
        throw new Error(res.message || "Failed to update profile");
      }

      showToast(StatusType.SUCCESS, "Profile updated successfully");
      // Update cache with new profile data
      set((state) => {
        const updatedUser = { ...state.users.get(res.data!.id), ...res.data } as UserType;
        return {
          users: new Map(state.users).set(res.data!.id, updatedUser),
        };
      });
    } catch (error) {
      showToast(StatusType.ERROR, "Failed to update profile");
      console.error("Error updating profile:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  clearCache: () => set({ users: new Map() }),
}))