import { useState } from 'react';
import { Zap } from 'lucide-react';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';
import PostCard from '@/components/post/PostCard';
import PostComposer from '@/components/post/PostComposer';
import EditPostDialog from '@/components/post/EditPostDialog';
import DeletePostDialog from '@/components/post/DeletePostDialog';
import { usePostStore } from '@/store/post-store';
import { useAuthStore } from '@/store/auth-store';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  // const posts = usePostStore((state) => state.posts);
  // const [editPost, setEditPost] = useState<Post | null>(null);
  // const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <MobileShell>
      <TopBar
        title=""
        rightAction={
          <div onClick={handleLogout} className="flex items-center gap-1.5">
            <div className="bg-blue-500 rounded-lg p-1">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="text-base font-extrabold text-gray-900">Flex Buzz</span>
          </div>
        }
      />

      {/* Composer */}
      <div className="bg-white border-b border-gray-100">
        {/* <PostComposer /> */}
      </div>

      {/* Feed */}
      <div className="flex-1 space-y-2 p-3">
        {/* {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Zap size={40} className="text-gray-200 mb-3" />
            <p className="text-gray-400 font-medium">No posts yet</p>
            <p className="text-gray-300 text-sm">Be the first to share something!</p>
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
        )} */}
      </div>

      {/* <EditPostDialog
        post={editPost}
        open={!!editPost}
        onOpenChange={(open) => !open && setEditPost(null)}
      />
      <DeletePostDialog
        postId={deletePostId}
        open={!!deletePostId}
        onOpenChange={(open) => !open && setDeletePostId(null)}
      /> */}
    </MobileShell>
  );
}
