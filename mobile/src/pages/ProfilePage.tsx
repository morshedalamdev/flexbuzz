import { useEffect, useState } from 'react';
import { Pencil, LogOut, UserCheck, UserPlus } from 'lucide-react';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatCount } from '@/lib/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';
import { useUserStore } from '@/store/user-store';
import type { UserType } from '@/types/user';
import EditProfileDialog from '@/components/user/EditProfileDialog';

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { logout, rootUser } = useAuthStore();
  const { getUserById } = useUserStore();

  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  // const getPostsByUser = usePostStore((state) => state.getPostsByUser);
  // const [editPost, setEditPost] = useState<Post | null>(null);
  // const [deletePostId, setDeletePostId] = useState<string | null>(null);

  // const userPosts = getPostsByUser(currentUser.id);

  useEffect(() => {
    const fetchUser = async () => {
      const idToFetch = userId || rootUser?.sub;
      if (!idToFetch) return;

      const user = await getUserById(idToFetch);
      setCurrentUser(user);
    }

    fetchUser();
  }, [getUserById, rootUser?.sub, userId]);

  const isCurrentUser = rootUser?.sub === currentUser?.id;

  const initials = currentUser?.profile.firstName
    ? `${currentUser.profile.firstName[0]}${currentUser.profile.lastName?.[0] ?? ''}`.toUpperCase()
    : currentUser?.username.slice(0, 2).toUpperCase();

  const displayName = currentUser?.profile.firstName
    ? `${currentUser.profile.firstName} ${currentUser.profile.lastName}`
    : currentUser?.username;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const refreshCurrentUser = async () => {
    const idToFetch = userId || rootUser?.sub;
    if (!idToFetch) return;

    const user = await getUserById(idToFetch);
    setCurrentUser(user);
  };


  if (!currentUser) {
    return (
      <MobileShell>
        <TopBar title="Profile" showBack />
        <div className="flex items-center justify-center flex-1">
          <p className="text-gray-400">User not found.</p>
        </div>
      </MobileShell>
    );
  }
  return (
    <MobileShell>
      <TopBar
        title="Profile"
        rightAction={
          isCurrentUser && (
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
          {isCurrentUser ? (
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
              variant={currentUser.isFollowed ? 'outline' : 'default'}
              size="sm"
              // onClick={() => followUser(user.id)}
              className="rounded-full gap-1.5"
            >
              {currentUser.isFollowed ? (
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
        <p className="text-gray-400 text-sm mb-2">@{currentUser?.username}</p>

        {currentUser?.profile.bio && (
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            {currentUser.profile.bio}
          </p>
        )}

        <div className="flex gap-5">
          <button className="flex items-center gap-1.5 text-sm">
            <span className="font-bold text-gray-900">{formatCount(currentUser?.followerCount)}</span>
            <span className="text-gray-400">Followers</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm">
            <span className="font-bold text-gray-900">{formatCount(currentUser?.followingCount)}</span>
            <span className="text-gray-400">Following</span>
          </button>
        </div>
      </div>

      {/* Posts */}
      {/* <div className="p-3 space-y-2">
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
      </div> */}

      {/* <EditPostDialog
        post={editPost}
        open={!!editPost}
        onOpenChange={(open) => !open && setEditPost(null)}
      />
      <DeletePostDialog
        postId={deletePostId}
        open={!!deletePostId}
        onOpenChange={(open) => !open && setDeletePostId(null)}
      /> */}
      <EditProfileDialog
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        user={currentUser}
        onSaved={refreshCurrentUser}
      />
    </MobileShell>
  );
}
