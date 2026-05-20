import { Bell } from 'lucide-react';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';


// const ICON_MAP = {
//   like: <Heart size={16} className="text-red-500" fill="currentColor" />,
//   comment: <MessageCircle size={16} className="text-blue-500" />,
//   follow: <UserPlus size={16} className="text-green-500" />,
// };

// const MESSAGE_MAP = {
//   like: 'liked your post',
//   comment: 'commented on your post',
//   follow: 'started following you',
// };

export default function ActivityPage() {
  // const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;
  const unreadCount = 0;

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
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
        <Bell size={40} className="text-gray-200" />
        <p className="text-gray-400 font-medium">No notifications yet</p>
      </div>
      {/* {MOCK_NOTIFICATIONS.length === 0 ? (
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
                className={`flex items-start gap-3 px-4 py-3.5 ${!notif.read ? 'bg-blue-50/40' : ''
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
      )} */}
    </MobileShell>
  );
}
