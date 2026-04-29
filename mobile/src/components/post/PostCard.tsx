import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { formatRelativeTime } from '@/lib/utils';
import { useApp } from '@/store/AppContext';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (id: string) => void;
  compact?: boolean;
}

export default function PostCard({ post, onEdit, onDelete, compact = false }: PostCardProps) {
  const navigate = useNavigate();
  const { likePost, currentUser } = useApp();
  const isOwner = post.userId === currentUser.id;

  const initials = post.user.profile.firstName
    ? `${post.user.profile.firstName[0]}${post.user.profile.lastName?.[0] ?? ''}`.toUpperCase()
    : post.user.username.slice(0, 2).toUpperCase();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    likePost(post.id);
  };

  const handleComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/post/${post.id}`);
  };

  const renderContent = (content: string) => {
    const parts = content.split(/(#\w+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        return (
          <button
            key={i}
            className="text-blue-500 font-medium hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/hashtag/${part.slice(1)}`);
            }}
          >
            {part}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <article
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => navigate(`/post/${post.id}`)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className="flex items-center gap-3 min-w-0"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/${post.userId}`);
          }}
        >
          <Avatar className="w-10 h-10 shrink-0">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm leading-tight">
              {post.user.profile.firstName
                ? `${post.user.profile.firstName} ${post.user.profile.lastName}`
                : post.user.username}
            </p>
            <p className="text-xs text-gray-400">
              @{post.user.username} · {formatRelativeTime(post.createdAt)}
            </p>
          </div>
        </div>
        {isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="shrink-0 p-1 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(post);
                }}
              >
                <Pencil size={14} className="mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500 focus:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(post.id);
                }}
              >
                <Trash2 size={14} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Content */}
      <p className={`text-gray-800 text-sm leading-relaxed mb-3 ${compact ? 'line-clamp-3' : ''}`}>
        {renderContent(post.content)}
      </p>

      {/* Hashtag badges */}
      {post.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.hashtags.map((h) => (
            <Badge
              key={h.id}
              variant="hashtag"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/hashtag/${h.tag}`);
              }}
            >
              #{h.tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            post.isLikedByCurrentUser
              ? 'text-red-500 font-medium'
              : 'text-gray-400 hover:text-red-400'
          }`}
        >
          <Heart
            size={18}
            fill={post.isLikedByCurrentUser ? 'currentColor' : 'none'}
            strokeWidth={post.isLikedByCurrentUser ? 0 : 2}
          />
          <span>{post.likeCount > 0 ? post.likeCount : ''}</span>
        </button>
        <button
          onClick={handleComments}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-400 transition-colors"
        >
          <MessageCircle size={18} strokeWidth={1.8} />
          <span>{post.commentCount > 0 ? post.commentCount : ''}</span>
        </button>
      </div>
    </article>
  );
}
