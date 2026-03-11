"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MessageCircleIcon, SendHorizontalIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Input } from "../ui/input";
import CommentItem from "./comment-item";
import { PostType } from "@/lib/types";

export default function CommentDialog({ post }: { post: PostType }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <MessageCircleIcon size={15} />
            Comments {post.commentCount > 0 ? `(${post.commentCount})` : ""}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-150 flex flex-col px-0">
          <div className="flex-1 overflow-y-auto px-6">
            <DialogHeader>
              <DialogTitle className="text-sm">@{post.user.username}</DialogTitle>
              <DialogDescription className="text-black">{post.content}</DialogDescription>
            </DialogHeader>
            <ul className="space-y-2 mt-6">
              <li>
                <CommentItem />
              </li>
              <li>
                <CommentItem />
              </li>
              <li>
                <CommentItem />
              </li>
              <li>
                <CommentItem />
              </li>
              <li>
                <CommentItem />
              </li>
              <li>
                <CommentItem />
              </li>
              <li>
                <CommentItem />
              </li>
              <li>
                <CommentItem />
              </li>
              <li>
                <CommentItem />
              </li>
              <li>
                <CommentItem />
              </li>
              <li>
                <CommentItem />
              </li>
              <li>
                <CommentItem />
              </li>
            </ul>
          </div>
          <DialogFooter className="px-6">
            <div className="w-full flex items-center gap-3">
              <Input placeholder="Write a comment..." className="" />
              <Button>
                <SendHorizontalIcon size={15} />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <MessageCircleIcon size={15} />
          Comments {post.commentCount > 0 ? `(${post.commentCount})` : ""}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <DrawerHeader className="text-left!">
            <DrawerTitle>@{post.user.username}</DrawerTitle>
            <DrawerDescription>{post.content}</DrawerDescription>
          </DrawerHeader>
          <ul className="space-y-1 px-4">
            <li>
              <CommentItem />
            </li>
            <li>
              <CommentItem />
            </li>
            <li>
              <CommentItem />
            </li>
            <li>
              <CommentItem />
            </li>
            <li>
              <CommentItem />
            </li>
            <li>
              <CommentItem />
            </li>
            <li>
              <CommentItem />
            </li>
            <li>
              <CommentItem />
            </li>
            <li>
              <CommentItem />
            </li>
            <li>
              <CommentItem />
            </li>
            <li>
              <CommentItem />
            </li>
            <li>
              <CommentItem />
            </li>
          </ul>
        </div>
        <DrawerFooter className="pt-2">
          <div className="w-full flex items-center gap-3">
            <Input placeholder="Write a comment..." className="" />
            <Button>
              <SendHorizontalIcon size={15} />
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
