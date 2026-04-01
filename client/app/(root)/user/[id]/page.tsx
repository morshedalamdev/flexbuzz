"use client";

import PostEmpty from "@/components/placeholder/post-empty";
import PostPlaceholder from "@/components/placeholder/post-placeholder";
import PostItem from "@/components/post/post-item";
import { Button } from "@/components/ui/button";
import { UserDialog } from "@/components/user/user-dialog";
import { formatDateToLocale } from "@/lib/format-date";
import { authStore } from "@/stores/auth-store";
import { postStore } from "@/stores/post-store";
import { userStore } from "@/stores/user-store";
import { PencilIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";

export default function UserPage() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const fetchUser = userStore((state) => state.fetchUser);
  const followUser = userStore((state) => state.followUser);
  const currentUser = userStore((state) => state.user);
  const authUser = authStore((state) => state.user);
  const posts = postStore((state) => state.posts);
  const isLoading = postStore((state) => state.isLoading);
  const fetchPosts = postStore((state) => state.fetchPosts);

  useEffect(() => {
    fetchUser(id as string);
    fetchPosts(id as string);
  }, [id]);
  
  return (
    <Fragment>
      <UserDialog open={open} onOpenChange={setOpen} />
      <div className="relative flex flex-col md:flex-row flex-wrap md:gap-x-6 gap-y-2 w-full">
        <div>
          {currentUser?.profile.firstName ? (
            <h2 className="font-bold text-lg md:text-2xl">
              {currentUser.profile.firstName} {currentUser.profile.lastName}
            </h2>
          ) : (
            <h2 className="font-bold text-lg md:text-2xl">No Name</h2>
          )}
          <h3 className="text-sm">@{currentUser?.username}</h3>
        </div>
        <div className="flex md:flex-col md:gap-0 justify-between md:justify-start capitalize">
          <p>
            <span className="font-semibold">Gender:</span>{" "}
            {currentUser?.profile.gender || "Not specified"}
          </p>
          <p>
            <span className="font-semibold">Date of Birth:</span>{" "}
            {currentUser?.profile.dob
              ? formatDateToLocale(currentUser.profile.dob)
              : "Not specified"}
          </p>
        </div>
        <div className="w-full flex gap-2">
          <p>
            <span className="font-semibold">Followers:</span>{" "}
            {currentUser?.followerCount}
          </p>
          <p>
            <span className="font-semibold">Following:</span>{" "}
            {currentUser?.followingCount}
          </p>
        </div>
        <p className="w-full">
          <span className="font-semibold">Bio:</span>{" "}
          {currentUser?.profile.bio || "Not specified"}
        </p>
        {id !== authUser?.sub && currentUser?.id && (
          <Button
            onClick={() => followUser(currentUser.id, currentUser?.isFollowed)}
            variant={currentUser?.isFollowed ? "outline" : "default"}
          >
            {currentUser?.isFollowed ? "Unfollow" : "Follow"}
          </Button>
        )}
        {id === authUser?.sub && (
          <div className="absolute right-0">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setOpen(true)}
            >
              <PencilIcon />
            </Button>
          </div>
        )}
      </div>
      <div className="w-full space-y-3 mt-5">
        <h2 className="font-bold text-lg">Posts</h2>
        {isLoading &&
          posts.length === 0 &&
          [1, 2, 3].map((i) => <PostPlaceholder key={i} />)}
        {!isLoading && posts.length === 0 && <PostEmpty label="No Posts Yet" />}
        {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
    </Fragment>
  );
}
