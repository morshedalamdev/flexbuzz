import { api } from "@/lib/api";
import { showToast } from "@/lib/show-toast";
import { StatusType } from "@/types";
import type { UserType } from "@/types/user";
import { create } from "zustand";

interface UserStateType {
  users: Map<string, UserType>;
  isLoading: boolean;
  getUserById: (userId: string) => Promise<UserType>;
  updateProfile: (profile: Partial<UserType>) => Promise<UserType>;
  followUser: (userId: string, isFollowed: boolean) => Promise<void>;
  clearCache: () => void;
}

export const useUserStore = create<UserStateType>((set, get) => ({
  users: new Map(),
  isLoading: false,

  getUserById: async (userId: string) => {
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
        throw new Error(res.message || "Failed to fetch user");
      }

      // Cache the user
      set((state) => ({
        users: new Map(state.users).set(userId, res.data!),
      }));
      return res.data!;
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

      if (!res.success) {
        showToast(StatusType.ERROR, res.message || "Failed to update profile");
        throw new Error(res.message || "Failed to update profile");
      }

      // Update cache with new profile data
      set((state) => {
        const updatedUser = { ...state.users.get(res.data!.id), ...res.data } as UserType;
        return {
          users: new Map(state.users).set(res.data!.id, updatedUser),
        };
      });
      return res.data!;
    } catch (error) {
      showToast(StatusType.ERROR, "Failed to update profile");
      console.error("Error updating profile:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  followUser: async (userId: string, isFollowed: boolean) => {
    const { fetcher } = api(`/user/${userId}/${isFollowed ? "unfollow" : "follow"}`);
    set({ isLoading: true });

    try {
      const res = await fetcher({
        method: isFollowed ? "DELETE" : "POST",
      });

      if (!res.success) {
        showToast(StatusType.ERROR, res.message || "Failed to follow/unfollow user");
        throw new Error(res.message || "Failed to follow/unfollow user");
      }

      // Update cache with new follower status
      set((state) => {
        const existingUser = state.users.get(userId);

        if (!existingUser) return state;

        const followerCount = existingUser.followerCount ?? 0;

        const updatedUser: UserType = {
          ...existingUser,
          isFollowed: !isFollowed,
          followerCount: isFollowed ? followerCount - 1 : followerCount + 1,
        };

        return {
          users: new Map(state.users).set(userId, updatedUser),
        };
      });
    } catch (error) {
      showToast(StatusType.ERROR, "An error occurred while following/unfollowing user");
      console.error("Error following/unfollowing user:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  clearCache: () => set({ users: new Map() }),
}))