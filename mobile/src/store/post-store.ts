import { api } from "@/lib/api";
import { showToast } from "@/lib/show-toast";
import { StatusType, type PaginationInterface } from "@/types";
import type { PostType } from "@/types/post";
import { create } from "zustand";

interface PostStateType {
  posts: PostType[];
  postsByUser: Record<string, PostType[]>;
  isLoading: boolean;
  getPostsInRoot: () => Promise<PostType[]>;
  getPostsByUser: (userId: string) => Promise<PostType[]>;
  deletePost: (postId: string) => Promise<void>;
  clearCache: () => void;
}

export const usePostStore = create<PostStateType>((set, get) => ({
  posts: [],
  postsByUser: {},
  isLoading: false,

  getPostsInRoot: async (): Promise<PostType[]> => {
    const { fetcher } = api<PaginationInterface<PostType>>(`/note`);
    set({ isLoading: true });

    try {
      const res = await fetcher();
      if (!res.success) {
        showToast(StatusType.ERROR, res.message || "Failed to fetch posts");
        throw new Error(res.message || "Failed to fetch posts");
      }

      set({ posts: res.data?.data ?? [] });
      return res.data?.data ?? [];
    } catch (error) {
      showToast(StatusType.ERROR, "An error occurred while fetching posts");
      console.error("Error fetching posts:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getPostsByUser: async (userId: string): Promise<PostType[]> => {
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

  deletePost: async (postId: string) => {
    const { fetcher } = api(`/note/${postId}`);
    set({ isLoading: true });

    try {
      const res = await fetcher({ method: "DELETE" });
      if (!res.success) {
        showToast(StatusType.ERROR, res.message || "Failed to delete post");
        throw new Error(res.message || "Failed to delete post");
      }

      // Remove the deleted post from state
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId),
        postsByUser: Object.fromEntries(
          Object.entries(state.postsByUser).map(([userId, posts]) => [
            userId,
            posts.filter((post) => post.id !== postId),
          ])
        ),
      }));

      showToast(StatusType.SUCCESS, "Post deleted successfully");
    } catch (error) {
      showToast(StatusType.ERROR, "An error occurred while deleting the post");
      console.error("Error deleting post:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  clearCache: () => set({ posts: [], postsByUser: {} }),
}));