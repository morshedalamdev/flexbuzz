import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import EditPostDialog from '@/components/post/EditPostDialog';
import DeletePostDialog from '@/components/post/DeletePostDialog';
import { displayInitial, displayName, formatRelativeTime } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';
import { useNavigate } from 'react-router-dom';
import type { PostType } from '@/types/post';
import { usePostStore } from '@/store/post-store';

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const rootUser = useAuthStore((state) => state.rootUser);
  const post = usePostStore((state) => (id ? state.getPostById(id) : undefined));
  const [editPost, setEditPost] = useState<PostType | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);

  if (!post) {
    return (
      <MobileShell>
        <TopBar title="Post" showBack />
        <div className="flex items-center justify-center flex-1">
          <p className="text-gray-400">Post not found.</p>
        </div>
      </MobileShell>
    );
  }

  const isOwner = post.userId === rootUser?.sub;

  const renderContent = (content: string) => {
    const parts = content.split(/(#\w+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        return (
          <button
            key={i}
            className="text-blue-500 font-medium hover:underline"
            onClick={() => navigate(`/hashtag/${part.slice(1)}`)}
          >
            {part}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <MobileShell>
      <TopBar title="Post" showBack />

      {/* Post */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate(`/profile/${post.userId}`)}
          >
            <Avatar className="w-12 h-12">
              <AvatarFallback>{displayInitial(post.user)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-gray-900">{displayName(post.user)}</p>
              <p className="text-sm text-gray-400">@{post.user.username}</p>
            </div>
          </div>
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400">
                  <MoreHorizontal size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEditPost(post)}>
                  <Pencil size={14} className="mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500 focus:bg-red-50"
                  onClick={() => setDeletePostId(post.id)}
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <p className="text-gray-800 text-base leading-relaxed mb-4">
          {renderContent(post.content)}
        </p>

        {post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.hashtags.map((h) => (
              <Badge
                key={h.id}
                variant="hashtag"
                onClick={() => navigate(`/hashtag/${h.tag}`)}
              >
                #{h.tag}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 mb-4">{formatRelativeTime(post.createdAt)}</p>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            // onClick={() => likePost(post.id)}
            className={`gap-2 rounded-full ${post.isLikedByCurrentUser ? 'text-red-500' : 'text-gray-500'
              }`}
          >
            <Heart
              size={20}
              fill={post.isLikedByCurrentUser ? 'currentColor' : 'none'}
              strokeWidth={post.isLikedByCurrentUser ? 0 : 2}
            />
            {post.likeCount > 0 && <span>{post.likeCount}</span>}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 rounded-full text-gray-500">
            <MessageCircle size={20} strokeWidth={1.8} />
            {post.commentCount > 0 && <span>{post.commentCount}</span>}
          </Button>
        </div>
      </div>

      {/* Comments */}
      {/* <CommentSection postId={post.id} /> */}

      <EditPostDialog
        post={editPost}
        open={!!editPost}
        onOpenChange={(open) => !open && setEditPost(null)}
      />
      <DeletePostDialog
        postId={deletePostId}
        open={!!deletePostId}
        onOpenChange={(open) => {
          if (!open) {
            setDeletePostId(null);
            navigate(-1);
          }
        }}
      />
    </MobileShell>
  );
}
