import { useParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { useUserStore } from '@/store/user-store';
import { MOCK_USERS } from '@/lib/mock-data';
import { useEffect, useState } from 'react';
import type { UserType } from '@/types/user';
import { useNavigate } from 'react-router-dom';

export default function FollowListPage() {
  const { id, type } = useParams<{ id: string; type: string }>();
  const navigate = useNavigate();
  const rootUser = useAuthStore((state) => state.rootUser);
  const getUserById = useUserStore((state) => state.getUserById);
  const followUser = useUserStore((state) => state.followUser);

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      try {
        const u = await getUserById(id);
        if (mounted) setUser(u);
      } catch (e) {
        console.error('Failed to load user for follow list', e);
        if (mounted) setUser(null);
      }
    })();
    return () => { mounted = false };
  }, [id, getUserById]);
  const isFollowers = type === 'followers';
  const title = isFollowers ? 'Followers' : 'Following';

  // Simulate a follow list by picking mock users
  const listUsers = MOCK_USERS.slice(0, isFollowers ? 2 : 3);

  return (
    <MobileShell>
      <TopBar title={`${user ? `@${user.username}` : ''} ${title}`} showBack />

      {listUsers.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 py-20">
          <Users size={40} className="text-gray-200" />
          <p className="text-gray-400 font-medium">No {title.toLowerCase()} yet</p>
        </div>
      ) : (
        <div className="bg-white divide-y divide-gray-50">
          {listUsers.map((u) => {
            const initials = u.profile.firstName
              ? `${u.profile.firstName[0]}${u.profile.lastName?.[0] ?? ''}`.toUpperCase()
              : u.username.slice(0, 2).toUpperCase();
            const displayName = u.profile.firstName
              ? `${u.profile.firstName} ${u.profile.lastName}`
              : u.username;

            return (
              <div key={u.id} className="flex items-center gap-3 px-4 py-3.5">
                <button
                  onClick={() => navigate(`/user/${u.id}`)}
                  className="flex items-center gap-3 flex-1 min-w-0"
                >
                  <Avatar className="w-11 h-11 shrink-0">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 text-left">
                    <p className="font-semibold text-gray-900 text-sm truncate">{displayName}</p>
                    <p className="text-xs text-gray-400 truncate">@{u.username}</p>
                    {u.profile.bio && (
                      <p className="text-xs text-gray-500 truncate mt-0.5">{u.profile.bio}</p>
                    )}
                  </div>
                </button>
                {u.id !== rootUser?.sub && (
                  <Button
                    variant={u.isFollowed ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => followUser(u.id, u.isFollowed ?? false)}
                    className="rounded-full shrink-0"
                  >
                    {u.isFollowed ? 'Following' : 'Follow'}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </MobileShell>
  );
}
