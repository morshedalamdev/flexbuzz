export interface User {
  id: string;
  username: string;
  email: string;
  followerCount: number;
  followingCount: number;
  isFollowed: boolean;
  profile: {
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    bio: string;
  };
  createdAt: string;
}

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
