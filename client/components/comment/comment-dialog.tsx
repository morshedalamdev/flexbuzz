"use client";

import { useEffect, useState } from "react";
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
import { MessageCircleIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import CommentItem from "./comment-item";
import { CommentType, PostType } from "@/lib/types";
import { postStore } from "@/stores/post-store";
import CommentCreate from "./comment-create";

export default function CommentDialog({ post }: { post: PostType }) {
  const [open, setOpen] = useState(false);
  const fetchComments = postStore((state) => state.fetchComments);
  const comments = postStore((state) => state.comments);
  const isDesktop = useMediaQuery();

  useEffect(() => {
    if (open) {
      console.log("test");
      fetchComments(post.id);
    }
  }, [post.id, open]);
  
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
            <DialogHeader className="border-b border-gray-100 pb-3">
              <DialogTitle className="text-sm">
                @{post.user.username}
              </DialogTitle>
              <DialogDescription className="text-black">
                {post.content}
              </DialogDescription>
            </DialogHeader>
            {comments.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-3">
                No comments yet.
              </p>
            )}
            {comments && (
              <ul className="space-y-2 mt-6">
                {comments &&
                  comments.map((comment: CommentType) => (
                    <li key={comment.id}>
                      <CommentItem comment={comment} />
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <DialogFooter className="px-6">
            <CommentCreate postId={post.id} />
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
          <DrawerHeader className="text-left! border-b border-gray-100">
            <DrawerTitle>@{post.user.username}</DrawerTitle>
            <DrawerDescription>{post.content}</DrawerDescription>
          </DrawerHeader>
          {comments.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-3">
              No comments yet.
            </p>
          )}
          {comments && (
            <ul className="space-y-1 px-4">
              {comments.map((comment: CommentType) => (
                <li key={comment.id}>
                  <CommentItem comment={comment} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <DrawerFooter className="pt-2">
          <CommentCreate postId={post.id} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
