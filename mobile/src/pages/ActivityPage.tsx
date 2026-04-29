import { Bell, Heart, MessageCircle, UserPlus } from 'lucide-react';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatRelativeTime } from '@/lib/utils';
import { MOCK_USERS, MOCK_POSTS } from '@/lib/mock-data';

// Static mock notifications
const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'like',
    user: MOCK_USERS[0],
    post: MOCK_POSTS[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
  },
  {
    id: 'n2',
    type: 'comment',
    user: MOCK_USERS[1],
    post: MOCK_POSTS[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    read: false,
  },
  {
    id: 'n3',
    type: 'follow',
    user: MOCK_USERS[2],
    post: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: true,
  },
  {
    id: 'n4',
    type: 'like',
    user: MOCK_USERS[1],
    post: MOCK_POSTS[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    read: true,
  },
  {
    id: 'n5',
    type: 'comment',
    user: MOCK_USERS[0],
    post: MOCK_POSTS[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    read: true,
  },
];

const ICON_MAP = {
  like: <Heart size={16} className="text-red-500" fill="currentColor" />,
  comment: <MessageCircle size={16} className="text-blue-500" />,
  follow: <UserPlus size={16} className="text-green-500" />,
};

const MESSAGE_MAP = {
  like: 'liked your post',
  comment: 'commented on your post',
  follow: 'started following you',
};

export default function ActivityPage() {
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <MobileShell>
      <TopBar
        title="Activity"
        rightAction={
          unreadCount > 0 ? (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          ) : undefined
        }
      />

      {MOCK_NOTIFICATIONS.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
          <Bell size={40} className="text-gray-200" />
          <p className="text-gray-400 font-medium">No notifications yet</p>
        </div>
      ) : (
        <div className="bg-white divide-y divide-gray-50">
          {MOCK_NOTIFICATIONS.map((notif) => {
            const initials = notif.user.profile.firstName
              ? `${notif.user.profile.firstName[0]}${notif.user.profile.lastName?.[0] ?? ''}`.toUpperCase()
              : notif.user.username.slice(0, 2).toUpperCase();

            return (
              <div
                key={notif.id}
                className={`flex items-start gap-3 px-4 py-3.5 ${
                  !notif.read ? 'bg-blue-50/40' : ''
                }`}
              >
                <div className="relative shrink-0">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="text-sm">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5 shadow-sm">
                    {ICON_MAP[notif.type as keyof typeof ICON_MAP]}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">@{notif.user.username}</span>{' '}
                    {MESSAGE_MAP[notif.type as keyof typeof MESSAGE_MAP]}
                  </p>
                  {notif.post && (
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      "{notif.post.content}"
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatRelativeTime(notif.createdAt)}
                  </p>
                </div>
                {!notif.read && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </MobileShell>
  );
}
