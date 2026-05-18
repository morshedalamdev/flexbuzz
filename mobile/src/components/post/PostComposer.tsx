import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { usePostStore } from '@/store/post-store';
import { Spinner } from '../ui/spinner';
import { MAX_LENGTH } from '@/lib/constant';

interface PostComposerProps {
  onSuccess?: () => void;
  autoFocus?: boolean;
}


export default function PostComposer({ onSuccess, autoFocus }: PostComposerProps) {
  const [content, setContent] = useState('');
  const { isLoading, createPost } = usePostStore();

  const remaining = MAX_LENGTH - content.length;
  const isOverLimit = remaining < 0;

  const handleSubmit = async () => {
    if (!content.trim() || isOverLimit) return;
    await createPost(content.trim());
    setContent('');
    onSuccess?.();
  };

  return (
    <div className="flex gap-3 p-4">
      <div className="flex-1 flex flex-col gap-3">
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoFocus={autoFocus}
          className="min-h-30 text-base rounded-none border-0 bg-transparent focus:ring-0 p-0 resize-none placeholder:text-gray-300"
        />
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span
            className={`text-xs font-medium ${isOverLimit
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
            disabled={!content.trim() || isOverLimit || isLoading}
            size="sm"
            className="rounded-full px-5"
          >
            {isLoading ? <Spinner /> : null}
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
