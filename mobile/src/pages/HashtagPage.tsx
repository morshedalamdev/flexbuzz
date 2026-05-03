import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Hash } from 'lucide-react';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';
import PostCard from '@/components/post/PostCard';
import EditPostDialog from '@/components/post/EditPostDialog';
import DeletePostDialog from '@/components/post/DeletePostDialog';
import { usePostStore } from '@/store/post-store';
import type { Post } from '@/types';

export default function HashtagPage() {
  const { tag } = useParams<{ tag: string }>();
  const getPostsByHashtag = usePostStore((state) => state.getPostsByHashtag);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);

  const posts = tag ? getPostsByHashtag(tag) : [];

  return (
    <MobileShell>
      <TopBar title={`#${tag}`} showBack />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 rounded-2xl p-3">
            <Hash size={24} className="text-blue-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">#{tag}</h1>
            <p className="text-sm text-gray-400">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2">
        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <Hash size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No posts with #{tag}</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={setEditPost}
              onDelete={setDeletePostId}
            />
          ))
        )}
      </div>

      <EditPostDialog
        post={editPost}
        open={!!editPost}
        onOpenChange={(open) => !open && setEditPost(null)}
      />
      <DeletePostDialog
        postId={deletePostId}
        open={!!deletePostId}
        onOpenChange={(open) => !open && setDeletePostId(null)}
      />
    </MobileShell>
  );
}
