import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pencil, UserPlus, UserCheck, Calendar, Users } from 'lucide-react';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/post/PostCard';
import EditPostDialog from '@/components/post/EditPostDialog';
import DeletePostDialog from '@/components/post/DeletePostDialog';
import EditProfileDialog from '@/components/user/EditProfileDialog';
import { formatCount } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';
import { usePostStore } from '@/store/post-store';
import { useUserStore } from '@/store/user-store';
import type { Post } from '@/types';

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const getPostsByUser = usePostStore((state) => state.getPostsByUser);
  const getUserById = useUserStore((state) => state.getUserById);
  const followUser = useUserStore((state) => state.followUser);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const userId = id === 'me' ? currentUser.id : (id ?? '');
  const user = getUserById(userId);
  const userPosts = getPostsByUser(userId);
  const isCurrentUser = userId === currentUser.id;

  if (!user) {
    return (
      <MobileShell>
        <TopBar title="Profile" showBack />
        <div className="flex items-center justify-center flex-1">
          <p className="text-gray-400">User not found.</p>
        </div>
      </MobileShell>
    );
  }

  const initials = user.profile.firstName
    ? `${user.profile.firstName[0]}${user.profile.lastName?.[0] ?? ''}`.toUpperCase()
    : user.username.slice(0, 2).toUpperCase();

  const displayName = user.profile.firstName
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : user.username;

  return (
    <MobileShell>
      <TopBar
        title=""
        showBack={!isCurrentUser}
        rightAction={
          isCurrentUser ? (
            <button
              onClick={() => setEditProfileOpen(true)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <Pencil size={18} />
            </button>
          ) : undefined
        }
      />

      {/* Profile header */}
      <div className="bg-white border-b border-gray-100 px-4 pb-5">
        {/* Cover gradient */}
        <div className="h-20 -mx-4 mb-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-b-2xl" />

        {/* Avatar */}
        <div className="-mt-10 mb-3 flex items-end justify-between">
          <Avatar className="w-20 h-20 border-4 border-white shadow-md">
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>
          {!isCurrentUser && (
            <Button
              variant={user.isFollowed ? 'outline' : 'default'}
              size="sm"
              onClick={() => followUser(user.id)}
              className="rounded-full gap-1.5"
            >
              {user.isFollowed ? (
                <>
                  <UserCheck size={14} /> Following
                </>
              ) : (
                <>
                  <UserPlus size={14} /> Follow
                </>
              )}
            </Button>
          )}
        </div>

        {/* Name & username */}
        <h2 className="text-xl font-bold text-gray-900 leading-tight">{displayName}</h2>
        <p className="text-gray-400 text-sm mb-2">@{user.username}</p>

        {/* Bio */}
        {user.profile.bio && (
          <p className="text-sm text-gray-700 leading-relaxed mb-3">{user.profile.bio}</p>
        )}

        {/* Joined */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
          <Calendar size={12} />
          <span>
            Joined{' '}
            {new Date(user.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Stats */}
        <div className="flex gap-5">
          <button
            onClick={() => navigate(`/user/${user.id}/followers`)}
            className="flex items-center gap-1.5 text-sm"
          >
            <Users size={14} className="text-gray-400" />
            <span className="font-bold text-gray-900">{formatCount(user.followerCount)}</span>
            <span className="text-gray-400">Followers</span>
          </button>
          <button
            onClick={() => navigate(`/user/${user.id}/following`)}
            className="flex items-center gap-1.5 text-sm"
          >
            <span className="font-bold text-gray-900">{formatCount(user.followingCount)}</span>
            <span className="text-gray-400">Following</span>
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="p-3 space-y-2">
        <h3 className="text-sm font-semibold text-gray-500 px-1">Posts</h3>
        {userPosts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-400 text-sm">No posts yet.</p>
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
