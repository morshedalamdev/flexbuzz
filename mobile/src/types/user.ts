export interface UserType {
  id: string;
  username: string;
  email: string;
  followerCount: number;
  followingCount: number;
  isFollowed?: boolean;
  profile: {
    firstName?: string;
    lastName?: string;
    gender?: string;
    dob?: string;
    bio?: string;
  };
  createdAt: string;
}