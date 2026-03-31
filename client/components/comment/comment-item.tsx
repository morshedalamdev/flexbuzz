import { EllipsisVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CommentType } from "@/lib/types";

export default function CommentItem({ comment }: { comment: CommentType }) {
  return (
    <div className="space-y-1 p-2 rounded-sm text-sm bg-gray-50 dark:bg-gray-900/50">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-sm">@{comment.user.username}</h4>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm font-medium">
            <EllipsisVerticalIcon size={12} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}
