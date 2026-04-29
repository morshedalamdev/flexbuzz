import type { Post, User, Comment, Hashtag } from '@/types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'alexcode',
    email: 'alex@example.com',
    followerCount: 142,
    followingCount: 89,
    isFollowed: false,
    profile: {
      firstName: 'Alex',
      lastName: 'Johnson',
      gender: 'male',
      dob: '1995-04-12',
      bio: 'Full-stack dev 🚀 | Open source contributor | #nodejs #react',
    },
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    username: 'saradev',
    email: 'sara@example.com',
    followerCount: 307,
    followingCount: 120,
    isFollowed: true,
    profile: {
      firstName: 'Sara',
      lastName: 'Williams',
      gender: 'female',
      dob: '1998-08-22',
      bio: 'UX/UI designer turned dev 🎨 | Coffee lover ☕',
    },
    createdAt: '2024-02-15T08:00:00Z',
  },
  {
    id: '3',
    username: 'techbro99',
    email: 'tech@example.com',
    followerCount: 55,
    followingCount: 230,
    isFollowed: false,
    profile: {
      firstName: 'Mike',
      lastName: 'Chen',
      gender: 'male',
      dob: '2000-01-01',
      bio: 'Learning every day 📚 | #webdev #typescript',
    },
    createdAt: '2024-03-01T12:00:00Z',
  },
];

export const CURRENT_USER: User = {
  id: 'me',
  username: 'johndoe',
  email: 'john@example.com',
  followerCount: 78,
  followingCount: 55,
  isFollowed: false,
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    dob: '1993-07-15',
    bio: 'Building cool stuff on the web 🛠️ | #nestjs #react',
  },
  createdAt: '2023-11-20T09:00:00Z',
};

export const MOCK_HASHTAGS: Hashtag[] = [
  { id: 'h1', tag: 'nestjs', count: 42 },
  { id: 'h2', tag: 'react', count: 95 },
  { id: 'h3', tag: 'typescript', count: 87 },
  { id: 'h4', tag: 'webdev', count: 210 },
  { id: 'h5', tag: 'nodejs', count: 63 },
  { id: 'h6', tag: 'programming', count: 150 },
  { id: 'h7', tag: 'coding', count: 120 },
  { id: 'h8', tag: 'tailwindcss', count: 55 },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: '2',
    content:
      'Just shipped a new feature using #react and #typescript! The DX is incredible 🚀 So glad I made the switch from vanilla JS.',
    likeCount: 24,
    commentCount: 5,
    isLikedByCurrentUser: true,
    user: MOCK_USERS[1],
    hashtags: [MOCK_HASHTAGS[1], MOCK_HASHTAGS[2]],
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'p2',
    userId: '1',
    content:
      "Hot take: #nestjs is the best #nodejs framework out there. The module system + dependency injection makes large apps so much easier to maintain. Change my mind 😤",
    likeCount: 61,
    commentCount: 18,
    isLikedByCurrentUser: false,
    user: MOCK_USERS[0],
    hashtags: [MOCK_HASHTAGS[4], MOCK_HASHTAGS[0]],
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'p3',
    userId: '3',
    content:
      'Day 30 of #coding challenge complete! Built a REST API, a mobile UI, and deployed to the cloud all in one month. #webdev never stops teaching you.',
    likeCount: 38,
    commentCount: 9,
    isLikedByCurrentUser: false,
    user: MOCK_USERS[2],
    hashtags: [MOCK_HASHTAGS[6], MOCK_HASHTAGS[3]],
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: 'p4',
    userId: 'me',
    content:
      'Just discovered #tailwindcss utility-first approach after years of BEM. My productivity has gone through the roof. Anyone else made the switch recently?',
    likeCount: 15,
    commentCount: 3,
    isLikedByCurrentUser: false,
    user: CURRENT_USER,
    hashtags: [MOCK_HASHTAGS[7]],
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: 'p5',
    userId: '2',
    content:
      'Reminder: Clean code is not about writing fewer lines — it\'s about writing code that tells a story. Your future self will thank you 🙏 #programming',
    likeCount: 102,
    commentCount: 21,
    isLikedByCurrentUser: true,
    user: MOCK_USERS[1],
    hashtags: [MOCK_HASHTAGS[5]],
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'p6',
    userId: '1',
    content:
      'Working on an open-source #typescript utility library. PRs welcome! Follow for updates. #webdev #programming',
    likeCount: 29,
    commentCount: 7,
    isLikedByCurrentUser: false,
    user: MOCK_USERS[0],
    hashtags: [MOCK_HASHTAGS[2], MOCK_HASHTAGS[3], MOCK_HASHTAGS[5]],
    createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    content: 'Totally agree! TypeScript changed my life.',
    userId: '1',
    postId: 'p1',
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    user: MOCK_USERS[0],
  },
  {
    id: 'c2',
    content: 'Same! The autocomplete alone is worth it 😄',
    userId: 'me',
    postId: 'p1',
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    user: CURRENT_USER,
  },
  {
    id: 'c3',
    content: 'Have you tried Bun with NestJS? Even faster!',
    userId: '3',
    postId: 'p2',
    createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    user: MOCK_USERS[2],
  },
  {
    id: 'c4',
    content: 'NestJS for the win! 🏆',
    userId: '2',
    postId: 'p2',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    user: MOCK_USERS[1],
  },
];
