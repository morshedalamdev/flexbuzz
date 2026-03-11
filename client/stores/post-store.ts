import { useFetcher } from "@/hooks/use-fetcher";
import { useShowToast } from "@/hooks/use-show-toast";
import { PaginationInterface, PostType, StatusType } from "@/lib/types";
import { create } from "zustand";

interface PostStoreType {
  posts: PostType[];
  isLoading: boolean;
  fetchPosts: () => Promise<void>;
  createPost: (content: string) => Promise<void>;
  updatePost: (id: string, content: string) => Promise<void>;
}

export const usePostStore = create<PostStoreType>((set, get) => ({
  posts: [],
  isLoading: true,

  setLoading: (isLoading: boolean) => set({ isLoading }),

  fetchPosts: async () => {
    const { fetcher } = useFetcher<PaginationInterface<PostType>>(`/note`);
    set({ isLoading: true });
    try {
      const res = await fetcher();

      if (!res.success) {
        set({ isLoading: false });
        useShowToast(StatusType.ERROR, res.message || "Failed to fetch posts");
        throw new Error(res.message || "Failed to fetch posts");
      }

      set({ posts: res.data?.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  },

  createPost: async (content: string) => {
    const { fetcher } = useFetcher<PostType>(`/note`);
    set({ isLoading: true });

    try {
      const res = await fetcher({
        method: "POST",
        payload: {
          content,
        },
      });

      if (!res.success || !res.data) {
        useShowToast(StatusType.ERROR, res.message || "Failed to create post");
        throw new Error(res.message || "Failed to create post");
      }

      useShowToast(StatusType.SUCCESS, "Post created successfully");
      set((state) => ({
        posts: [res.data as PostType, ...state.posts],
        isLoading: false,
      }));
    } catch (error) {
      useShowToast(
        StatusType.ERROR,
        "An error occurred while creating the post",
      );
    }
  },

  updatePost: async (id: string, content: string) => {
    const { fetcher } = useFetcher<PostType>(`/note`);
    set({ isLoading: true });

    try {
      const res = await fetcher({
        method: "PATCH",
        payload: {
          id,
          content,
        },
      });

      if (!res.success || !res.data) {
        useShowToast(StatusType.ERROR, res.message || "Failed to update post");
        throw new Error(res.message || "Failed to update post");
      }

      useShowToast(StatusType.SUCCESS, "Post updated successfully");
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, content } : post,
        ),
        isLoading: false,
      }));
    } catch (error) {
      useShowToast(
        StatusType.ERROR,
        "An error occurred while updating the post",
      );
    }
  },
}));
