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

export default function PostItem() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="border rounded-sm p-3 space-y-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">@Username</h3>
        <div className="flex items-center gap-2">
          <PostEdit open={isEditOpen} onOpenChange={setIsEditOpen} />
          <PostDelete open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa ipsam
        doloremque nemo debitis non harum molestiae, accusantium doloribus
        adipisci iusto, quis deleniti autem voluptas. Laborum sed deleniti iusto
        tempora voluptatibus.
      </p>
      <div className="flex gap-3">
        <Button variant="outline">
          <ThumbsUpIcon size={15} />
          Like (238)
        </Button>
        <CommentDialog />
      </div>
    </div>
  );
}
