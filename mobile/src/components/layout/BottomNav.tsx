import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: PlusSquare, label: 'Post', path: '/create' },
  { icon: Bell, label: 'Activity', path: '/activity' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 safe-area-bottom">
      <div className="flex items-center justify-around px-2 h-16">
        {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
          const isActive =
            path === '/' ? pathname === '/' : pathname.startsWith(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors',
                isActive ? 'text-blue-500' : 'text-gray-400',
              )}
              aria-label={label}
            >
              {path === '/create' ? (
                <div className="bg-blue-500 rounded-2xl p-2.5 shadow-md shadow-blue-200">
                  <Icon size={20} className="text-white" />
                </div>
              ) : (
                <>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  <span className="text-[10px] font-medium">{label}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
