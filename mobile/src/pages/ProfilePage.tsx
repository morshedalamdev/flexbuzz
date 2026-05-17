import { useEffect, useState } from 'react';
import { Pencil, LogOut, UserCheck, UserPlus } from 'lucide-react';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatCount } from '@/lib/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';
import PostCard from '@/components/post/PostCard';
import { useUserStore } from '@/store/user-store';
import EditProfileDialog from '@/components/user/EditProfileDialog';
import { usePostStore } from '@/store/post-store';
import type { PostType } from '@/types/post';
import EditPostDialog from '@/components/post/EditPostDialog';
import DeletePostDialog from '@/components/post/DeletePostDialog';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  // --- USER DATA
  const { logout, rootUser } = useAuthStore();
  const { getUserById, followUser } = useUserStore();
  const userId = id || rootUser?.sub;
  const userProfile = useUserStore((state) => userId ? state.users.get(userId) : null);
  const isRootUser = rootUser?.sub === userProfile?.id;
  // --- USER POSTS
  const { isLoading: isPostsLoading, getPostsByUser } = usePostStore();
  const userPosts = usePostStore((state) => (userId ? state.postsByUser[userId] : null));
  // --- UI STATE
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editPost, setEditPost] = useState<PostType | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  // ---
  useEffect(() => {
    if (!userId) return;
    getUserById(userId);
    getPostsByUser(userId);
  }, [userId, getUserById, getPostsByUser]);
  // --- UI HELPERS
  const initials = userProfile?.profile.firstName
    ? `${userProfile.profile.firstName[0]}${userProfile.profile.lastName?.[0] ?? ''}`.toUpperCase()
    : userProfile?.username.slice(0, 2).toUpperCase();

  const displayName = userProfile?.profile.firstName
    ? `${userProfile.profile.firstName} ${userProfile.profile.lastName}`
    : userProfile?.username;
  // ---
  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  if (!userProfile) {
    return (
      <MobileShell>
        <TopBar title="Profile" showBack />
        <div className="flex items-center justify-center flex-1">
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </MobileShell>
    );
  }
  return (
    <MobileShell>
      <TopBar
        title="Profile"
        rightAction={
          isRootUser && (
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>)
        }
      />

      {/* Profile header */}
      <div className="bg-white border-b border-gray-100 px-4 pb-5">
        <div className="h-20 -mx-4 mb-0 bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-b-2xl" />
        <div className="-mt-10 mb-3 flex items-end justify-between">
          <Avatar className="w-20 h-20 border-4 border-white shadow-md">
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>
          {isRootUser ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditProfileOpen(true)}
              className="rounded-full gap-1.5"
            >
              <Pencil size={13} />
              Edit profile
            </Button>
          ) : (
            <Button
              variant={userProfile.isFollowed ? 'outline' : 'default'}
              size="sm"
              onClick={() => followUser(userProfile.id, userProfile?.isFollowed ?? false)}
              className="rounded-full gap-1.5"
            >
              {userProfile.isFollowed ? (
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

        <h2 className="text-xl font-bold text-gray-900 leading-tight">{displayName}</h2>
        <p className="text-gray-400 text-sm mb-2">@{userProfile?.username}</p>

        {userProfile?.profile.bio && (
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            {userProfile.profile.bio}
          </p>
        )}

        <div className="flex gap-5">
          <button className="flex items-center gap-1.5 text-sm">
            <span className="font-bold text-gray-900">{formatCount(userProfile?.followerCount)}</span>
            <span className="text-gray-400">Followers</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm">
            <span className="font-bold text-gray-900">{formatCount(userProfile?.followingCount)}</span>
            <span className="text-gray-400">Following</span>
          </button>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <h3 className="text-sm font-semibold text-gray-500 px-1">Posts</h3>
        {isPostsLoading ? (
          <div className="py-12 text-center">
            <p className="text-gray-400 text-sm">Loading posts...</p>
          </div>
        ) : !userPosts || userPosts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-400 text-sm">This user hasn't posted anything yet.</p>
          </div>
        ) : (
          userPosts.map((post) => <PostCard
            key={post.id}
            post={post}
            onEdit={setEditPost}
            onDelete={setDeletePostId}
          />)
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
      <EditProfileDialog
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        user={userProfile}
      />
    </MobileShell>
  );
}
