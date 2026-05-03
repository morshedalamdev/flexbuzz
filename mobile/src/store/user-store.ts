import { create } from 'zustand';
import type { Hashtag, User } from '@/types';
import { MOCK_HASHTAGS, MOCK_USERS } from '@/lib/mock-data';
import { useAuthStore } from '@/store/auth-store';
import { usePostStore } from '@/store/post-store';

interface UserStoreState {
  trendingHashtags: Hashtag[];
  getUserById: (id: string) => User | undefined;
  followUser: (userId: string) => void;
}

export const useUserStore = create<UserStoreState>()(() => ({
  trendingHashtags: MOCK_HASHTAGS,

  getUserById: (id: string) => {
    const currentUser = useAuthStore.getState().currentUser;
    if (currentUser && (id === currentUser.id || id === 'me')) return currentUser;
    return MOCK_USERS.find((u) => u.id === id);
  },

  followUser: (userId: string) => {
    usePostStore.getState().toggleFollowUserInPosts(userId);
  },
}));
