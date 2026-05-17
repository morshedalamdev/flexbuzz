import { api } from "@/lib/api";
import { showToast } from "@/lib/show-toast";
import { StatusType, type PaginationInterface } from "@/types";
import type { PostType } from "@/types/post";
import { create } from "zustand";

interface PostStateType {
  posts: PostType[];
  postsByUser: Record<string, PostType[]>;
  isLoading: boolean;
  getPostsByUser: (userId: string) => Promise<PostType[]>;
  clearCache: () => void;
}

export const usePostStore = create<PostStateType>((set, get) => ({
  posts: [],
  postsByUser: {},
  isLoading: false,
  getPostsByUser: async (userId: string) => {
    const cachedPosts = get().postsByUser[userId];
    if (cachedPosts) {
      set({ posts: cachedPosts });
      return cachedPosts;
    }

    const { fetcher } = api<PaginationInterface<PostType>>(`/note?userId=${userId}`);
    set({ isLoading: true });

    try {
      const res = await fetcher();
      if (!res.success) {
        showToast(StatusType.ERROR, res.message || "Failed to fetch posts");
        throw new Error(res.message || "Failed to fetch posts");
      }

      const userPosts = res.data?.data ?? [];

      set((state) => ({
        posts: userPosts,
        postsByUser: {
          ...state.postsByUser,
          [userId]: userPosts,
        },
      }));

      return userPosts;
    } catch (error) {
      showToast(StatusType.ERROR, "An error occurred while fetching posts");
      console.error("Error fetching posts:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  clearCache: () => set({ posts: [], postsByUser: {} }),
}));