import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePostStore } from '@/store/post-store';
import type { Post } from '@/types';

interface EditPostDialogProps {
  post: Post | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditPostDialog({ post, open, onOpenChange }: EditPostDialogProps) {
  const [content, setContent] = useState(post?.content ?? '');
  const updatePost = usePostStore((state) => state.updatePost);

  // Sync textarea content whenever the dialog opens or the target post changes
  useEffect(() => {
    if (open && post) {
      setContent(post.content);
    }
  }, [open, post]);

  const handleSave = () => {
    if (!post || !content.trim()) return;
    updatePost(post.id, content.trim());
    onOpenChange(false);
  };

  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px]"
          autoFocus
        />
        <div className="flex gap-2 mt-2">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSave} disabled={!content.trim()}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
