"use client";

import PostEmpty from "@/components/placeholder/post-empty";
import PostPlaceholder from "@/components/placeholder/post-placeholder";
import PostCreate from "@/components/post/post-create";
import PostItem from "@/components/post/post-item";
import { usePostStore } from "@/stores/post-store";
import { useEffect } from "react";
import { Fragment } from "react/jsx-runtime";

export default function HomePage() {
  const posts = usePostStore((state) => state.posts);
  const isLoading = usePostStore((state) => state.isLoading);
  const fetchPosts = usePostStore((state) => state.fetchPosts);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Fragment>
      <PostCreate />
      <div className="w-full space-y-3 mt-5">
        {isLoading && posts.length === 0 && [1, 2, 3].map((i) => <PostPlaceholder key={i} />)}
        {!isLoading && posts.length === 0 && (<PostEmpty label="No Posts Yet" />)}
        {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
    </Fragment>
  );
}
