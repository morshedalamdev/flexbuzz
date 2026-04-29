import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from '@/lib/utils';
import { useApp } from '@/store/AppContext';
import type { Comment } from '@/types';

interface CommentListProps {
  postId: string;
}

function CommentItem({ comment }: { comment: Comment }) {
  const { deleteComment, currentUser } = useApp();
  const isOwner = comment.userId === currentUser.id;
  const initials = comment.user.profile.firstName
    ? `${comment.user.profile.firstName[0]}${comment.user.profile.lastName?.[0] ?? ''}`.toUpperCase()
    : comment.user.username.slice(0, 2).toUpperCase();

  return (
    <div className="flex gap-3 py-3 border-b border-gray-50 last:border-0">
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-semibold text-gray-900">
            @{comment.user.username}
          </span>
          <span className="text-xs text-gray-400">{formatRelativeTime(comment.createdAt)}</span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
      </div>
      {isOwner && (
        <button
          onClick={() => deleteComment(comment.id)}
          className="shrink-0 p-1 text-gray-300 hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}

export default function CommentSection({ postId }: CommentListProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { fetchComments, createComment, currentUser } = useApp();

  const comments = fetchComments(postId);

  const initials = currentUser.profile.firstName
    ? `${currentUser.profile.firstName[0]}${currentUser.profile.lastName?.[0] ?? ''}`.toUpperCase()
    : currentUser.username.slice(0, 2).toUpperCase();

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    createComment(postId, text.trim());
    setText('');
    setLoading(false);
  };

  return (
    <div className="bg-white">
      {/* Comments */}
      <div className="px-4">
        {comments.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-6">No comments yet. Be the first!</p>
        ) : (
          comments.map((c) => <CommentItem key={c.id} comment={c} />)
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-16 bg-white border-t border-gray-100 p-3 flex gap-3 items-end">
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex gap-2 items-end">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            className="min-h-[40px] max-h-[120px] text-sm py-2"
            rows={1}
          />
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!text.trim() || loading}
            className="shrink-0"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
