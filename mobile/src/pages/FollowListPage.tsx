import { useEffect, useCallback, useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useAuthStore } from '@/store/auth-store';
import { useUserStore } from '@/store/user-store';
import { useNavigate } from 'react-router-dom';
import type { UserType } from '@/types/user';
import { displayInitial, displayName } from '@/lib/utils';

export default function FollowListPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const type = location.pathname.endsWith('/following') ? 'following' : 'followers';
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.rootUser);
  const followUser = useUserStore((state) => state.followUser);
  const getFollowers = useUserStore((state) => state.getFollowers);
  const getFollowing = useUserStore((state) => state.getFollowing);
  const [listUsers, setListUsers] = useState<UserType[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const endOfListRef = useRef<HTMLDivElement>(null);

  const loadList = useCallback(async () => {
    const targetUserId = id ?? currentUser?.sub;
    if (!targetUserId) return;

    setInitialLoading(true);
    try {
      const users = type === 'followers'
        ? await getFollowers(targetUserId, 1, 20)
        : await getFollowing(targetUserId, 1, 20);
      setListUsers(users);
      setPage(1);
      setHasMore((users ?? []).length === 20);
    } catch (error) {
      console.error('Error loading list:', error);
      setListUsers([]);
    } finally {
      setInitialLoading(false);
    }
  }, [id, type, currentUser?.sub, getFollowers, getFollowing]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    const targetUserId = id ?? currentUser?.sub;
    if (!targetUserId) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const users = type === 'followers'
        ? await getFollowers(targetUserId, nextPage, 20)
        : await getFollowing(targetUserId, nextPage, 20);

      setListUsers((prev) => [...prev, ...(users ?? [])]);
      setPage(nextPage);
      setHasMore((users ?? []).length === 20);
    } catch (error) {
      console.error('Error loading more:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page, id, type, currentUser?.sub, getFollowers, getFollowing]);

  useEffect(() => {
    if (!hasMore || isLoading || initialLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (endOfListRef.current) {
      observer.observe(endOfListRef.current);
    }

    return () => {
      if (endOfListRef.current) observer.unobserve(endOfListRef.current);
    };
  }, [endOfListRef, hasMore, isLoading, initialLoading, loadMore]);

  const isFollowers = type === 'followers';
  const title = isFollowers ? 'Followers' : 'Following';
  return (
    <MobileShell>
      <TopBar title={`${title}`} showBack />

      {initialLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <Spinner className="size-8" />
          <p className="text-gray-400 text-sm">Loading {title.toLowerCase()}...</p>
        </div>
      ) : listUsers.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 py-20">
          <Users size={40} className="text-gray-200" />
          <p className="text-gray-400 font-medium">No {title.toLowerCase()} yet</p>
        </div>
      ) : (
        <div className="bg-white divide-y divide-gray-50">
          {listUsers.map((u) => {
            return (
              <div key={u.id} className="flex items-center gap-3 px-4 py-3.5">
                <button
                  onClick={() => navigate(`/profile/${u.id}`)}
                  className="flex items-center gap-3 flex-1 min-w-0"
                >
                  <Avatar className="w-11 h-11 shrink-0">
                    <AvatarFallback>{displayInitial(u)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 text-left">
                    <p className="font-semibold text-gray-900 text-sm truncate">{displayName(u)}</p>
                    <p className="text-xs text-gray-400 truncate">@{u.username}</p>
                    {u.profile.bio && (
                      <p className="text-xs text-gray-500 truncate mt-0.5">{u.profile.bio}</p>
                    )}
                  </div>
                </button>
                {u.id !== currentUser?.sub && (
                  <Button
                    variant={u.isFollowed ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => followUser(u.id, !!u.isFollowed)}
                    className="rounded-full shrink-0"
                  >
                    {u.isFollowed ? 'Following' : 'Follow'}
                  </Button>
                )}
              </div>
            );
          })}
          {hasMore && isLoading && (
            <div className="flex justify-center py-4">
              <Spinner className="size-5" />
            </div>
          )}
          {!hasMore && listUsers.length > 0 && (
            <div className="text-center py-4 text-gray-400 text-sm">
              No more {title.toLowerCase()}
            </div>
          )}
          <div ref={endOfListRef} className="h-4" />
        </div>
      )}
    </MobileShell>
  );
}
