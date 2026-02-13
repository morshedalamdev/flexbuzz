# Flex Buzz - A Text-Based Social Media Platform
A **Twitter-like** social media platform where users can post short text updates with **hashtag** support. Built with a modern full-stack architecture **(PERN)**.


## Project Overview
Flex Buzz is a minimal, text-only social media platform inspired by X.com. Users can:
- Sign up and log in securely
- Create text posts with hashtag support (e.g., `#nestjs #coding`)
- Like and comment on posts
- View a personalized feed and trending hashtags
- Search posts by hashtags or content

**No image/video uploads** — purely text and hashtags to keep things simple and fast.


## Architecture

```
┌─────────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐
│                     │         │                     │         │                     │
│       Frontend      │  REST   │       Backend       │ TypeORM │    PostgreSQL DB    │
│      Port: 3000     │◄───────►│      Port: 4000     │◄───────►│      Port: 5432     │
│                     │   API   │                     │         │                     │
└─────────────────────┘         └─────────────────────┘         └─────────────────────┘
                           
```


## Tech Stack Details

| Layer            | Technology                              | Purpose                               |
|------------------|-----------------------------------------|---------------------------------------|
| Frontend         | Next.js (App Router)               | React framework with SSR/SSG          |
| UI Library       | Shadcn/UI + Tailwind CSS               | Beautiful, accessible components      |
| State Management | Zustand                                 | Lightweight client state management   |
| Backend          | Nest.js                                 | Scalable Node.js framework            |
| Database         | PostgreSQL                              | Relational database                   |
| ORM              | TypeORM                                 | Database abstraction layer            |
| Auth             | bcrypt + JWT                       | Authentication & authorization        |
| Validation       | class-validator, class-transformer      | DTO validation                        |
| Testing          | Jest                                    | Unit and E2E testing                  |


## Project Structure
```
flexbuzz/
├── client/                  # Next.js application
│   ├── app/                 # App router pages
│   ├── components/          # Shadcn/UI + custom components
│   ├── lib/                 # Utilities, API client, hooks
│   ├── stores/              # Zustand state management stores
│   ├── public/              # Static assets
│   └── .env.development
│
├── server/                  # Nest.js application
│   ├── src/
│   │   ├── auth/            # Authentication module (JWT)
│   │   ├── users/           # User module (CRUD, profile)
│   │   ├── posts/           # Posts module (CRUD, feed)
│   │   ├── hashtags/        # Hashtag module (trending, search)
│   │   ├── comments/        # Comments module
│   │   ├── likes/           # Likes module
│   │   ├── common/          # Guards, interceptors, pipes
│   │   └── config/          # config
│   ├── test/                # E2E tests
│   └── .env.development
│
└── README.md
```


## Database Schema

### Core Tables

| Table          | Description                          |
|----------------|--------------------------------------|
| `users`        | User accounts and profiles           |
| `posts`        | Text posts created by users          |
| `hashtags`     | Unique hashtags extracted from posts |
| `post_hashtags`| Many-to-many: posts ↔ hashtags       |
| `likes`        | Tracks which users liked which posts |
| `comments`     | Comments on posts                    |

### Entity Relationships

```
users ────────── posts ─────── post_hashtags ─────── hashtags
  │                │
  ├──── likes ─────│
  │                │
  └──── comments ──└
```


## Milestones
### **Phase 1: Backend Development**

### Milestone 1: Backend Setup & Configuration
- [x] Initialize Nest.js backend project with TypeScript
- [x] Set up PostgreSQL database and TypeORM configuration
- [x] Set up environment variables (`.env`) for backend
- [x] Create initial backend folder structure
- [x] Set up logging and error handling middleware
- [ ] Configure CORS for frontend integration

### Milestone 2: Authentication API
- [x] Create `users` table/entity with TypeORM
- [ ] Implement user registration endpoint (`POST /auth/register`)
- [ ] Implement user login endpoint (`POST /auth/login`)
- [x] Set up JWT-based authentication with Bcrypt
- [ ] Implement auth guards for protected routes
- [ ] Implement refresh token mechanism
- [x] Add password hashing with bcrypt
- [x] Add email validation
- [ ] Test authentication endpoints with Postman/Insomnia

### Milestone 3: User Profile API
- [x] Implement `GET /users/:username` — view user profile
- [x] Implement `GET /users/me` — get current user
- [x] Implement `PATCH /users/me` — update own profile (bio, display name)
- [x] Add validation for profile fields
- [ ] Implement user search endpoint (`GET /users/search?q=`)
- [ ] Test user endpoints

### Milestone 4: Posts & Hashtags API
- [x] Create `posts`, `hashtags`, and `post_hashtags` tables/entities
- [x] Implement `POST /posts` — create a new post (extract hashtags automatically)
- [ ] Implement hashtag extraction logic (parse `#word` patterns from post text)
- [ ] Implement `GET /posts` — fetch posts feed (paginated)
- [x] Implement `GET /posts/:id` — fetch single post
- [ ] Implement `GET /posts/user/:username` — fetch user's posts
- [x] Implement `DELETE /posts/:id` — delete own post
- [x] Implement `PATCH /posts/:id` — edit own post (optional)
- [x] Add post character limit validation
- [ ] Test post endpoints

### Milestone 5: Likes & Comments API
- [x] Create `likes` and `comments` tables/entities
- [x] Implement `POST /posts/:id/like` — like a post
- [x] Implement `DELETE /posts/:id/like` — unlike a post
- [ ] Implement `GET /posts/:id/likes` — get users who liked a post
- [ ] Implement `POST /posts/:id/comments` — add comment
- [ ] Implement `GET /posts/:id/comments` — list comments on a post (paginated)
- [ ] Implement `DELETE /comments/:id` — delete own comment
- [ ] Add like count to post response
- [ ] Add comment count to post response
- [ ] Test like and comment endpoints

### Milestone 6: Follow System & Advanced Feed API
- [ ] Create `follows` table/entity (follower_id, following_id)
- [ ] Implement `POST /users/:id/follow` — follow a user
- [ ] Implement `DELETE /users/:id/follow` — unfollow a user
- [ ] Implement `GET /users/:id/followers` — list followers (paginated)
- [ ] Implement `GET /users/:id/following` — list following (paginated)
- [ ] Implement `GET /posts/feed` — personalized feed (posts from followed users)
- [ ] Implement `GET /posts/timeline` — global timeline (all posts)
- [ ] Add follower/following counts to user profile
- [ ] Test follow system endpoints

### Milestone 7: Search & Trending API
- [ ] Implement `GET /hashtags/trending` — get top trending hashtags
- [ ] Implement `GET /search/posts?q=` — search posts by text content
- [ ] Implement `GET /hashtags/:name/posts` — get all posts with a specific hashtag
- [ ] Implement `GET /hashtags/:name` — get hashtag details with post count
- [ ] Add search filtering and sorting options
- [ ] Optimize queries for performance
- [ ] Test search and trending endpoints
- [ ] **Backend Complete!**

---

### **Phase 2: Frontend Development**

### Milestone 8: Frontend Setup & Configuration
- [ ] Initialize Next.js frontend project with TypeScript
- [ ] Install and configure Shadcn/UI components
- [ ] Install and configure Zustand for state management
- [ ] Install Tailwind CSS
- [ ] Set up Axios or Fetch API client for backend communication
- [ ] Create base Zustand stores (auth, UI, posts, user, search)
- [ ] Set up environment variables (`.env`) for frontend
- [ ] Create initial frontend folder structure
- [ ] Set up API base URL and interceptors
- [ ] Create reusable layout components (Navbar, Sidebar, Container)

### Milestone 9: Authentication UI & User Profiles
- [ ] Create `useAuthStore` to manage authentication state
- [ ] Persist auth state to localStorage with Zustand middleware
- [ ] Build Sign Up page with form validation
- [ ] Build Log In page with form validation
- [ ] Implement logout functionality
- [ ] Add protected route middleware
- [ ] Create `useUserStore` for profile data and follow state
- [ ] Build user profile page (shows user info + their posts)
- [ ] Build edit profile modal/page
- [ ] Add avatar support using initials/placeholder
- [ ] Build followers/following list pages
- [ ] Build follow/unfollow button component

### Milestone 10: Posts Feed & Hashtags UI
- [ ] Create `usePostStore` for feed management and caching
- [ ] Implement optimistic UI updates in Zustand for post creation
- [ ] Build post composer component
- [ ] Build post card component (display post, author, hashtags, timestamps)
- [ ] Build home feed page with infinite scroll or pagination
- [ ] Build user timeline page (single user's posts)
- [ ] Make hashtags clickable (link to hashtag search results)
- [ ] Build hashtag page (shows all posts with that hashtag)
- [ ] Add post delete functionality
- [ ] Add loading states and skeletons

### Milestone 11: Likes, Comments & Interactions
- [ ] Update `usePostStore` to handle like/unlike with optimistic updates
- [ ] Build like button component with count
- [ ] Build comments section component
- [ ] Build comment input component
- [ ] Add comment delete button
- [ ] Add real-time like count updates
- [ ] Add comment pagination
- [ ] Build empty states for no comments

### Milestone 12: Search, Trending & UI Polish
- [ ] Create `useSearchStore` to manage search state and results
- [ ] Build search bar component (in navbar)
- [ ] Build search results page
- [ ] Build trending hashtags sidebar/section
- [ ] Implement theme management with `useUIStore` (dark/light mode)
- [ ] Persist theme preference with Zustand middleware
- [ ] Add dark mode / light mode toggle
- [ ] Add toast notifications for actions (post created, liked, followed, etc.)
- [ ] Manage modal state globally with `useUIStore`
- [ ] Add empty states (no posts yet, no followers, etc.)
- [ ] Optimize for mobile, tablet, and desktop viewports
- [ ] Add loading spinners and error messages
- [ ] Polish animations and transitions

### Milestone 13: Testing & Deployment
- [ ] Write unit tests for backend services (Jest)
- [ ] Write E2E tests for critical API endpoints
- [ ] Write unit tests for Zustand stores
- [ ] Add global error handling (Nest.js exception filters)
- [ ] Add frontend error boundaries
- [ ] Add input validation and sanitization (class-validator)
- [ ] Test edge cases (empty posts, duplicate hashtags, self-follow, etc.)
- [ ] Set up PostgreSQL on a cloud provider (e.g., Supabase, Neon, or Railway)
- [ ] Deploy Nest.js backend (e.g., Railway, Render, or VPS)
- [ ] Deploy Next.js frontend (e.g., Vercel)
- [ ] Set up environment variables for production
- [ ] Configure CORS and security headers
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Final QA testing on production
- [ ] **Launch!**


## Getting Started

### Prerequisites
- Node.js >= 25.x
- PostgreSQL >= 18.x
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env    # Configure your DB credentials
npm run migration:run   # Run database migrations
npm run start:dev       # Start on http://localhost:4000
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env    # Configure API URL
npm run dev             # Start on http://localhost:3000
```


## License

This project is open-source and available under the [MIT License](LICENSE).


## Author
**Morshed Alam**
- GitHub: [@morshedalamdev](https://github.com/morshedalamdev)
- LinkedIn: [@morshedalamdev](https://linkedin.com/in/morshedalamdev)
- Portfolio: [morshedalamdev.dev](https://morshedalam.dev/)






