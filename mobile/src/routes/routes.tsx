import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import HomePage from '@/pages/HomePage';
import CreatePage from '@/pages/CreatePage';
import PostDetailPage from '@/pages/PostDetailPage';
import ProfilePage from '@/pages/ProfilePage';
import SearchPage from '@/pages/SearchPage';
import HashtagPage from '@/pages/HashtagPage';
import ActivityPage from '@/pages/ActivityPage';
import FollowListPage from '@/pages/FollowListPage';
import { getRefreshToken } from '@/lib/token/token';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isTokenExist = getRefreshToken();
  return isTokenExist ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const isTokenExist = getRefreshToken();
  return isTokenExist ? <Navigate to="/" replace /> : <>{children}</>;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
      <Route path="/post/:id" element={<ProtectedRoute><PostDetailPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/profile/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/user/:id/followers" element={<ProtectedRoute><FollowListPage /></ProtectedRoute>} />
      <Route path="/user/:id/following" element={<ProtectedRoute><FollowListPage /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      <Route path="/hashtag/:tag" element={<ProtectedRoute><HashtagPage /></ProtectedRoute>} />
      <Route path="/activity" element={<ProtectedRoute><ActivityPage /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}