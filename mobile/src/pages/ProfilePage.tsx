import { useState } from 'react';
import { Pencil, LogOut } from 'lucide-react';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/post/PostCard';
import EditPostDialog from '@/components/post/EditPostDialog';
import DeletePostDialog from '@/components/post/DeletePostDialog';
import EditProfileDialog from '@/components/user/EditProfileDialog';
import { formatCount } from '@/lib/utils';
import { useApp } from '@/store/AppContext';
import { useNavigate } from 'react-router-dom';
import type { Post } from '@/types';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, getPostsByUser, logout } = useApp();
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const userPosts = getPostsByUser(currentUser.id);

  const initials = currentUser.profile.firstName
    ? `${currentUser.profile.firstName[0]}${currentUser.profile.lastName?.[0] ?? ''}`.toUpperCase()
    : currentUser.username.slice(0, 2).toUpperCase();

  const displayName = currentUser.profile.firstName
    ? `${currentUser.profile.firstName} ${currentUser.profile.lastName}`
    : currentUser.username;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <MobileShell>
      <TopBar
        title="Profile"
        rightAction={
          <div className="flex items-center gap-1">
            <button
              onClick={() => setEditProfileOpen(true)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
              aria-label="Edit profile"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        }
      />

      {/* Profile header */}
      <div className="bg-white border-b border-gray-100 px-4 pb-5">
        <div className="h-20 -mx-4 mb-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-b-2xl" />
        <div className="-mt-10 mb-3 flex items-end justify-between">
          <Avatar className="w-20 h-20 border-4 border-white shadow-md">
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditProfileOpen(true)}
            className="rounded-full gap-1.5"
          >
            <Pencil size={13} />
            Edit profile
          </Button>
        </div>

        <h2 className="text-xl font-bold text-gray-900 leading-tight">{displayName}</h2>
        <p className="text-gray-400 text-sm mb-2">@{currentUser.username}</p>

        {currentUser.profile.bio && (
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            {currentUser.profile.bio}
          </p>
        )}

        <div className="flex gap-5">
          <button className="flex items-center gap-1.5 text-sm">
            <span className="font-bold text-gray-900">{formatCount(currentUser.followerCount)}</span>
            <span className="text-gray-400">Followers</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm">
            <span className="font-bold text-gray-900">{formatCount(currentUser.followingCount)}</span>
            <span className="text-gray-400">Following</span>
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="p-3 space-y-2">
        <h3 className="text-sm font-semibold text-gray-500 px-1">Your Posts</h3>
        {userPosts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-400 text-sm">You haven't posted anything yet.</p>
          </div>
        ) : (
          userPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={setEditPost}
              onDelete={setDeletePostId}
            />
          ))
        )}
      </div>

      <EditPostDialog
        post={editPost}
        open={!!editPost}
        onOpenChange={(open) => !open && setEditPost(null)}
      />
      <DeletePostDialog
        postId={deletePostId}
        open={!!deletePostId}
        onOpenChange={(open) => !open && setDeletePostId(null)}
      />
      <EditProfileDialog open={editProfileOpen} onOpenChange={setEditProfileOpen} />
    </MobileShell>
  );
}
