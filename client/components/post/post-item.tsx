import { ThumbsUpIcon } from "lucide-react";
import { Button } from "../ui/button";
import CommentDialog from "./comment-dialog";

export default function PostItem() {
  return (
    <div className="border rounded-sm p-3 space-y-3 shadow-sm">
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
