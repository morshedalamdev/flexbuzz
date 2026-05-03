import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePostStore } from '@/store/post-store';

interface DeletePostDialogProps {
  postId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeletePostDialog({ postId, open, onOpenChange }: DeletePostDialogProps) {
  const deletePost = usePostStore((state) => state.deletePost);

  const handleDelete = () => {
    if (!postId) return;
    deletePost(postId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500 mb-4">
          This action cannot be undone. The post will be permanently deleted.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" className="flex-1" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
