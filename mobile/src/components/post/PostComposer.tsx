import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { usePostStore } from '@/store/post-store';

interface PostComposerProps {
  onSuccess?: () => void;
  autoFocus?: boolean;
}

const MAX_LENGTH = 280;

export default function PostComposer({ onSuccess, autoFocus }: PostComposerProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const createPost = usePostStore((state) => state.createPost);

  const initials = currentUser.profile.firstName
    ? `${currentUser.profile.firstName[0]}${currentUser.profile.lastName?.[0] ?? ''}`.toUpperCase()
    : currentUser.username.slice(0, 2).toUpperCase();

  const remaining = MAX_LENGTH - content.length;
  const isOverLimit = remaining < 0;

  const handleSubmit = async () => {
    if (!content.trim() || isOverLimit) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400)); // simulated delay
    createPost(content.trim(), currentUser);
    setContent('');
    setLoading(false);
    onSuccess?.();
  };

  return (
    <div className="flex gap-3 p-4">
      <Avatar className="w-10 h-10 shrink-0 mt-1">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col gap-3">
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoFocus={autoFocus}
          className="min-h-[100px] text-base border-0 bg-transparent focus:ring-0 p-0 resize-none placeholder:text-gray-300"
        />
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span
            className={`text-xs font-medium ${
              isOverLimit
                ? 'text-red-500'
                : remaining <= 20
                  ? 'text-yellow-500'
                  : 'text-gray-300'
            }`}
          >
            {remaining}
          </span>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isOverLimit || loading}
            size="sm"
            className="rounded-full px-5"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
