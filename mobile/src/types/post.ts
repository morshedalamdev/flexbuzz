import type { UserType } from "./user";

export interface HashtagType {
  id: string;
  tag: string;
  count: number;
  createAt: string;
}

export interface PostType {
  id: string;
  userId: string;
  content: string;
  likeCount: number;
  commentCount: number;
  isLikedByCurrentUser: boolean;
  user: UserType;
  hashtags: HashtagType[];
  createdAt: string;
  updatedAt: string;
}

export interface CommentType {
  id: string;
  content: string;
  userId: string;
  noteId: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
}