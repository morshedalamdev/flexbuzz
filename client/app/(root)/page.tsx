"use client";

import PostCreate from "@/components/post/post-create";
import PostItem from "@/components/post/post-item";
import { useFetcher } from "@/hooks/use-fetcher";
import { NoteType, PaginationInterface } from "@/lib/types";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";

export default function HomePage() {
  const { fetcher } = useFetcher<PaginationInterface<NoteType>>("/note");
  const [posts, setPosts] = useState<NoteType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetcher();

        if (res.data) {
          setPosts(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Fragment>
      <PostCreate btnLabel="Post" />
      <div className="w-full space-y-3 mt-5">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </Fragment>
  );
}
