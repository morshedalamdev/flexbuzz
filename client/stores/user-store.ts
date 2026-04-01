import { useFetcher } from "@/hooks/use-fetcher";
import { FollowListType, PaginationInterface, StatusType, UserType } from "@/lib/types";
import { create } from "zustand";
import { useShowToast } from "@/hooks/use-show-toast";

interface UserStoreType {
  user: UserType | null;
  followers: FollowListType[] | null;
  following: FollowListType[] | null;
  fetchUser: (id: string) => Promise<void>;
  followUser: (id: string, isFollowed: boolean) => Promise<void>;
  fetchFollowers: (id: string) => Promise<void>;
  fetchFollowing: (id: string) => Promise<void>;
}

export const userStore = create<UserStoreType>((set, get) => ({
  user: null,
  followers: null,
  following: null,

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

  followUser: async (id: string, isFollowed: boolean) => {
    const { fetcher } = useFetcher(
      `/user/${id}/${isFollowed ? "unfollow" : "follow"}`,
    );

    try {
      const res = await fetcher({
        method: isFollowed ? "DELETE" : "POST",
      });

      if (!res.success || !res.data) {
        useShowToast(
          StatusType.ERROR,
          res.message || "Failed to follow/unfollow user",
        );
        throw new Error(res.message || "Failed to follow/unfollow user");
      }

      set((state) => ({
        user: state.user
          ? {
              ...state.user,
              isFollowed: !isFollowed,
              followerCount: isFollowed
                ? state.user.followerCount - 1
                : state.user.followerCount + 1,
            }
          : null,
      }));
    } catch (error) {
      useShowToast(
        StatusType.ERROR,
        "An error occurred while following/unfollowing user",
      );
    }
  },

  fetchFollowers: async (id: string) => {
    const { fetcher } = useFetcher<PaginationInterface<FollowListType>>(`/user/followers?followingId=${id}`);

    try {
      const res = await fetcher();

      if (!res.success) {
        useShowToast(StatusType.ERROR, res.message || "Failed to fetch followers");
        throw new Error(res.message || "Failed to fetch followers");
      }
      console.log({ res });
      set({ followers: res.data?.data });
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  },

  fetchFollowing: async (id: string) => {
    const { fetcher } = useFetcher<PaginationInterface<FollowListType>>(`/user/following?followerId=${id}`);

    try {
      const res = await fetcher();

      if (!res.success) {
        useShowToast(StatusType.ERROR, res.message || "Failed to fetch following");
        throw new Error(res.message || "Failed to fetch following");
      }
      console.log({ res });
      set({ following: res.data?.data });
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  },
}));
