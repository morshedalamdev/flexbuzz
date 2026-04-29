import { EllipsisVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CommentType } from "@/lib/types";
import { authStore } from "@/stores/auth-store";
import { useState } from "react";
import { Button } from "../ui/button";
import { postStore } from "@/stores/post-store";

export default function CommentItem({ comment }: { comment: CommentType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const updateComment = postStore((state) => state.updateComment);
  const deleteComment = postStore((state) => state.deleteComment);
  const authUser = authStore((state) => state.user);

  const handleUpdate = async () => {
    if (content.trim()) {
      await updateComment(comment.id, content);
      setIsEditing(false);
      setContent("");
    }
  };

  return (
    <div className="space-y-1 p-2 rounded-sm text-sm bg-gray-50 dark:bg-gray-900/50">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-sm">@{comment.user.username}</h4>
        {authUser?.sub === comment.user.id && (
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium">
              <EllipsisVerticalIcon size={12} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setIsEditing(true);
                  setContent(comment.content);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteComment(comment.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {!isEditing && <p>{comment.content}</p>}
      {isEditing && (
        <>
          <input
            className="w-full px-2 h-6 border-0 border-b rounded-none outline-0"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="xs"
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  );
}
