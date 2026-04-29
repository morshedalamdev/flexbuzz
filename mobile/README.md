# Flex Buzz — Mobile UI

A modern, mobile-only web UI for the Flex Buzz social platform, built with:

- **React 19** + **Vite** — fast, lightweight bundler
- **React Router v7** — client-side routing
- **Tailwind CSS v4** — utility-first styling
- **Radix UI** primitives — accessible components (Avatar, Dialog, DropdownMenu, etc.)

## Screens

| Route | Screen |
|-------|--------|
| `/login` | Login |
| `/signup` | Sign Up |
| `/` | Home Feed |
| `/create` | Create Post |
| `/post/:id` | Post Detail + Comments |
| `/user/:id` | User Profile |
| `/user/:id/followers` | Followers list |
| `/user/:id/following` | Following list |
| `/profile` | My Profile |
| `/search` | Search + Trending Hashtags |
| `/hashtag/:tag` | Hashtag Posts |
| `/activity` | Notifications |

## Development

```bash
cd mobile
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
```

## Notes

- This is a **UI-only** app — no backend calls are made. All data is driven by in-memory mock state.
- Designed strictly for **mobile viewports** (≤ 430px).
- Bottom navigation bar for primary routes; top bar with back button for nested routes.
