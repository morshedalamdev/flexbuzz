"use client";

import { EllipsisVerticalIcon, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import CommentDialog from "../comment/comment-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import PostEdit from "./post-edit";
import PostDelete from "./post-delete";
import { PostType } from "@/lib/types";

export default function PostItem({ post }: { post: PostType }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleLike = () =>{
  }

  return (
    <div className="border rounded-sm p-3 space-y-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">@{post.user.username}</h3>
        <div className="flex items-center gap-2">
          <PostEdit post={post} open={isEditOpen} onOpenChange={setIsEditOpen} />
          <PostDelete postId={post.id} open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium">
              <EllipsisVerticalIcon size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setIsEditOpen(true)}
                className="cursor-pointer"
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleteOpen(true)}
                className="cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <p>
        {post.content}
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={handleLike}>
          <ThumbsUpIcon size={15} />
          Like {post.likeCount > 0 ? `(${post.likeCount})` : ""}
        </Button>
        <CommentDialog post={post} />
      </div>
    </div>
  );
}
