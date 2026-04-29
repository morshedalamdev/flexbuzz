import React, { createContext, useContext, useState } from 'react';
import type { User, Post, Comment } from '@/types';
import {
  MOCK_POSTS,
  MOCK_COMMENTS,
  CURRENT_USER,
  MOCK_USERS,
  MOCK_HASHTAGS,
} from '@/lib/mock-data';
import type { Hashtag } from '@/types';

interface AppState {
  currentUser: User;
  posts: Post[];
  comments: Comment[];
  trendingHashtags: Hashtag[];

  // Auth
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User['profile']> & { username?: string }) => void;

  // Posts
  createPost: (content: string) => void;
  deletePost: (id: string) => void;
  updatePost: (id: string, content: string) => void;
  likePost: (id: string) => void;

  // Comments
  fetchComments: (postId: string) => Comment[];
  createComment: (postId: string, content: string) => void;
  deleteComment: (id: string) => void;

  // Follow
  followUser: (userId: string) => void;

  // Search
  searchPosts: (query: string) => Post[];
  getPostsByHashtag: (tag: string) => Post[];
  getUserById: (id: string) => User | undefined;
  getPostsByUser: (userId: string) => Post[];
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const trendingHashtags = MOCK_HASHTAGS;

  const login = (_username: string) => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updates: Partial<User['profile']> & { username?: string }) => {
    setCurrentUser((prev) => ({
      ...prev,
      username: updates.username ?? prev.username,
      profile: { ...prev.profile, ...updates },
    }));
    // Also update posts authored by current user
    setPosts((prev) =>
      prev.map((p) =>
        p.userId === currentUser.id
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
    );
  };

  const createPost = (content: string) => {
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
    setPosts((prev) => [newPost, ...prev]);
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePost = (id: string, content: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, content, updatedAt: new Date().toISOString() } : p)),
    );
  };

  const likePost = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const liked = !p.isLikedByCurrentUser;
        return {
          ...p,
          isLikedByCurrentUser: liked,
          likeCount: liked ? p.likeCount + 1 : p.likeCount - 1,
        };
      }),
    );
  };

  const fetchComments = (postId: string) => {
    return comments.filter((c) => c.postId === postId);
  };

  const createComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      content,
      userId: currentUser.id,
      postId,
      createdAt: new Date().toISOString(),
      user: currentUser,
    };
    setComments((prev) => [...prev, newComment]);
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p,
      ),
    );
  };

  const deleteComment = (id: string) => {
    const comment = comments.find((c) => c.id === id);
    setComments((prev) => prev.filter((c) => c.id !== id));
    if (comment) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === comment.postId ? { ...p, commentCount: p.commentCount - 1 } : p,
        ),
      );
    }
  };

  const followUser = (userId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
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
    );
  };

  const searchPosts = (query: string) => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.content.toLowerCase().includes(q) ||
        p.user.username.toLowerCase().includes(q) ||
        p.hashtags.some((h) => h.tag.toLowerCase().includes(q)),
    );
  };

  const getPostsByHashtag = (tag: string) => {
    return posts.filter((p) => p.hashtags.some((h) => h.tag === tag));
  };

  const getUserById = (id: string) => {
    if (id === currentUser.id || id === 'me') return currentUser;
    return MOCK_USERS.find((u) => u.id === id);
  };

  const getPostsByUser = (userId: string) => {
    return posts.filter((p) => p.userId === userId || p.userId === userId);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        posts,
        comments,
        trendingHashtags,
        isAuthenticated,
        login,
        logout,
        updateProfile,
        createPost,
        deletePost,
        updatePost,
        likePost,
        fetchComments,
        createComment,
        deleteComment,
        followUser,
        searchPosts,
        getPostsByHashtag,
        getUserById,
        getPostsByUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
