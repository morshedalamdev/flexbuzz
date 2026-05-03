import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from '@/store/AppContext';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import HomePage from '@/pages/HomePage';
import CreatePage from '@/pages/CreatePage';
import PostDetailPage from '@/pages/PostDetailPage';
import UserPage from '@/pages/UserPage';
import ProfilePage from '@/pages/ProfilePage';
import SearchPage from '@/pages/SearchPage';
import HashtagPage from '@/pages/HashtagPage';
import ActivityPage from '@/pages/ActivityPage';
import FollowListPage from '@/pages/FollowListPage';


function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useApp();
    return isAuthenticated ? <>{ children } < /> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useApp();
    return isAuthenticated ? <Navigate to="/" replace /> : <>{ children } </>;
}

export default function AppRoutes() {
    return (
        <Routes>
        {/* Public routes */ }
        < Route path = "/login" element = {< PublicRoute > <LoginPage /></ >} />
            < Route path = "/signup" element = {< PublicRoute > <SignupPage /></ >} />

{/* Protected routes */ }
<Route path="/" element = {< ProtectedRoute > <HomePage /></ >} />
    < Route path = "/create" element = {< ProtectedRoute > <CreatePage /></ >} />
        < Route path = "/post/:id" element = {< ProtectedRoute > <PostDetailPage /></ >} />
            < Route path = "/user/:id" element = {< ProtectedRoute > <UserPage /></ >} />
                < Route path = "/user/:id/followers" element = {< ProtectedRoute > <FollowListPage /></ >} />
                    < Route path = "/user/:id/following" element = {< ProtectedRoute > <FollowListPage /></ >} />
                        < Route path = "/profile" element = {< ProtectedRoute > <ProfilePage /></ >} />
                            < Route path = "/search" element = {< ProtectedRoute > <SearchPage /></ >} />
                                < Route path = "/hashtag/:tag" element = {< ProtectedRoute > <HashtagPage /></ >} />
                                    < Route path = "/activity" element = {< ProtectedRoute > <ActivityPage /></ >} />

{/* Fallback */ }
<Route path="*" element = {< Navigate to = "/" replace />} />
    </Routes>
  );
}