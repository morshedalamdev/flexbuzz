import { create } from 'zustand';
import type { Post, Comment, User } from '@/types';
import { MOCK_POSTS, MOCK_COMMENTS } from '@/lib/mock-data';
import { useAuthStore } from '@/store/auth-store';

interface PostState {
  posts: Post[];
  comments: Comment[];

  // Post actions
  createPost: (content: string) => void;
  deletePost: (id: string) => void;
  updatePost: (id: string, content: string) => void;
  likePost: (id: string) => void;

  // Comment actions
  fetchComments: (postId: string) => Comment[];
  createComment: (postId: string, content: string) => void;
  updateComment: (id: string, content: string) => void;
  deleteComment: (id: string) => void;

  // Query helpers
  searchPosts: (query: string) => Post[];
  getPostsByHashtag: (tag: string) => Post[];
  getPostsByUser: (userId: string) => Post[];

  // Cross-store sync: called when current user updates their profile
  syncUserInPosts: (
    userId: string,
    updates: Partial<User['profile']> & { username?: string; email?: string },
  ) => void;

  // Cross-store sync: called when a user's follow state changes
  toggleFollowUserInPosts: (userId: string) => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: MOCK_POSTS,
  comments: MOCK_COMMENTS,

  createPost: (content: string) => {
    const currentUser = useAuthStore.getState().currentUser;
    const newPost: Post = {
      id: `p${Date.now()}`,
      userId: currentUser.id,
      content,
      likeCount: 0,
      commentCount: 0,
      isLikedByCurrentUser: false,
      user: currentUser,
      hashtags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ posts: [newPost, ...state.posts] }));
  },

  deletePost: (id: string) => {
    set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));
  },

  updatePost: (id: string, content: string) => {
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, content, updatedAt: new Date().toISOString() } : p,
      ),
    }));
  },

  likePost: (id: string) => {
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.id !== id) return p;
        const liked = !p.isLikedByCurrentUser;
        return {
          ...p,
          isLikedByCurrentUser: liked,
          likeCount: liked ? p.likeCount + 1 : p.likeCount - 1,
        };
      }),
    }));
  },

  fetchComments: (postId: string) => {
    return get().comments.filter((c) => c.postId === postId);
  },

  createComment: (postId: string, content: string) => {
    const currentUser = useAuthStore.getState().currentUser;
    const newComment: Comment = {
      id: `c${Date.now()}`,
      content,
      userId: currentUser.id,
      postId,
      createdAt: new Date().toISOString(),
      user: currentUser,
    };
    set((state) => ({
      comments: [...state.comments, newComment],
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p,
      ),
    }));
  },

  deleteComment: (id: string) => {
    const comment = get().comments.find((c) => c.id === id);
    set((state) => ({
      comments: state.comments.filter((c) => c.id !== id),
      posts: comment
        ? state.posts.map((p) =>
            p.id === comment.postId ? { ...p, commentCount: p.commentCount - 1 } : p,
          )
        : state.posts,
    }));
  },

  updateComment: (id: string, content: string) => {
    set((state) => ({
      comments: state.comments.map((c) => (c.id === id ? { ...c, content } : c)),
    }));
  },

  searchPosts: (query: string) => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return get().posts.filter(
      (p) =>
        p.content.toLowerCase().includes(q) ||
        p.user.username.toLowerCase().includes(q) ||
        p.hashtags.some((h) => h.tag.toLowerCase().includes(q)),
    );
  },

  getPostsByHashtag: (tag: string) => {
    return get().posts.filter((p) => p.hashtags.some((h) => h.tag === tag));
  },

  getPostsByUser: (userId: string) => {
    return get().posts.filter((p) => p.userId === userId);
  },

  syncUserInPosts: (
    userId: string,
    updates: Partial<User['profile']> & { username?: string; email?: string },
  ) => {
    set((state) => ({
      posts: state.posts.map((p) =>
        p.userId === userId
          ? {
              ...p,
              user: {
                ...p.user,
                username: updates.username ?? p.user.username,
                profile: { ...p.user.profile, ...updates },
              },
            }
          : p,
      ),
    }));
  },

  toggleFollowUserInPosts: (userId: string) => {
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.userId !== userId) return p;
        const wasFollowed = p.user.isFollowed;
        return {
          ...p,
          user: {
            ...p.user,
            isFollowed: !wasFollowed,
            followerCount: wasFollowed ? p.user.followerCount - 1 : p.user.followerCount + 1,
          },
        };
      }),
    }));
  },
}));
