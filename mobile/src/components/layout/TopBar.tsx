import { ArrowLeft, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  className?: string;
}

export default function TopBar({
  title,
  showBack = false,
  onBack,
  rightAction,
  transparent = false,
  className,
}: TopBarProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex items-center justify-between px-4 h-14',
        transparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm border-b border-gray-100',
        className,
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {showBack && (
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-8 h-8 -ml-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
        )}
        {title && (
          <h1 className="text-lg font-bold text-gray-900 truncate">{title}</h1>
        )}
      </div>
      <div className="flex items-center gap-2">
        {rightAction || <div className="w-8" />}
      </div>
    </header>
  );
}

export function TopBarMenuButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
    >
      <MoreVertical size={20} className="text-gray-700" />
    </button>
  );
}
