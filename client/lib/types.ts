export enum StatusType {
  DEFAULT = "default",
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
  WARNING = "warning",
}
export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export interface PaginationInterface<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    firstPage: string;
    prevPage: string;
    nextPage: string;
    lastPage: string;
  };
}

export interface SignupStateType {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
  username?: string;
  email?: string;
}

export interface LoginStateType {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string;
  username?: string;
}

export interface ProfileType {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  bio: string;
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  profile: ProfileType;
  createdAt: string;
  updatedAt: string;
}

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
