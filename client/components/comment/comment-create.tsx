import { SendHorizontalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { postStore } from "@/stores/post-store";

export default function CommentCreate({ postId }: { postId: string }) {
  const [comment, setComment] = useState("");
  const createComment = postStore((state) => state.createComment);

  const handleCreate = async() => {
    if (comment.trim() === "") return;

    await createComment(postId, comment);
    setComment("");
  };
  return (
    <div className="w-full flex items-center gap-3">
      <Input
        placeholder="Write a comment..."
        className=""
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={handleCreate} disabled={comment.trim() === ""}>
        <SendHorizontalIcon size={15} />
      </Button>
    </div>
  );
}
