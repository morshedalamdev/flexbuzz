import { useFetcher } from "@/hooks/use-fetcher";
import { useShowToast } from "@/hooks/use-show-toast";
import {
  CommentType,
  PaginationInterface,
  PostType,
  StatusType,
} from "@/lib/types";
import { create } from "zustand";

interface PostStoreType {
  posts: PostType[];
  comments: CommentType[];
  isLoading: boolean;
  fetchPosts: (userId?: string) => Promise<void>;
  createPost: (content: string) => Promise<void>;
  updatePost: (id: string, content: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  likePost: (id: string, isLiked: boolean) => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
  createComment: (postId: string, content: string) => Promise<void>;
  updateComment: (id: string, content: string) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
}

export const postStore = create<PostStoreType>((set, get) => ({
  posts: [],
  comments: [],
  isLoading: true,

  setLoading: (isLoading: boolean) => set({ isLoading }),
  // POST OPERATIONS
  fetchPosts: async (userId?: string) => {
    const { fetcher } = useFetcher<PaginationInterface<PostType>>(
      `/note${userId ? `?userId=${userId}` : ""}`,
    );
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

  deletePost: async (id: string) => {
    const { fetcher } = useFetcher(`/note/${id}`);
    set({ isLoading: true });

    try {
      const res = await fetcher({
        method: "DELETE",
      });

      if (!res.success) {
        useShowToast(StatusType.ERROR, res.message || "Failed to delete post");
        throw new Error(res.message || "Failed to delete post");
      }

      useShowToast(StatusType.SUCCESS, "Post deleted successfully");
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      useShowToast(
        StatusType.ERROR,
        "An error occurred while deleting the post",
      );
    }
  },
  // LIKE OPERATIONS
  likePost: async (id: string, isLiked: boolean) => {
    const { fetcher } = useFetcher<PostType>(`/note/${id}/like`);
    set({ isLoading: true });

    if (!isLiked) {
      try {
        const res = await fetcher({
          method: "POST",
        });

        if (!res.success || !res.data) {
          useShowToast(StatusType.ERROR, res.message || "Failed to like post");
          throw new Error(res.message || "Failed to like post");
        }

        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === id) {
              return {
                ...post,
                isLikedByCurrentUser: true,
                likeCount: post.likeCount + 1,
              };
            } else {
              return post;
            }
          }),
          isLoading: false,
        }));
      } catch (error) {
        useShowToast(StatusType.ERROR, "An error occurred while like the post");
      }
    } else {
      try {
        const res = await fetcher({
          method: "DELETE",
        });

        if (!res.success) {
          useShowToast(
            StatusType.ERROR,
            res.message || "Failed to dislike post",
          );
          throw new Error(res.message || "Failed to dislike post");
        }

        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === id) {
              return {
                ...post,
                isLikedByCurrentUser: false,
                likeCount: post.likeCount - 1,
              };
            } else {
              return post;
            }
          }),
          isLoading: false,
        }));
      } catch (error) {
        useShowToast(
          StatusType.ERROR,
          "An error occurred while dislike the post",
        );
      }
    }
  },
  // COMMENT OPERATIONS
  fetchComments: async (postId: string) => {
    const { fetcher } = useFetcher<PaginationInterface<CommentType>>(`/note/${postId}/comments`);
    set({ isLoading: true });

    try {
      const res = await fetcher();

      if (!res.success) {
        set({ isLoading: false });
        useShowToast(StatusType.ERROR, res.message || "Failed to fetch comments");
        throw new Error(res.message || "Failed to fetch comments");
      }

      set({ comments: res.data?.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  },

  createComment: async (postId: string, content: string) => {
    const { fetcher } = useFetcher<CommentType>("/note/comment");
    set({ isLoading: true });

    try {
      const res = await fetcher({
        method: "POST",
        payload: {
          id: postId,
          content,
        },
      });

      if (!res.success || !res.data) {
        set({ isLoading: false });
        useShowToast(StatusType.ERROR,res.message || "Failed to create comment");
        throw new Error(res.message || "Failed to create comment");
      }

      set((state) => ({
        comments: [...state.comments, res.data as CommentType],
        isLoading: false,
      }));
    } catch (error) {
      useShowToast(
        StatusType.ERROR,
        "An error occurred while creating the comment",
      );
    }
  },

  updateComment: async (id: string, content: string) => {
    const { fetcher } = useFetcher<CommentType>("/note/comment");
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
        set({ isLoading: false });
        useShowToast(StatusType.ERROR,res.message || "Failed to update comment");
        throw new Error(res.message || "Failed to update comment");
      }
      
      set((state) => ({
        comments: state.comments.map((comment) =>
          comment.id === id
            ? ({ ...comment, ...res.data, content } as CommentType)
            : comment,
        ),
        isLoading: false,
      }));
    } catch (error) {
      useShowToast(
        StatusType.ERROR,
        "An error occurred while updating the comment",
      );
    }
  },

  deleteComment: async (id: string) => {
    const { fetcher } = useFetcher(`/note/comment/${id}`);
    set({ isLoading: true });

    try {
      const res = await fetcher({
        method: "DELETE",
      });

      if (!res.success) {
        useShowToast(StatusType.ERROR, res.message || "Failed to delete comment");
        throw new Error(res.message || "Failed to delete comment");
      }

      set((state) => ({
        comments: state.comments.filter((comment) => comment.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      useShowToast(
        StatusType.ERROR,
        "An error occurred while deleting the comment",
      );
    }
  },
}));
