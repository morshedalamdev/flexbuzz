import type { User } from "./user";

export interface Hashtag {
  id: string;
  tag: string;
  count: number;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  likeCount: number;
  commentCount: number;
  isLikedByCurrentUser: boolean;
  user: User;
  hashtags: Hashtag[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  createdAt: string;
  user: User;
}
