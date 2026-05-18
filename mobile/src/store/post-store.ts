import { api } from "@/lib/api";
import { showToast } from "@/lib/show-toast";
import { StatusType, type PaginationInterface } from "@/types";
import type { CommentType, PostType } from "@/types/post";
import { create } from "zustand";

interface PostStateType {
  posts: PostType[];
  comments: CommentType[];
  postsByUser: Record<string, PostType[]>;
  isLoading: boolean;
  // -- POST OPERATIONS
  getPostsInRoot: () => Promise<PostType[]>;
  getPostsByUser: (userId: string) => Promise<PostType[]>;
  getPostById: (postId: string) => Promise<PostType>;
  createPost: (content: string) => Promise<void>;
  updatePost: (id: string, content: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  // --- LIKE OPERATIONS
  likePost: (postId: string, isLiked: boolean) => Promise<void>;
  // --- COMMENT OPERATIONS
  commentsByPostId: (postId: string) => Promise<CommentType[]>;
  createComment: (postId: string, content: string) => Promise<CommentType>;
  updateComment: (commentId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  // --- CACHE OPERATIONS
  clearCache: () => void;
}

export const usePostStore = create<PostStateType>((set, get) => ({
  posts: [],
  comments: [],
  postsByUser: {},
  isLoading: false,

  // --- LIKE, COMMENT OPERATIONS
  likePost: async (postId: string, isLiked: boolean) => {
    const { fetcher } = api(`/note/${postId}/like`);

    try {
      const res = await fetcher({
        method: isLiked ? "DELETE" : "POST",
      });
      if (!res.success) {
        showToast(StatusType.ERROR, res.message || "Failed to update like");
        throw new Error(res.message || "Failed to update like");
      }

      // Update only the specific post in both caches with minimal mutations
      set((state) => {
        const updatePost = (post: PostType) =>
          post.id === postId
            ? {
              ...post,
              isLikedByCurrentUser: !isLiked,
              likeCount: post.likeCount + (isLiked ? -1 : 1),
            }
            : post;

        // Update posts array only if post exists there
        const updatedPosts = state.posts.some((p) => p.id === postId)
          ? state.posts.map(updatePost)
          : state.posts;

        // Update postsByUser only for caches containing this post
        let updatedPostsByUser = state.postsByUser;
        for (const [userId, posts] of Object.entries(state.postsByUser)) {
          if (posts.some((p) => p.id === postId)) {
            updatedPostsByUser = {
              ...updatedPostsByUser,
              [userId]: posts.map(updatePost),
            };
          }
        }

        return {
          posts: updatedPosts,
          postsByUser: updatedPostsByUser,
        };
      });
    } catch (error) {
      showToast(StatusType.ERROR, "An error occurred while updating the like");
      console.error("Error updating like:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  // --- COMMENT OPERATIONS
  commentsByPostId: async (postId: string) => {
    const { fetcher } = api<PaginationInterface<CommentType>>(`/note/${postId}/comments`);
    set({ isLoading: true });

    try {
      const res = await fetcher();
      if (!res.success) {
        showToast(StatusType.ERROR, res.message || "Failed to fetch comments");
        throw new Error(res.message || "Failed to fetch comments");
      }

      set({ comments: res.data?.data ?? [] });
      return res.data?.data ?? [];
    } catch (error) {
      showToast(StatusType.ERROR, "An error occurred while fetching comments");
      console.error("Error fetching comments:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createComment: async (postId: string, content: string) => {
    const { fetcher } = api<CommentType>(`/note/comment`);
    set({ isLoading: true });

    try {
      const res = await fetcher({
        method: "POST",
        payload: { id: postId, content },
      });
      if (!res.success || !res.data) {
        showToast(StatusType.ERROR, res.message || "Failed to create comment");
        throw new Error(res.message || "Failed to create comment");
      }

      set((state) => ({
        comments: [res.data!, ...state.comments],
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, commentCount: post.commentCount + 1 }
            : post
        ),
        postsByUser: Object.fromEntries(
          Object.entries(state.postsByUser).map(([userId, posts]) => [
            userId,
            posts.map((post) =>
              post.id === postId
                ? { ...post, commentCount: post.commentCount + 1 }
                : post
            ),
          ])
        ),
      }));

      return res.data!;
    } catch (error) {
      showToast(StatusType.ERROR, "An error occurred while creating the comment");
      console.error("Error creating comment:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateComment: async (commentId: string, content: string) => {
    const { fetcher } = api<CommentType>(`/note/comment`);
    set({ isLoading: true });

    try {
      const res = await fetcher({
        method: "PATCH",
        payload: { id: commentId, content },
      });
      if (!res.success || !res.data) {
        showToast(StatusType.ERROR, res.message || "Failed to update comment");
        throw new Error(res.message || "Failed to update comment");
      }

      set((state) => ({
        comments: state.comments.map((comment) =>
          comment.id === commentId ? { ...comment, content } : comment
        ),
      }));
    } catch (error) {
      showToast(StatusType.ERROR, "An error occurred while updating the comment");
      console.error("Error updating comment:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteComment: async (commentId: string) => {
    const { fetcher } = api(`/note/comment/${commentId}`);
    set({ isLoading: true });

    try {
      const res = await fetcher({ method: "DELETE" });
      if (!res.success) {
        showToast(StatusType.ERROR, res.message || "Failed to delete comment");
        throw new Error(res.message || "Failed to delete comment");
      }

      set((state) => ({
        comments: state.comments.filter((comment) => comment.id !== commentId),
      }));
    } catch (error) {
      showToast(StatusType.ERROR, "An error occurred while deleting the comment");
      console.error("Error deleting comment:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  // --- POST OPERATIONS
  getPostsInRoot: async () => {
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

  getPostById: async (postId: string) => {
    const { fetcher } = api<PostType>(`/note/${postId}`);
    set({ isLoading: true });

    try {
      const state = get();
      // Search in flat posts array first
      const found = state.posts.find((p) => p.id === postId);
      if (found) {
        state.commentsByPostId(postId); // Preload comments for this post
        return found;
      }
      // Search in all postsByUser caches
      for (const userPosts of Object.values(state.postsByUser)) {
        const post = userPosts.find((p) => p.id === postId);
        if (post) {
          state.commentsByPostId(postId); // Preload comments for this post
          return post;
        }
      }
      // If not found in cache, fetch from API
      const res = await fetcher();
      if (!res.success || !res.data) {
        showToast(StatusType.ERROR, res.message || "Failed to fetch post");
        throw new Error(res.message || "Failed to fetch post");
      }

      state.commentsByPostId(postId); // Preload comments for this post
      return res.data;
    } catch (error) {
      showToast(StatusType.ERROR, "An error occurred while fetching the post");
      console.error("Error fetching post:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createPost: async (content: string) => {
    const { fetcher } = api<PostType>(`/note`);
    set({ isLoading: true });

    try {
      const res = await fetcher({
        method: "POST",
        payload: { content },
      });
      if (!res.success || !res.data) {
        showToast(StatusType.ERROR, res.message || "Failed to create post");
        throw new Error(res.message || "Failed to create post");
      }
    } catch (error) {
      showToast(StatusType.ERROR, "An error occurred while creating the post");
      console.error("Error creating post:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updatePost: async (id: string, content: string) => {
    const { fetcher } = api<PostType>(`/note`);
    set({ isLoading: true });

    try {
      const res = await fetcher({
        method: "PATCH",
        payload: { id, content },
      });
      if (!res.success || !res.data) {
        showToast(StatusType.ERROR, res.message || "Failed to update post");
        throw new Error(res.message || "Failed to update post");
      }

      // Update the post in state
      set((state) => ({
        posts: state.posts.map((post) => (post.id === id ? { ...post, content } : post)),
        postsByUser: Object.fromEntries(
          Object.entries(state.postsByUser).map(([userId, posts]) => [
            userId,
            posts.map((post) => (post.id === id ? { ...post, content } : post)),
          ])
        ),
      }));

      showToast(StatusType.SUCCESS, "Post updated successfully");
    } catch (error) {
      showToast(StatusType.ERROR, "An error occurred while updating the post");
      console.error("Error updating post:", error);
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
  // --- CACHE OPERATIONS
  clearCache: () => set({ posts: [], postsByUser: {} }),
}));
