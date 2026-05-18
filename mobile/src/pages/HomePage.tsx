import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';
import PostCard from '@/components/post/PostCard';
import EditPostDialog from '@/components/post/EditPostDialog';
import DeletePostDialog from '@/components/post/DeletePostDialog';
import { usePostStore } from '@/store/post-store';
import type { PostType } from '@/types/post';
import InfiniteScroll from 'react-infinite-scroll-component';

const PAGE_SIZE = 10;

export default function HomePage() {
  const {
    isLoading,
    posts,
    getPostsInRoot,
    hasMorePosts,
    currentPostsPage,
  } = usePostStore();
  const [editPost, setEditPost] = useState<PostType | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    getPostsInRoot(1, PAGE_SIZE);
  }, [getPostsInRoot]);

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMorePosts) return;
    setIsLoadingMore(true);
    try {
      await getPostsInRoot(currentPostsPage + 1, PAGE_SIZE);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <MobileShell>
      <TopBar
        title=""
        rightAction={
          <div className="flex items-center gap-1.5">
            <div className="bg-blue-500 rounded-lg p-1">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="text-base font-extrabold text-gray-900">Flex Buzz</span>
          </div>
        }
      />

      {/* Feed */}
      <div className="flex-1 p-3">
        {isLoading && posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-400 text-sm">Loading posts...</p>
          </div>
        ) : !posts || posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Zap size={40} className="text-gray-200 mb-3" />
            <p className="text-gray-400 font-medium">No posts yet</p>
            <p className="text-gray-300 text-sm">Be the first to share something!</p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={posts.length}
            next={handleLoadMore}
            hasMore={hasMorePosts}
            loader={
              <div className="py-4 text-center text-gray-400 text-sm">
                Loading more posts...
              </div>
            }
          >
            <div className="space-y-2">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={setEditPost}
                  onDelete={setDeletePostId}
                />
              ))}
            </div>
          </InfiniteScroll>
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
