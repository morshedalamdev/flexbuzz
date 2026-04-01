"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UserType } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userStore } from "@/stores/user-store";
import Link from "next/link";

export default function FollowDialog({ user }: { user: UserType }) {
  const isDesktop = useMediaQuery();
  const [open, setOpen] = useState(false);
  const following = userStore((state) => state.following);
  const followers = userStore((state) => state.followers);
  const fetchFollowing = userStore((state) => state.fetchFollowing);
  const fetchFollowers = userStore((state) => state.fetchFollowers);

  const handleFetchFollowers = async () => {
    if (user) {
      await fetchFollowers(user.id);
    }
  };
  const handleFetchFollowing = async () => {
    if (user) {
      await fetchFollowing(user.id);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="w-full flex gap-2">
            <button
              onClick={handleFetchFollowers}
              disabled={!user?.followerCount}
            >
              <span className="font-semibold">Followers:</span>{" "}
              {user?.followerCount}
            </button>
            <button
              onClick={handleFetchFollowing}
              disabled={!user?.followingCount}
            >
              <span className="font-semibold">Following:</span>{" "}
              {user?.followingCount}
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="px-0">
          <Tabs defaultValue="followers" className="w-full">
            <DialogHeader className="border-b border-gray-100 pb-3">
              <DialogTitle className="text-sm px-4">
                <TabsList>
                  {user?.followerCount > 0 && (
                    <TabsTrigger value="followers" onClick={handleFetchFollowers}>
                      Followers
                    </TabsTrigger>
                  )}
                  {user?.followingCount > 0 && (
                    <TabsTrigger value="following" onClick={handleFetchFollowing}>
                      Following
                    </TabsTrigger>
                  )}
                </TabsList>
              </DialogTitle>
            </DialogHeader>
            <TabsContent value="followers" className="max-h-150 flex flex-col">
              {followers && (
                <ul className="space-y-3 overflow-y-auto">
                  {followers.map((follower) => (
                    <li key={follower.followerId} className="flex flex-wrap gap-2 px-3">
                      <Link href={`/user/${follower.followerId}`} className="flex-1">
                        <h3 className="text-sm font-bold">{follower?.follower?.profile?.firstName ? `${follower.follower.profile.firstName} ${follower.follower.profile.lastName}` : "No Name"}</h3>
                        <p className="text-xs">@{follower.follower?.username}</p>
                      </Link>
                      <Button
                        //   onClick={() => followUser(user.id, user?.isFollowed)}
                        variant={user?.isFollowed ? "outline" : "default"}
                        size="sm"
                      >
                        {user?.isFollowed ? "Unfollow" : "Follow"}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
            <TabsContent value="following" className="max-h-150 flex flex-col">
              {following && (
                <ul className="space-y-3 overflow-y-auto">
                  {following.map((following) => (
                    <li key={following.followingId} className="flex flex-wrap gap-2 px-3">
                      <Link href={`/user/${following.followingId}`} className="flex-1">
                        <h3 className="text-sm font-bold">{following?.following?.profile?.firstName ? `${following.following.profile.firstName} ${following.following.profile.lastName}` : "No Name"}</h3>
                        <p className="text-xs">@{following.following?.username}</p>
                      </Link>
                      <Button
                        //   onClick={() => followUser(user.id, user?.isFollowed)}
                        variant={user?.isFollowed ? "outline" : "default"}
                        size="sm"
                      >
                        {user?.isFollowed ? "Unfollow" : "Follow"}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="w-full flex gap-2">
          <button
            onClick={handleFetchFollowers}
            disabled={!user?.followerCount}
          >
            <span className="font-semibold">Followers:</span>{" "}
            {user?.followerCount}
          </button>
          <button
            onClick={handleFetchFollowing}
            disabled={!user?.followingCount}
          >
            <span className="font-semibold">Following:</span>{" "}
            {user?.followingCount}
          </button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="px-0">
        <Tabs defaultValue="followers" className="w-full">
          <DrawerHeader className="border-b border-gray-100 pb-3">
            <DrawerTitle className="text-sm px-4">
              <TabsList>
                {user?.followerCount > 0 && (
                  <TabsTrigger value="followers" onClick={handleFetchFollowers}>
                    Followers
                  </TabsTrigger>
                )}
                {user?.followingCount > 0 && (
                  <TabsTrigger value="following" onClick={handleFetchFollowing}>
                    Following
                  </TabsTrigger>
                )}
              </TabsList>
            </DrawerTitle>
          </DrawerHeader>
          <TabsContent value="followers" className="max-h-150 flex flex-col">
            <ul className="space-y-3 overflow-y-auto pb-3">
              <li className="flex flex-wrap gap-2 px-3">
                <div className="flex-1">
                  <h3 className="text-sm font-bold">Morshed Alam</h3>
                  <p className="text-xs">@morshedalam</p>
                </div>
                <Button
                  //   onClick={() => followUser(user.id, user?.isFollowed)}
                  variant={user?.isFollowed ? "outline" : "default"}
                  size="sm"
                >
                  {user?.isFollowed ? "Unfollow" : "Follow"}
                </Button>
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="following" className="max-h-150 flex flex-col">
            <ul className="space-y-3 overflow-y-auto pb-3">
              <li className="flex flex-wrap gap-2 px-3">
                <div className="flex-1">
                  <h3 className="text-sm font-bold">Morshed Alam</h3>
                  <p className="text-xs">@morshedalam</p>
                </div>
                <Button
                  //   onClick={() => followUser(user.id, user?.isFollowed)}
                  variant={user?.isFollowed ? "outline" : "default"}
                  size="sm"
                >
                  {user?.isFollowed ? "Unfollow" : "Follow"}
                </Button>
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
}
